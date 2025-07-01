import { Appointment } from '../../types/appointment';
import AppointmentTableRow from './AppointmentTableRow';

type Props = {
  appointments: Appointment[];
  onStart: (appointmentId: string) => void;
  onView: (appointmentId: string) => void;
};

const AppointmentTable = ({ appointments, onStart, onView }: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr className="text-left text-xs font-semibold uppercase text-gray-500 dark:text-slate-400">
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
    </div>
  );
};

export default AppointmentTable;
