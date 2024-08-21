import React from 'react'
import { Table as MTTable, ActionIcon, Menu, rem, useMantineColorScheme } from "@mantine/core";
import { IProduct } from '@/interfaces/product';
import { formatToBRL } from '@/utils/formatValurToBRL';
import { IconDotsVertical, IconEye, IconSettings, IconTrash } from '@tabler/icons-react';

interface IProps {
  head: string[];
  body?: IProduct[];
  onDelete:(id: string) => void;
  onEdit:(product: IProduct) => void;
  onPreview: (product: IProduct) => void;
}

const Table:React.FC<IProps> = (props) => {
  const { colorScheme } = useMantineColorScheme();
  const {body, head, onDelete, onEdit, onPreview} = props;

  return (
    <MTTable striped highlightOnHover withTableBorder withColumnBorders>
      <MTTable.Thead>
        <MTTable.Tr>
          {head.map((item, index) => ( 
            <MTTable.Th key={index}>{item}</MTTable.Th>
          ))}
        </MTTable.Tr>
      </MTTable.Thead>
      <MTTable.Tbody>
        {body?.map(product => (
          <MTTable.Tr 
            key={product.id}
            
          >
            <MTTable.Td>{product.name}</MTTable.Td>
            <MTTable.Td>{product.categories}</MTTable.Td>
            <MTTable.Td>{product.brand}</MTTable.Td>
            <MTTable.Td>{formatToBRL(product.price!)}</MTTable.Td>
            <MTTable.Td>
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <ActionIcon  w='100%' bg="none">
                    <IconDotsVertical color={colorScheme === 'light' ? 'black' : 'white'}/>
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item 
                    onClick={() => onPreview(product)}
                    leftSection={<IconEye style={{ width: rem(14), height: rem(14) }} />}
                  >
                    Visualizar
                  </Menu.Item>
                  <Menu.Item 
                    onClick={() => onEdit(product)} 
                    leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}
                  >
                    Editar produto
                  </Menu.Item>
                  <Menu.Item
                    color="red"
                    onClick={() => onDelete(product._id!)} 
                    leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                  >
                    Excluir produto
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </MTTable.Td>
          </MTTable.Tr>
        ))}
      </MTTable.Tbody>
    </MTTable>
  )
}

export default Table