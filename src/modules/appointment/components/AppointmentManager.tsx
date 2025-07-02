import SectionMain from '@/shared/components/Section/Main';
import SectionTitleLine from '@/shared/components/Section/TitleLine';
import CardBox from '@/shared/components/CardBox';
import { mdiTableBorder } from '@mdi/js';

import AppointmentModal from './AppointmentModal';
import AppointmentTable from './AppointmentTable';
import { useAppointmentModal } from '../hooks/useAppointmentModal';
import { useAppointmentList } from '../hooks/useAppointmentList';

const AppointmentManager = () => {
  const {
    isOpen,
    open,
    close,
    start,
    selectedAppointment,
    selectedPatient,
  } = useAppointmentModal();

  const {
    appointments,
    currentPage,
    totalPages,
    setCurrentPage,
    fetchAppointments,
  } = useAppointmentList();

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
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onStart={start}
          onView={open}
        />
      </CardBox>
    </SectionMain>
  );
};

export default AppointmentManager;
