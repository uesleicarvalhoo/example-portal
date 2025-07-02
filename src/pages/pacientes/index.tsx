import Head from 'next/head';
import { ReactElement } from 'react';
import LayoutAuthenticated from '@/layouts/Authenticated';
import { getPageTitle } from '@/config';
import PatientManager from '@/modules/patient/components/PatientManager';

const PatientPage = () => {
  return (
    <>
      <Head>
        <title>{getPageTitle('Pacientes')}</title>
      </Head>
      <PatientManager />
    </>
  );
};

PatientPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default PatientPage;
