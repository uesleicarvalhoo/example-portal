import { CreateAppointmentParams } from '@/modules/appointment/types/appointment';
import { Patient } from '@/modules/patient/types/patient';
import PatientRow from './PatientRow';
import PaginationControls from '@/shared/components/PaginationControl';

interface PatientTableProps {
  patients: Patient[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onView: (patient: Patient) => void;
  onDelete: (patient: Patient) => void;
  onAppointment: (patient: Patient) => void;
  onStartAppointment: (params: CreateAppointmentParams) => void;
}

const PatientTable = ({
  patients,
  currentPage,
  totalPages,
  onPageChange,
  onView,
  onDelete,
  onAppointment,
  onStartAppointment,
}: PatientTableProps) => {
  return (
    <>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th />
            <th>Nome</th>
            <th>Data de nascimento</th>
            <th>CPF</th>
            <th>Celular</th>
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

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default PatientTable;
