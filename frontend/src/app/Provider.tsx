'use client';
import React from 'react'
import { createTheme, MantineProvider } from '@mantine/core';
import { queryClient } from '@/services/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import Header from '@/components/header';
import Footer from '@/components/Footer';

interface ProviderProps {
  children: React.ReactNode
}

const Provider:React.FC<ProviderProps> = ({children}) => {
  const theme = createTheme({})

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Header />
        {children}
        <Footer />
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default Provider;