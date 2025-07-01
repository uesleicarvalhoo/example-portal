import { AppointmentStatus } from '../enum/appointment';

export const getStatusBadgeProps = (
  status: AppointmentStatus
): { label: string; color: 'gray' | 'blue' | 'green' | 'red' | 'yellow' } => {
  switch (status) {
    case AppointmentStatus.Pending:
      return { label: 'Pendente', color: 'gray' };
    case AppointmentStatus.Completed:
      return { label: 'Concluída', color: 'green' };
    case AppointmentStatus.InProgress:
      return { label: 'Em Andamento', color: 'blue' };
    case AppointmentStatus.Canceled:
      return { label: 'Cancelada', color: 'red' };
    case AppointmentStatus.WaitingPayment:
      return { label: 'Aguardando Pagamento', color: 'yellow' };
    case AppointmentStatus.NoShow:
      return { label: 'Faltou', color: 'blue' };
    default:
      return { label: 'Desconhecido', color: 'gray' };
  }
};
