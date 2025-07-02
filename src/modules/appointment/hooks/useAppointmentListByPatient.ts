import { useCallback, useEffect, useState } from 'react';
import { appointmentService } from '../services';
import { Appointment } from '../types';
import { PAGE_SIZE } from '@/config';

export const useAppointmentListByPatient = (patientID: string | undefined) => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchAppointments = useCallback(async () => {
        if (!patientID) return;

        setLoading(true);
        try {
            const response = await appointmentService.getByPatientID({
                page: currentPage + 1,
                pageSize: PAGE_SIZE,
                patientID: patientID,
            });
            console.log("appointments: ", response)
            setAppointments(response.data);
            setTotalPages(Math.max(1, Math.ceil(response.total / PAGE_SIZE)));
        } catch (err) {
            console.error('Erro ao buscar consultas do paciente:', err);
        } finally {
            setLoading(false);
        }
    }, [patientID, currentPage]);

    useEffect(() => {
        fetchAppointments();
    }, [fetchAppointments]);

    return {
        appointments,
        currentPage,
        totalPages,
        loading,
        setCurrentPage,
        fetchAppointments,
    };
};
