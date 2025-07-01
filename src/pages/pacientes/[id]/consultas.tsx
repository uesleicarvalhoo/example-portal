import Head from 'next/head';
import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LayoutAuthenticated from '../../../layouts/Authenticated';
import SectionMain from '../../../components/Section/Main';
import SectionTitleLine from '../../../components/Section/TitleLine';
import AppointmentTable from '../../../components/Appointment/AppointmentTable';
import AppointmentModal from '../../../components/Appointment/AppointmentModal';
import { useAppointmentModal } from '../../../hooks/useAppointmentModal';
import { appointmentService, patientService } from '../../../services';
import { Appointment, Patient } from '../../../types';
import { getPageTitle } from '../../../config';
import { mdiCalendarClock } from '@mdi/js';
import PatientInfo from '../../../components/Patient/PatientInfo';

const PatientAppointmentsPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [patient, setPatient] = useState<Patient | null>(null);

    const {
        isOpen,
        open,
        close,
        selectedAppointment,
        selectedPatient,
    } = useAppointmentModal();

    const fetchAppointments = async () => {
        if (!id) return;
        const result = await appointmentService.getByPatientID(id as string);
        setAppointments(result);
    };

    const fetchPatient = async () => {
        if (!id) return;
        const result = await patientService.getById(id as string);
        setPatient(result);
    };

    useEffect(() => {
        fetchAppointments();
        fetchPatient();
    }, [id]);

    return (
        <>
            <Head>
                <title>{getPageTitle('Histórico de Consultas')}</title>
            </Head>

            <SectionMain>
                <SectionTitleLine icon={mdiCalendarClock} title="Histórico de Consultas" main />
                <div className='mb-6 border rounded p-6 bg-white shadow-sm'>
                    <PatientInfo
                        patient={patient}
                    />
                </div>
                <AppointmentModal
                    isActive={isOpen}
                    appointment={selectedAppointment}
                    patient={selectedPatient}
                    onClose={close}
                    onRefresh={fetchAppointments}
                />

                <div className='mb-6 border rounded p-6 bg-white shadow-sm'>
                    <AppointmentTable
                        appointments={appointments}
                        onStart={() => { }}
                        onView={(appointmentId) => open(appointmentId)}
                    />
                </div>
            </SectionMain>
        </>
    );
};

PatientAppointmentsPage.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default PatientAppointmentsPage;
