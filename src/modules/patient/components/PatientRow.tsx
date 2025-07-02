import UserAvatar from '@/shared/components/UserAvatar';
import PatientActions from './PatientActions';
import { Patient } from '@/modules/patient/types/patient';
import { parseCpf, parseDateToString, parsePhone } from '@/shared/utils/formaters';
import { CreateAppointmentParams } from '@/modules/appointment/types/appointment';

interface Props {
    patient: Patient;
    onView: (patient: Patient) => void;
    onDelete: (patient: Patient) => void;
    onAppointment: (patient: Patient) => void;
    onStartAppointment: (params: CreateAppointmentParams) => void;

}

const PatientRow = ({ patient, onView, onDelete, onAppointment, onStartAppointment }: Props) => {
    return (
        <tr key={patient.id}>
            <td className="border-b-0 lg:w-6 before:hidden">
                <UserAvatar
                    username={patient.name}
                    className="w-24 h-24 mx-auto lg:w-6 lg:h-6"
                />
            </td>
            <td>{patient.name}</td>
            <td>{parseDateToString(patient.birthDate)}</td>
            <td>{parseCpf(patient.cpf)}</td>
            <td>{parsePhone(patient.phone)}</td>
            <td>
                {patient.lastAppointmentDate
                    ? parseDateToString(patient.lastAppointmentDate)
                    : '-'}
            </td>
            <td className="before:hidden lg:w-1 whitespace-nowrap">
                <PatientActions
                    patient={patient}
                    onView={onView}
                    onDelete={onDelete}
                    onAppointment={onAppointment}
                    onStartAppointment={onStartAppointment}
                />
            </td>
        </tr>
    );
};

export default PatientRow;
