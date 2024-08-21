'use client'
import React, { useState } from "react";
import { Box, Button, Flex, Pagination, Select, Text, TextInput } from "@mantine/core";
import Table from "@/components/Table";
import Form from "@/components/Form";
import { BRANDS } from "@/resources/brand";
import { CATEGORIES } from "@/resources/category";
import { useDisclosure } from "@mantine/hooks";
import { deleteProduct, useProducts } from "@/hooks/useProducts";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/services/queryClient";
import { IProduct } from "@/interfaces/product";
import ModalSucess from "@/components/ModalSucess";
import PreviewProduct from "@/components/PreviewProduct";

const Home:React.FC = () => {
  const table_head:string[] = ['Nome', 'Categoria', 'Marca', 'Preço', 'Ações'];
  const [page, setPage] = useState<number>(1);
  const [category, setCategory] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [product, setProduct] = useState<IProduct | string>('');
  const { data: products } = useProducts({page: page, take: 10, brand, category, name});
  const [opened, { open, close }] = useDisclosure(false);
  const [openedSucessModal, { open: openSucessModal, close: closeSucessModal }] = useDisclosure(false);
  const [openedPreview, { open: openPreview, close: closePreview }] = useDisclosure(false);

  const { mutate: mutateDelete } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      })
      openSucessModal()
    },
  });

  return (
    <main style={{position: 'relative'}}>
      <Flex 
        maw={1200}
        w="100%"
        mx='auto'
        justify='space-between'
        align='center'
        mb='md'
      >
        <Text 
          component="p"
        >
          Lista de produtos
        </Text>

        <Flex gap='md' align='center'>
          <TextInput 
            label="Nome" 
            placeholder="Nome do produto" 
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <Select 
            label="Categoria" 
            placeholder="Selecione uma categoria" 
            data={CATEGORIES}
            onChange={(value) => setCategory(value!)}
            searchable
          />
          <Select 
            label="Marca" 
            placeholder="Selecione uma marca" 
            data={BRANDS}
            onChange={(value) => setBrand(value!)}
            searchable
          />
          <Button 
            mt='25px' 
            onClick={() => {
              setProduct('')
              open()
            }}
          >
            Novo produto
          </Button>
        </Flex>
      </Flex>
      <Flex>
      </Flex>
      <Box maw={1200} mx="auto">
        <Table 
          head={table_head} 
          body={products?.data}
          onDelete={(id) => mutateDelete(id)}
          onPreview={(product) => {
            setProduct(product)
            openPreview()
          }}
          onEdit={(product) => {
            setProduct(product)
            open()
          }}
        />
        <Pagination
          mt="md" 
          total={products?.meta?.total_pages!} 
          onChange={(page) => setPage(page)}
        />         
      </Box>
      <Form 
        opened={opened} 
        onClose={close}
        product={product as IProduct}
      />
      <ModalSucess
        message="Produto deletado com sucesso"
        opened={openedSucessModal}
        onClose={closeSucessModal}
      />
      <PreviewProduct 
        opened={openedPreview}
        onClose={closePreview}
        product={product as IProduct}
      />
    </main>
  );
}

export default Home;