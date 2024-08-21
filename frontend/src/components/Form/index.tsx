import React, { useEffect, useState } from 'react'
import { ActionIcon, Box, Button, FileInput, Flex, Image, Input, Modal, Select, TextInput, useMantineColorScheme } from '@mantine/core';
import CurrencyInput from 'react-currency-input-field';
import { IProduct } from '@/interfaces/product';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, ProductSchema } from '@/schemas/product';
import { CATEGORIES } from '@/resources/category';
import { BRANDS } from '@/resources/brand';
import '@mantine/dropzone/styles.css';
import { useMutation } from '@tanstack/react-query';
import { createProduct, putProduct } from '@/hooks/useProducts';
import { queryClient } from '@/services/queryClient';
import ModalSucess from '../ModalSucess';
import { useDisclosure } from '@mantine/hooks';
import { uploadImage } from '@/hooks/useUploads';
import { IconTrash } from '@tabler/icons-react';

interface IProps {
  opened: boolean;
  onClose: () => void;
  product?: IProduct;
}

const Form:React.FC<IProps> = (props) => {
  const {product, opened, onClose} = props;
  const [selectedImage, setSelectedImage] = useState<File>();
  const {colorScheme} = useMantineColorScheme();
  const [openedSucessModal, { open: openSucessModal, close: closeSucessModal }] = useDisclosure(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting}
  } = useForm()
  
  const {mutate: mutatePost} = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      })
      console.log(data, "POST")
      uploadImage(data._id, selectedImage!)
      openSucessModal()
    },
  })

  const {mutate: mutateEdit} = useMutation({
    mutationFn: putProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      })
      uploadImage(data._id, selectedImage!)
      console.log(data, "PUT")
      openSucessModal()
    },
  })

  const onSubmit = (data: ProductSchema) => {
    console.log(data)
    const obj = {
      name: data.name,
      price: data.price,
      brand: data.brand,
      categories: data.categories
    }

    if(product) mutateEdit({
      ...obj,
      _id: product?._id,
      id: product?.id
    })
    else mutatePost(obj)
  }

  function handleCancelForm() {
    reset({})
    onClose()
  }

  useEffect(() => {
    if (product) { 
      reset(product)
    } else reset()
  }, [product, reset]);

  return (
    <>
      <Modal 
        opened={opened} 
        onClose={handleCancelForm} 
        closeOnEscape={false}
        closeOnClickOutside={false}
        title={product ? "Editar produto" : "Novo produto"}
        centered
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller 
            name='image'
            control={control}
            render={({field: {name, onBlur, onChange, value}}) => (
              <FileInput 
                label="Imagem" 
                placeholder={product ? (product as IProduct).image : "selecione a imagem do produto" }
                name={name}
                onChange={(e) => {
                  if(e) setSelectedImage(e)
                  onChange()
                }}
                onBlur={onBlur}
              />
            )}
          />
          <Controller 
            name='name'
            control={control}
            render={({field: {name, onBlur, onChange, value}}) => (
              <TextInput 
                mt='md'
                label="Nome" 
                placeholder="Nome do produto" 
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <Controller 
            name='categories'
            control={control}
            render={({field: {name, onBlur, onChange, value}}) => (
              <Select 
                mt='md'
                label="Categoria" 
                placeholder="Selecione uma categoria" 
                data={CATEGORIES}
                searchable
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <Controller 
            name='brand'
            control={control}
            render={({field: {name, onBlur, onChange, value}}) => (
              <Select 
                mt='md'
                label="Marca" 
                placeholder="Selecione uma marca" 
                data={BRANDS}
                searchable
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <Controller 
            name='price'
            control={control}
            render={({field: {name, onBlur, onChange, value}}) => (
              <Input.Wrapper label="Produto" mt='md'>
                <Input
                  component={CurrencyInput}
                  decimalsLimit={2}
                  placeholder="Preço do produto"
                  prefix='R$ '
                  name={name}
                  value={value}
                  onValueChange={onChange}
                  onBlur={onBlur}
                  styles={(style) => ({
                    input: {
                      borderColor: colorScheme == 'light' ? style.colors.gray[3] : style.colors.gray[7],
                      borderRadius: style.radius.sm,
                      '&:focus': {
                        borderColor: style.colors.blue[5],
                      },
                    },
                  })}
                />
              </Input.Wrapper>
            )}
          />
          <Flex gap="md" mt='md'>
            <Button color='red' w='100%' onClick={handleCancelForm} type='button'>
              Cancelar
            </Button>
            <Button 
              w='100%'  
              type='submit'
            >
              {product ? "Editar" : "Cadastrar"}
            </Button>
          </Flex>
        </form>
      </Modal>
      <ModalSucess
        message={product ? "produto alterado com sucess" : "Novo produto cadastrado com sucesso"}
        opened={openedSucessModal}
        onClose={() => {
          closeSucessModal()
          handleCancelForm()
        }}
      />
    </>
  )
}

export default Form