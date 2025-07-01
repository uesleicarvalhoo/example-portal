import { Address } from "./address"

export type Patient = {
  id: string
  name: string
  cpf: string
  email: string
  phone: string
  birthDate: Date
  registredAt: Date
  observations: string
  address: Address
  lastAppointmentDate?: Date
}

export type PatientFormValues = {
  fullName: string;
  birthDate: string;
  phone: string;
  email: string;
  cpf: string;
  observations: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  complement: string;
};


export type CreatePatientDTO = {
  name: string;
  cpf: string;
  phone: string;
  email: string;
  birthDate: Date;
  address: Address
  observations?: string;
};


export type UpdatePatientDTO = {
  name: string;
  birthDate: Date;
  phone: string;
  email: string;
  observations?: string;
  address: Address
}