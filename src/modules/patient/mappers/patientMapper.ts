import {
    CreatePatientDTO,
    UpdatePatientDTO,
    PatientFormValues,
    Patient,
} from '../types/patient';
import { CreateAppointmentParams } from '@appointments/types/appointment';

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
    observations: form.notes?.trim() || undefined,
    address: {
        street: form.address.street,
        neighborhood: form.address.neighborhood,
        city: form.address.city,
        state: form.address.state,
        cep: form.address.zipCode,
        complement: form.address.complement || '',
    },
});

// 🔹 Form → Update DTO
export const toUpdatePatientDTO = (form: PatientFormValues): UpdatePatientDTO => ({
    name: form.fullName,
    birthDate: parseLocalDate(form.birthDate),
    phone: form.phone,
    email: form.email,
    cpf: form.cpf,
    observations: form.notes?.trim() || undefined,
    address: {
        street: form.address.street,
        neighborhood: form.address.neighborhood,
        city: form.address.city,
        state: form.address.state,
        cep: form.address.zipCode,
        complement: form.address.complement || '',
    },
});

// 🔹 Patient → Form
export const toPatientFormValues = (patient: Patient): PatientFormValues => ({
    fullName: patient.name,
    birthDate: toLocalDateInputFormat(patient.birthDate),
    phone: patient.phone,
    email: patient.email,
    cpf: patient.cpf,
    notes: patient.observations,
    address: {
        street: patient.address.street,
        neighborhood: patient.address.neighborhood,
        city: patient.address.city,
        state: patient.address.state,
        zipCode: patient.address.cep,
        complement: patient.address.complement || '',
    },
});

// 🔹 Form → Patient (não costuma ser necessário, mas mantido se for útil)
export const fromPatientFormValues = (form: PatientFormValues): Patient => ({
    id: '',
    name: form.fullName,
    birthDate: parseLocalDate(form.birthDate),
    phone: form.phone,
    email: form.email,
    cpf: form.cpf,
    observations: form.notes,
    registredAt: new Date(),
    address: {
        street: form.address.street,
        neighborhood: form.address.neighborhood,
        city: form.address.city,
        state: form.address.state,
        cep: form.address.zipCode,
        complement: form.address.complement,
    },
});

// 🔹 Patient → CreateAppointmentParams
export const toCreateAppointmentParams = (patient: Patient): CreateAppointmentParams => ({
    patientID: patient.id,
});
