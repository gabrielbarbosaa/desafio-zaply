'use client'
import React from 'react'
import ColorSchema from '../ColorSchema';
import { Flex, Text } from '@mantine/core';

const Header = () => {
  return (
    <Flex
      w="100%"
      h="60px"
      px="lg"
      justify="space-between"
      align="center"
    >
      <Text>
        Produtos
      </Text>
      <ColorSchema />
    </Flex>
  )
}

export default Header