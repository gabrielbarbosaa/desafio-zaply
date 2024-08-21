import { Flex, Text } from '@mantine/core'
import React from 'react'

const Footer = () => {
  return (
    <Flex
      w="100%"
      h="60px"
      px="lg"
      justify="center"
      align="center"
      pos='fixed'
      bottom={0}
    >
      <Text component='p'>
        Desafio Front-End 08/2024
      </Text>
    </Flex>
  )
}

export default Footer