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

export interface Address {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    complement?: string;
}

export interface PatientDTO {
    id?: string;
    name: string;
    birthDate: string; // formato ISO: 'YYYY-MM-DD'
    phone: string;
    email: string;
    cpf: string;
    notes?: string;
    address: Address;
}

export interface PaginatedPatientsResponse {
    data: Patient[];
    total: number;
    page: number;
    size: number;
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