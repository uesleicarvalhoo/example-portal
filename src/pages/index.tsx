import Head from 'next/head'
import React, { useEffect, useState, useCallback } from 'react'
import type { ReactElement } from 'react'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/Section/Main'
import { getPageTitle, PAGE_SIZE } from '../config'
import { useAuthContext } from '../context'
import AppointmentSummaryCards from '../components/Appointment/AppointmentSummary'
import AppointmentQueueTable from '../components/Appointment/AppointmentQueueTable'
import { appointmentService } from '../services'
import { Appointment } from '../types/appointment'
import { AppointmentStatus } from '../enum'
import { AppointmentSummary } from '../types/summary'
import { toast } from 'react-toastify'
import AppointmentModal from '../components/Appointment/AppointmentModal'
import { useAppointmentModal } from '../hooks/useAppointmentModal'
import { useAppointmentActions } from '../hooks/useAppointmentActions'
import { useIntervalFetch } from '../hooks/useIntervalFetch'
import CardBox from '../components/CardBox'

const DashboardPage = () => {
  const { user } = useAuthContext()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [summary, setSummary] = useState({} as AppointmentSummary)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const {
    isOpen,
    open,
    close,
    selectedAppointment,
    selectedPatient,
  } = useAppointmentModal()

  const fetchAppointments = useCallback(async () => {
    try {
      const page = currentPage + 1 // backend is 1-based
      const result = await appointmentService.search({
        page,
        pageSize: PAGE_SIZE,
        status: [
          AppointmentStatus.Pending,
          AppointmentStatus.InProgress,
          AppointmentStatus.WaitingPayment,
        ],
      })
      setAppointments(result.data)
      setTotalPages(Math.ceil(result.total / PAGE_SIZE))
    } catch (err) {
      console.error('Erro ao buscar consultas:', err)
    }
  }, [currentPage])

  const fetchSummary = useCallback(async () => {
    try {
      const result = await appointmentService.getSummary({
        startDate: new Date(),
        endDate: new Date(),
      })
      setSummary(result)
    } catch (err) {
      console.error('Erro ao buscar resumo de consultas:', err)
    }
  }, [])

  useEffect(() => {
    fetchAppointments()
    fetchSummary()
  }, [fetchAppointments, fetchSummary])

  useIntervalFetch(() => {
    fetchAppointments()
    fetchSummary()
  }, 30_000)

  const { updateStatus } = useAppointmentActions({
    onRefresh: async () => {
      await fetchAppointments()
      await fetchSummary()
    },
  })

  const handleStartAppointment = async (appt: Appointment) => {
    try {
      await appointmentService.updateStatus(appt.id, AppointmentStatus.InProgress)
      toast.success('Consulta iniciada com sucesso!')
      await handleViewAppointment(appt)
    } catch (err) {
      toast.error('Erro ao iniciar a consulta.')
      console.error(err)
    } finally {
      await fetchAppointments()
      await fetchSummary()
    }
  }

  const handleViewAppointment = async (appt: Appointment) => {
    await open(appt.id)
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Dashboard')}</title>
      </Head>
      <SectionMain>
        <h3 className="text-lg font-semibold mb-6">
          Bem-vindo, {user ? user.name : 'Visitante'}!
        </h3>

        <AppointmentModal
          isActive={isOpen}
          appointment={selectedAppointment}
          patient={selectedPatient}
          onClose={close}
          onRefresh={async () => {
            await fetchAppointments()
            await fetchSummary()
          }}
        />

        <AppointmentSummaryCards summary={summary} />
        <h4 className="text-lg font-semibold text-gray-800 dark:text-slate-100 mb-4">
          Consultas na fila
        </h4>

        <CardBox className="mb-6" hasTable>
          <AppointmentQueueTable
            appointments={appointments}
            onStart={handleStartAppointment}
            onView={handleViewAppointment}
            onUpdateStatus={updateStatus}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </CardBox>

      </SectionMain>
    </>
  )
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default DashboardPage
