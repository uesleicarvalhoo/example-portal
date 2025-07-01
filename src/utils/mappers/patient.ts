import {
  CreatePatientDTO,
  Patient,
  PatientFormValues,
  UpdatePatientDTO,
} from '../../types/patient';
import { Address } from '../../types/address';
import { CreateAppointmentParams } from '../../types/appointment';

const toLocalDateInputFormat = (date: Date): string => {
  const localDate = new Date(date);
  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, '0');
  const day = String(localDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`; // YYYY-MM-DD
};

const parseLocalDate = (dateStr: string): Date => {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
};

// 🔹 Mapper: Form → Create DTO
export const toCreatePatientDTO = (form: PatientFormValues): CreatePatientDTO => ({
  name: form.fullName,
  birthDate: parseLocalDate(form.birthDate),
  phone: form.phone,
  email: form.email,
  cpf: form.cpf,
  observations: form.observations?.trim() || undefined,
  address: {
    street: form.street,
    neighborhood: form.neighborhood,
    city: form.city,
    state: form.state,
    cep: form.cep,
    complement: form.complement || '',
  },
});

// 🔹 Mapper: Form → Update DTO
export const toUpdatePatientDTO = (form: PatientFormValues): UpdatePatientDTO => ({
  name: form.fullName,
  birthDate: parseLocalDate(form.birthDate),
  phone: form.phone,
  email: form.email,
  observations: form.observations?.trim() || undefined,
  address: {
    street: form.street,
    neighborhood: form.neighborhood,
    city: form.city,
    state: form.state,
    cep: form.cep,
    complement: form.complement || '',
  },
});

// 🔹 Mapper: Form → Patient
export const fromPatientFormValues = (formValues: PatientFormValues): Patient => ({
  id: '',
  name: formValues.fullName,
  birthDate: parseLocalDate(formValues.birthDate),
  phone: formValues.phone,
  email: formValues.email,
  cpf: formValues.cpf,
  observations: formValues.observations,
  registredAt: new Date(),
  address: {
    street: formValues.street,
    neighborhood: formValues.neighborhood,
    city: formValues.city,
    state: formValues.state,
    cep: formValues.cep,
    complement: formValues.complement,
  },
});

// 🔹 Mapper: Patient → Form
export const toPatientFormValues = (patient: Patient): PatientFormValues => ({
  fullName: patient.name,
  birthDate: toLocalDateInputFormat(patient.birthDate),
  phone: patient.phone,
  email: patient.email,
  cpf: patient.cpf,
  observations: patient.observations,
  street: patient.address.street,
  neighborhood: patient.address.neighborhood,
  city: patient.address.city,
  state: patient.address.state,
  cep: patient.address.cep,
  complement: patient.address.complement || '',
});



// 🔹 Mapper: Patient → Form
export const toCreateAppointmentParams = (patient: Patient): CreateAppointmentParams => ({
  patientID: patient.id
});
