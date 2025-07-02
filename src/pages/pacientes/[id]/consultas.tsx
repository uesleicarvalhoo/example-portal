import Head from 'next/head';
import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LayoutAuthenticated from '@/layouts/Authenticated';
import SectionMain from '@/shared/components/Section/Main';
import SectionTitleLine from '@/shared/components/Section/TitleLine';
import AppointmentTable from '@/modules/appointment/components/AppointmentTable';
import AppointmentModal from '@/modules/appointment/components/AppointmentModal';
import { useAppointmentModal } from '@/modules/appointment/hooks/useAppointmentModal';
import { useAppointmentListByPatient } from '@/modules/appointment/hooks/useAppointmentListByPatient';
import PatientInfo from '@/modules/patient/components/PatientInfo';
import { patientService } from '@/modules/patient/service';
import { Patient } from '@/modules/patient/types';
import { getPageTitle } from '@/config';
import { mdiCalendarClock } from '@mdi/js';

const PatientAppointmentsPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const [patient, setPatient] = useState<Patient | null>(null);

    const {
        isOpen,
        open,
        close,
        selectedAppointment,
        selectedPatient,
    } = useAppointmentModal();

    const {
        appointments,
        currentPage,
        totalPages,
        setCurrentPage,
        fetchAppointments,
    } = useAppointmentListByPatient(typeof id === 'string' ? id : undefined);

    useEffect(() => {
        const fetchPatient = async () => {
            if (typeof id !== 'string') return;
            const result = await patientService.getById(id);
            setPatient(result);
        };

        fetchPatient();
    }, [id]);

    return (
        <>
            <Head>
                <title>{getPageTitle('Histórico de Consultas')}</title>
            </Head>

            <SectionMain>
                <SectionTitleLine icon={mdiCalendarClock} title="Histórico de Consultas" main />

                <div className="mb-6 border rounded p-6 bg-white shadow-sm">
                    <PatientInfo patient={patient} />
                </div>

                <AppointmentModal
                    isActive={isOpen}
                    appointment={selectedAppointment}
                    patient={selectedPatient}
                    onClose={close}
                    onRefresh={fetchAppointments}
                />

                <div className="mb-6 border rounded p-6 bg-white shadow-sm">
                    <AppointmentTable
                        appointments={appointments}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
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
