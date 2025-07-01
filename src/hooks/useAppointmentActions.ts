import { toast } from 'react-toastify';
import { appointmentService } from '../services';
import { AppointmentStatus } from '../enum';

interface UseAppointmentActionsOptions {
    onRefresh?: () => void;
}

export const useAppointmentActions = ({ onRefresh }: UseAppointmentActionsOptions = {}) => {
    const updateStatus = async (appointmentId: string, status: AppointmentStatus) => {
        try {
            await appointmentService.updateStatus(appointmentId, status);
            toast.success('Status atualizado com sucesso!');
        } catch (err) {
            console.error(err);
            toast.error('Erro ao atualizar o status da consulta.');
        } finally {
            if (onRefresh) await onRefresh();
        }
    };

    return {
        updateStatus,
    };
};
