import { useState} from 'react';
import { AppointmentStatus } from '../enum';
import { AppointmentWithDetails } from '../types/appointment';
import { Patient } from '../types/patient';
import { appointmentService } from '../services';

export const useAppointmentModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState<AppointmentWithDetails | null>(null);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

    const open = async (appointmentId: string) => {
        try {
            const data = await appointmentService.getByID(appointmentId);
            setSelectedAppointment(data);
            setSelectedPatient(data.patient);
            setIsOpen(true);
        } catch (err) {
            console.error('Erro ao buscar consulta:', err);
        }
    };

    const start = async (appointmentId: string) => {
        await appointmentService.updateStatus(appointmentId, AppointmentStatus.InProgress);
        await open(appointmentId);
    };

    const close = () => {
        setIsOpen(false);
        setSelectedAppointment(null);
        setSelectedPatient(null);
    };

    return {
        isOpen,
        open,
        close,
        start,
        selectedAppointment,
        selectedPatient,
    };
};
