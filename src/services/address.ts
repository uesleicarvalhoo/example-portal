import axios from 'axios'
import { Address } from '../types'
import { CEP_API_ENDPOINT } from '../config'

export async function getAddressByCep(cep: string): Promise<Address> {
  try {
    const response = await axios.get(CEP_API_ENDPOINT.replace('{cep}', cep))
    const { state, city, neighborhood, street } = await response.data
    return {
      city: city,
      neighborhood: neighborhood,
      state: state,
      street: street,
      cep: cep,
    }
  } catch (err) {
    console.log(err)
    return null
  }
}
