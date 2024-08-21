import React from 'react'
import { Box, Button, Flex, Modal } from '@mantine/core'
import { IconCheck } from '@tabler/icons-react';

interface IProps {
  opened: boolean;
  onClose: () => void;
  message: string
}

const ModalSucess:React.FC<IProps> = (props) => {
  const {message, opened, onClose} = props;
  return (
    <Modal
      opened={opened} 
      onClose={onClose} 
      closeOnEscape={false}
      closeOnClickOutside={false}
      centered
    >
      <Flex
        direction='column'
        align='center'
      >
        <Box 
          bg='#00FF0010'
          p={8}
          style={{borderRadius: '100%'}}
        >
          <IconCheck size={40} color='#00FF00' />
        </Box>
        <h1>{message}</h1>
        <Flex>
          <Button w="100%" onClick={onClose}>
            Fechar
          </Button>
        </Flex>
      </Flex>
    </Modal>
  )
}

export default ModalSucess