import { useCallback, useEffect, useState } from 'react';
import { Appointment } from '../types';
import { appointmentService } from '../services';
import { PAGE_SIZE } from '@/config';
import { AppointmentStatus } from '../enum';

type UseAppointmentListParams = {
  status?: AppointmentStatus[];
};

export const useAppointmentList = ({ status = [] }: UseAppointmentListParams = {}) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await appointmentService.search({
        page: currentPage + 1,
        pageSize: PAGE_SIZE,
        status,
      });

      setAppointments(response.data);
      setTotalPages(Math.max(1, Math.ceil(response.total / PAGE_SIZE)));
    } catch (err) {
      console.error('Erro ao buscar consultas:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, status]);

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
