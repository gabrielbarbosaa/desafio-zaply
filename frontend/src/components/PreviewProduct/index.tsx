import React from 'react'
import { Box, Flex, Image, Modal, Text } from '@mantine/core'
import { IProduct } from '@/interfaces/product';
import img_product_not_found from '../../../public/img_product_not_found.png';
import { formatToBRL } from '@/utils/formatValurToBRL';

interface IProps {
  product: IProduct;
  opened: boolean;
  onClose: () => void;
}

const PreviewProduct:React.FC<IProps> = (props) => {
  const {product, opened, onClose} = props;

  return (
    <Modal 
      size='md'
      onClose={onClose} 
      opened={opened} 
      centered
    >
    <Image 
      src={product.image ? product.image : img_product_not_found.src}
      alt={product.name?.split(' ').join('-') + "-image"}
      width={300}
      height={300}
      style={{objectFit: 'contain'}}
    />
      <Flex
        gap='md'
        align='center'
        p='lg'
        direction='row'
      >
        <Flex direction='column'>
          <h1>{product.name}</h1>
          <Flex gap={20}>
            <Box>
              <Text fz='lg'>Categoria</Text>
              <Text>{product.categories}</Text>
            </Box>
            <Box>
              <Text fz='lg'>Marca</Text>
              <Text>{product.brand}</Text>
            </Box>
            <Box>
              <Text fz='lg'>Preço</Text>
              <Text>{formatToBRL(product.price!)}</Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  )
}

export default PreviewProduct