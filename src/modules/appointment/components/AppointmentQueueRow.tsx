import { Appointment } from '../types';
import Badge from '@/shared/components/Badge';
import Button from '@/shared/components/Button';
import ElapsedTime from '@/shared/components/ElapsedTime';
import { formatDuration, getStatusBadgeProps } from '@/shared/utils/formaters';
import { mdiBookEdit, mdiEye } from '@mdi/js';
import { AppointmentStatus } from '../enum';

type Props = {
    appointment: Appointment;
    onStart: (appointment: Appointment) => void;
    onView: (appointment: Appointment) => void;
    onEdit: (appointment: Appointment) => void;
};

const AppointmentQueueRow = ({ appointment, onStart, onView, onEdit }: Props) => {
    return (
        <tr>
            <td className="align-middle">{appointment.patientName}</td>
            <td className="align-middle">
                {appointment.status === AppointmentStatus.Pending ? (
                    <ElapsedTime since={appointment.createdAt} />
                ) : appointment.waitingTime != null ? (
                    <span className="font-mono text-sm">{formatDuration(appointment.waitingTime)}</span>
                ) : (
                    <span className="text-gray-400 italic text-sm">--:--:--</span>
                )}
            </td>
            <td className="align-middle">
                {appointment.consultTime != null ? (
                    <span className="font-mono text-sm">{formatDuration(appointment.consultTime)}</span>
                ) : (
                    <span className="text-gray-400 italic text-sm">–</span>
                )}
            </td>
            <td className="align-middle">
                <Badge {...getStatusBadgeProps(appointment.status)} />
            </td>
            <td className="align-middle">
                <div className="flex items-center gap-1 justify-end">
                    {appointment.status === AppointmentStatus.Pending && (
                        <Button
                            label="Iniciar"
                            color="info"
                            onClick={() => onStart(appointment)}
                            small
                            className="w-[100px] font-semibold"
                        />
                    )}

                    {appointment.status === AppointmentStatus.InProgress && (
                        <Button
                            label="Visualizar"
                            icon={mdiEye}
                            color="info"
                            onClick={() => onView(appointment)}
                            small
                            className="w-[100px] font-semibold"
                        />
                    )}

                    <Button
                        icon={mdiBookEdit}
                        color="warning"
                        small
                        onClick={() => onEdit(appointment)}
                    />
                </div>
            </td>
        </tr>
    );
};

export default AppointmentQueueRow;