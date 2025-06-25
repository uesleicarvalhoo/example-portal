import { mdiEye, mdiListBoxOutline, mdiTrashCan } from '@mdi/js';
import Button from '../../components/Button';
import Buttons from '../../components/Buttons';
import UserAvatar from '../../components/UserAvatar';
import { Patient } from '../../types/patient';
import { parseCpf, parseDateToString, parsePhone } from '../../utils/formaters';

interface PatientTableProps {
  patients: Patient[];
  onView: (patient: Patient) => void;
  onDelete: (patient: Patient) => void;
  onAppointment: (patient: Patient) => void;
}

const PatientTable = ({ patients, onView, onDelete, onAppointment }: PatientTableProps) => {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th />
          <th>Nome</th>
          <th>Data de nascimento</th>
          <th>CPF</th>
          <th>Celular</th>
          <th>Última consulta</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => (
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
            <td>{patient.lastAppointmentDate ? parseDateToString(patient.lastAppointmentDate): '-'}</td>
            <td className="before:hidden lg:w-1 whitespace-nowrap">
              <Buttons type="justify-start lg:justify-end" noWrap>
                <Button
                  label="Consultas"
                  color="success"
                  icon={mdiListBoxOutline}
                  onClick={() => onAppointment(patient)}
                  small
                />
                <Button
                  color="info"
                  icon={mdiEye}
                  onClick={() => onView(patient)}
                  small
                />
                <Button
                  color="danger"
                  icon={mdiTrashCan}
                  onClick={() => onDelete(patient)}
                  small
                />
              </Buttons>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PatientTable;
