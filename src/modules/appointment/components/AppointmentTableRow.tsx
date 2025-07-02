import { Appointment } from '../types/appointment';
import Badge from '@/shared/components/Badge';
import { getStatusBadgeProps, parseDateToString, formatDuration } from '@/shared/utils/formaters';
import ElapsedTime from '@/shared/components/ElapsedTime';
import Button from '@/shared/components/Button';
import { AppointmentStatus } from '../enum';

interface Props {
  appointment: Appointment;
  onStart: (id: string) => void;
  onView: (id: string) => void;
}

const AppointmentTableRow = ({ appointment, onStart, onView }: Props) => {
  return (
    <tr
      key={appointment.id}
    >
      <td className="px-4 py-3">{appointment.patientName}</td>
      <td className="px-4 py-3">{parseDateToString(appointment.createdAt)}</td>
      <td className="px-4 py-3">
        <Badge {...getStatusBadgeProps(appointment.status)} />
      </td>
      <td className="px-4 py-3">
        {appointment.status === AppointmentStatus.Pending ? (
          <ElapsedTime since={appointment.createdAt} />
        ) : appointment.waitingTime != null ? (
          <span className="font-mono text-sm">{formatDuration(appointment.waitingTime)}</span>
        ) : (
          <span className="text-gray-400 italic text-sm">--:--:--</span>
        )}
      </td>
      <td className="px-4 py-3">{formatDuration(appointment.consultTime)}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          {appointment.status === AppointmentStatus.Pending ? (
            <Button
              label="Iniciar consulta"
              color="info"
              small
              onClick={() => onStart(appointment.id)}
              className="w-[120px] font-semibold"
            />
          ) : (
            <Button
              label="Visualizar"
              color="info"
              small
              onClick={() => onView(appointment.id)}
              className="w-[120px] font-semibold"
            />
          )}
        </div>
      </td>
    </tr>
  );
};

export default AppointmentTableRow;
