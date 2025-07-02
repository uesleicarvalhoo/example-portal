import { AppointmentStatus } from '../enum';
import { Exam } from '../../exam/types/exam';
import { Patient } from '@/modules/patient/types/patient';

export type Appointment = {
    id: string;
    patientId: string;
    patientName: string;
    status: AppointmentStatus;
    arrivalTime?: Date;
    waitingTime?: string;
    consultTime?: string;
    startedAt?: Date;
    finishedAt?: Date;
    createdAt: Date;
    examination?: Exam;
}

export type AppointmentWithDetails = {
    id: string;
    status: AppointmentStatus;
    startedAt?: Date;
    finishedAt?: Date;
    createdAt: Date;
    patient: Patient;
    examination?: Exam | undefined;
}

export type CreateAppointmentParams = {
    patientID: string;
}

export type SearchAppointmentParams = {
    status?: AppointmentStatus[];
    page?: number;
    pageSize?: number;
    patientID?: string;
}

export type SearchAppointmentResult = {
    data: Appointment[];
    total: number;
}

export type ListByPatientIdParams = {
    patientID: string
    page?: number;
    pageSize?: number;
}