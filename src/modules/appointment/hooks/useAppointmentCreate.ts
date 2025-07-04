import { appointmentService } from '../services';
import { CreateAppointmentParams } from '../types';
import { toast } from 'react-toastify';

export const useAppointmentCreate = () => {
    const handleCreate = async (params: CreateAppointmentParams) => {
        try {
            await appointmentService.create(params);
            toast.success('Consulta iniciada com sucesso');
        } catch (error) {
            console.error('Erro ao iniciar a consulta:', error);
            toast.error('Erro ao iniciar a consulta');
        }
    };

    return { handleCreate };
};
