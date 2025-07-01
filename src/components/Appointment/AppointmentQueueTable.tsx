import { useState } from 'react';
import CardBoxModal from '../CardBox/Modal';
import PaginationControls from '../Pagination/PaginationControl';
import { Appointment } from '../../types/appointment';
import { AppointmentStatus } from '../../enum';
import AppointmentQueueRow from './AppointmentQueueRow';

type AppointmentQueueTableProps = {
  appointments: Appointment[];
  onStart: (appointment: Appointment) => void;
  onView: (appointment: Appointment) => void;
  onUpdateStatus: (appointmentId: string, newStatus: AppointmentStatus) => void;
  onPageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
};

const AppointmentQueueTable = ({
  appointments,
  onStart,
  onView,
  onUpdateStatus,
  onPageChange,
  currentPage,
  totalPages,
}: AppointmentQueueTableProps) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [newStatus, setNewStatus] = useState<AppointmentStatus>(AppointmentStatus.InProgress);

  const openEditModal = (appt: Appointment) => {
    setSelectedAppointment(appt);
    setNewStatus(appt.status);
    setEditModalVisible(true);
  };

  const handleConfirmStatusUpdate = () => {
    if (selectedAppointment) {
      onUpdateStatus(selectedAppointment.id, newStatus);
      setEditModalVisible(false);
      setSelectedAppointment(null);
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-center">
          <thead>
            <tr>
              <th>Paciente</th>
              <th className="w-1 whitespace-nowrap">Tempo de espera</th>
              <th className="w-1 whitespace-nowrap">Tempo de consulta</th>
              <th>Status</th>
              <th className="w-1 whitespace-nowrap">Ações</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  Nenhuma consulta na fila no momento.
                </td>
              </tr>
            ) : (
              appointments.map((appt) => (
                <AppointmentQueueRow
                  key={appt.id}
                  appointment={appt}
                  onStart={onStart}
                  onView={onView}
                  onEdit={openEditModal}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />

      <CardBoxModal
        title="Atualizar status da consulta"
        buttonColor="info"
        buttonLabel="Atualizar status"
        isActive={editModalVisible}
        onConfirm={handleConfirmStatusUpdate}
        onCancel={() => setEditModalVisible(false)}
      >
        <div className="space-y-4">
          <p>
            Atualizar status da consulta de <strong>{selectedAppointment?.patientName}</strong>:
          </p>
          <select
            className="w-full border border-gray-300 rounded p-2"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value as AppointmentStatus)}
          >
            <option value={AppointmentStatus.Pending}>Pendente</option>
            <option value={AppointmentStatus.InProgress}>Em andamento</option>
            <option value={AppointmentStatus.Completed}>Concluída</option>
            <option value={AppointmentStatus.WaitingPayment}>Aguardando Pagamento</option>
            <option value={AppointmentStatus.Canceled}>Cancelada</option>
          </select>
        </div>
      </CardBoxModal>
    </>
  );
};

export default AppointmentQueueTable;
