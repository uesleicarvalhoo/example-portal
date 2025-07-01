import { useCallback, useEffect, useState } from 'react';
import { useAppointmentModal } from '../../hooks/useAppointmentModal';
import AppointmentModal from './AppointmentModal';
import { appointmentService } from '../../services';
import { mdiTableBorder } from '@mdi/js';
import SectionTitleLine from '../Section/TitleLine';
import SectionMain from '../Section/Main';
import CardBox from '../CardBox';
import AppointmentTable from './AppointmentTable';
import { Appointment } from '../../types';
import PaginationControls from '../Pagination/PaginationControl';
import { PAGE_SIZE } from '../../config';

const AppointmentManager = () => {
  const {
    isOpen,
    open,
    close,
    start,
    selectedAppointment,
    selectedPatient,
  } = useAppointmentModal();

  const [currentPage, setCurrentPage] = useState(0);
  const [numPages, setNumPages] = useState(1);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const fetchAppointments = useCallback(async () => {
    try {
      const response = await appointmentService.search({
        page:   + 1,
        pageSize: PAGE_SIZE,
        status: [],
      });

      setAppointments(response.data);
      setNumPages(Math.max(1, Math.ceil(response.total / PAGE_SIZE)));
    } catch (err) {
      console.error('Erro ao buscar consultas:', err);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return (
    <SectionMain>
      <SectionTitleLine icon={mdiTableBorder} title="Consultas" main />

      <AppointmentModal
        isActive={isOpen}
        appointment={selectedAppointment}
        patient={selectedPatient}
        onClose={close}
        onRefresh={fetchAppointments}
      />

      <CardBox className="mb-6" hasTable>
        <AppointmentTable
          appointments={appointments}
          onStart={start}
          onView={open}
        />
        <PaginationControls
          currentPage={currentPage}
          totalPages={numPages}
          onPageChange={setCurrentPage}
        />
      </CardBox>
    </SectionMain>
  );
};

export default AppointmentManager;
