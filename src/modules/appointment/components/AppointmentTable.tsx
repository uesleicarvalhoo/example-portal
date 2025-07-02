import { Appointment } from '../types/appointment';
import AppointmentTableRow from './AppointmentTableRow';
import PaginationControls from '@/shared/components/PaginationControl';

type Props = {
  appointments: Appointment[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onStart: (appointmentId: string) => void;
  onView: (appointmentId: string) => void;
};

const AppointmentTable = ({
  appointments,
  currentPage,
  totalPages,
  onPageChange,
  onStart,
  onView,
}: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-3">Nome do paciente</th>
            <th className="px-4 py-3">Data da consulta</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Tempo de espera</th>
            <th className="px-4 py-3">Tempo de atendimento</th>
            <th className="px-4 py-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <AppointmentTableRow
              key={appt.id}
              appointment={appt}
              onStart={onStart}
              onView={onView}
            />
          ))}
        </tbody>
      </table>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default AppointmentTable;
