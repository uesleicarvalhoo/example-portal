import Head from 'next/head';
import { ReactElement } from 'react';
import LayoutAuthenticated from '@/layouts/Authenticated';
import { getPageTitle } from '@/config';
import AppointmentManager from '@/modules/appointment/components/AppointmentManager';


const PatientPage = () => {
    return (
        <>
            <Head>
                <title>{getPageTitle('Consultas')}</title>
            </Head>
            <AppointmentManager />
        </>
    );
};

PatientPage.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default PatientPage;
