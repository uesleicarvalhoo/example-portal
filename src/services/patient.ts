import { CreatePatientDTO, UpdatePatientDTO, Patient } from '../types/patient';
import { api } from './axios';

const API_URL = '/patient';

export const patientService = {
    async getPaginated(
        page: number,
        limit: number,
        search?: string
    ): Promise<{ data: Patient[]; totalPages: number }> {

        const params: any = {
            page,
            pageSize: limit,
        };

        if (search) {
            params.search = search;
        }

        const response = await api.get(API_URL, { params });

        return {
            data: response.data.patients,
            totalPages: response.data.pages,
        };
    },

    async getById(id: string): Promise<Patient> {
        const response = await api.get(`${API_URL}/${id}`);
        return response.data;
    },

    async create(data: CreatePatientDTO): Promise<Patient> {
        const response = await api.post(API_URL, data);
        return response.data;
    },

    async update(id: string, payload: UpdatePatientDTO): Promise<Patient> {
        const response = await api.put(`${API_URL}/${id}`, payload);
        return response.data;
    },

    async remove(id: string): Promise<void> {
        await api.delete(`${API_URL}/${id}`);
    },
};
