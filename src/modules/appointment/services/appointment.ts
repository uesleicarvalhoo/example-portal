import { AppointmentStatus } from '../enum';
import { format } from 'date-fns';
import {
  Appointment,
  AppointmentWithDetails,
  CreateAppointmentParams,
  ListByPatientIdParams,
  SearchAppointmentParams,
  SearchAppointmentResult,
} from '../types/appointment';
import { AppointmentSummary, GetSummaryParams } from '../types/summary';
import { api } from '@/shared/services/api';

export type EyeParams = {
  spherical: number;
  cylindrical: number;
  axis: number;
  observations?: string;
};

export type Conditions = {
  astigmatism?: boolean;
  myopia?: boolean;
  hyperopia?: boolean;
  presbyopia?: boolean;
};

export type ExamParams = {
  appointmentId: string;
  rightEye: EyeParams;
  leftEye: EyeParams;
  conditions?: Conditions;
  observations?: string;
};

export type UpdateExamParams = ExamParams;

const API_URL = '/appointment';

export const appointmentService = {
  async create(data: CreateAppointmentParams): Promise<Appointment> {
    const response = await api.post(API_URL, data);
    return response.data;
  },

  async getByID(id: string): Promise<AppointmentWithDetails> {
    const response = await api.get(`${API_URL}/${id}`);
    return response.data;
  },

  async getByPatientID(params: ListByPatientIdParams): Promise<SearchAppointmentResult> {
    const response = await api.get(`${API_URL}/patient/${params.patientID}`, { params });
    return {
      data: response.data.data ? response.data.data : [] as Appointment[],
      total: response.data.total,
    };
  },

  async updateStatus(id: string, status: AppointmentStatus): Promise<void> {
    await api.patch(`${API_URL}/${id}/status`, { status });
  },

  async search(params: SearchAppointmentParams): Promise<SearchAppointmentResult> {
    const response = await api.get(API_URL, { params });
    return {
      data: response.data.data ? response.data.data : [] as Appointment[],
      total: response.data.total,
    };
  },

  async getSummary(params: GetSummaryParams): Promise<AppointmentSummary> {
    const response = await api.get(`${API_URL}/summary`, {
      params: {
        fromDate: format(params.startDate, 'yyyy-MM-dd'),
        toDate: format(params.endDate, 'yyyy-MM-dd'),
      },
    });
    return response.data;
  },

  async registerExam(params: ExamParams): Promise<void> {
    await api.post(`${API_URL}/exam`, params);
  },

  async updateExam(params: UpdateExamParams): Promise<void> {
    await api.patch(`${API_URL}/exam`, params);
  },
};
