import { CreateAppointmentParams } from '../../types/appointment';
import { Patient } from '../../types/patient';
import PatientRow from './PatientRow';

interface PatientTableProps {
  patients: Patient[];
  onView: (patient: Patient) => void;
  onDelete: (patient: Patient) => void;
  onAppointment: (patient: Patient) => void;
  onStartAppointment: (params: CreateAppointmentParams) => void;
}

const PatientTable = ({
  patients,
  onView,
  onDelete,
  onAppointment,
  onStartAppointment
}: PatientTableProps) => {
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
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => (
          <PatientRow
            key={patient.id}
            patient={patient}
            onView={onView}
            onDelete={onDelete}
            onAppointment={onAppointment}
            onStartAppointment={onStartAppointment}
          />
        ))}
      </tbody>
    </table>
  );
};

export default PatientTable;
