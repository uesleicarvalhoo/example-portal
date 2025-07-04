import axios from 'axios';
import { Address } from '../types/address';
import { CEP_API_ENDPOINT } from '@/config';

export async function getAddressByCep(cep: string): Promise<Address | null> {
  try {
    const response = await axios.get(CEP_API_ENDPOINT.replace('{cep}', cep));
    const { state, city, neighborhood, street } = response.data;

    return {
      cep,
      city,
      neighborhood,
      state,
      street,
    };
  } catch (error) {
    console.error('Erro ao buscar endereço pelo CEP:', error);
    return null;
  }
}
