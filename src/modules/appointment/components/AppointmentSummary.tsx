import { AppointmentSummary } from '../types/summary'
import { formatDuration } from '@/shared/utils/formaters'
import CardBox from '@/shared/components/CardBox'

type AppointmentSummaryProps = {
  summary: AppointmentSummary
}

const AppointmentSummaryCards = ({ summary }: AppointmentSummaryProps) => {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <CardBox>
          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Total do dia</h4>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{summary.total}</p>
        </CardBox>
        <CardBox>
          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Pendentes</h4>
          <p className="text-2xl font-bold text-gray-500 dark:text-gray-400">{summary.pending}</p>
        </CardBox>
        <CardBox>
          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Em andamento</h4>
          <p className="text-2xl font-bold text-blue-500">{summary.inProgress}</p>
        </CardBox>
        <CardBox>
          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Aguardando pagamento</h4>
          <p className="text-2xl font-bold text-yellow-500">{summary.waitingForPayment}</p>
        </CardBox>
        <CardBox>
          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Finalizadas</h4>
          <p className="text-2xl font-bold text-green-600">{summary.completed}</p>
        </CardBox>
        <CardBox>
          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">Cancelados</h4>
          <p className="text-2xl font-bold text-red-600">{summary.canceled}</p>
        </CardBox>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 mb-6">
        <CardBox className="text-center">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Tempo médio de espera</p>
          <p className="text-xl font-semibold font-mono text-gray-800 dark:text-gray-100">
            {formatDuration(summary.avgWaitingTime)}
          </p>
        </CardBox>

        <CardBox className="text-center">
          <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Tempo médio de atendimento</p>
          <p className="text-xl font-semibold font-mono text-gray-800 dark:text-gray-100">
            {formatDuration(summary.avgConsultTime)}
          </p>
        </CardBox>
      </div>
    </div>
  )
}

export default AppointmentSummaryCards
