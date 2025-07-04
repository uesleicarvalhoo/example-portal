import {
    CreatePatientDTO,
    UpdatePatientDTO,
    PatientFormValues,
    Patient,
} from '../types/patient';
import { CreateAppointmentParams } from '@/modules/appointment/types';

const toLocalDateInputFormat = (date: Date): string => {
    const localDate = new Date(date);
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const day = String(localDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const parseLocalDate = (dateStr: string): Date => {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
};

// 🔹 Form → Create DTO
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

// 🔹 Form → Update DTO
export const toUpdatePatientDTO = (form: PatientFormValues): UpdatePatientDTO => ({
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

// 🔹 Patient → Form
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

// 🔹 Form → Patient
export const fromPatientFormValues = (form: PatientFormValues): Patient => ({
    id: '',
    name: form.fullName,
    birthDate: parseLocalDate(form.birthDate),
    phone: form.phone,
    email: form.email,
    cpf: form.cpf,
    observations: form.observations,
    registredAt: new Date(),
    address: {
        street: form.street,
        neighborhood: form.neighborhood,
        city: form.city,
        state: form.state,
        cep: form.cep,
        complement: form.complement,
    },
});

// 🔹 Patient → CreateAppointmentParams
export const toCreateAppointmentParams = (patient: Patient): CreateAppointmentParams => ({
    patientID: patient.id,
});
