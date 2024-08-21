import api from '@/services/api';

export async function uploadImage(id: string, file: File): Promise<void> {
  const formData = new FormData();
  formData.append('file', file)
  const response = await api.post(`/uploads/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data
}