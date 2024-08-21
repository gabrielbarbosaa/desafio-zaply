import api from "@/services/api";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IProduct } from "@/interfaces/product";
import { IMeta } from "@/interfaces/meta";
import { ProductSchema } from "@/schemas/product";
import { uploadImage } from "./useUploads";

interface IProps {
  page: number,
  take: number,
  brand?: string,
  category?: string,
  name?: string,
}

interface IResponse {
  data: IProduct[],
  meta: IMeta
}

const getProducts = async (props:IProps): Promise<IResponse> => {
  const {brand, category, name, page, take} = props;

  let params = new URLSearchParams();

  if (!!brand) params.append('brand', brand)
  if (!!category) params.append('categories', category)
  if (!!name) params.append('name', name)
  if (!!page) params.append('page', page.toString())
  if (!!take) params.append('take', take.toString())


  const { data } = await api.get<IResponse>('/products', {params});
  return data;
}

export const useProducts = (props:IProps): UseQueryResult<IResponse, Error> => {
  return useQuery({
    queryKey: ['products', props],
    queryFn: () => getProducts(props),
  });
}

export const createProduct = async (product: IProduct) => {
  const resp = await api.post(`/products`, product);
  return resp.data;
};

export const putProduct = async (product: IProduct) => {
  const obj = {
    name: product.name,
    price: product.price,
    brand: product.brand,
    categories: product.categories
  }

  const resp = await api.put(`/products/${product?._id}`, obj);
  return resp.data;
};

export const deleteProduct = async (id: string) => {
  const resp = await api.delete(`/products/${id}`);
  return resp.data;
};