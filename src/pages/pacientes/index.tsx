import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import LayoutAuthenticated from '@/layouts/Authenticated';
import { getPageTitle } from '@/config';
import { Patient, UpdatePatientDTO } from '@/modules/patient/types';

import SectionMain from '@/shared/components/Section/Main';
import SectionTitleLine from '@/shared/components/Section/TitleLine';
import CardBox from '@/shared/components/CardBox';
import PatientModal from '@/modules/patient/components/PatientModal';
import TablePatient from '@/modules/patient/components/PatientTable';
import PatientSearch from '@/modules/patient/components/PatientSearch';
import ConfirmModal from '@/shared/components/ConfirmModal';

import { mdiTableBorder } from '@mdi/js';
import { usePatientList } from '@/modules/patient/hooks/usePatient';
import { usePatientEdit } from '@/modules/patient/hooks/usePatientEdit';
import { usePatientDelete } from '@/modules/patient/hooks/usePatientDelete';
import { usePatientCreate } from '@/modules/patient/hooks/usePatientCreate';
import { useAppointmentCreate } from '@/modules/appointment/hooks/useAppointmentCreate';
import { CreateAppointmentParams } from '@/modules/appointment/types';

const PatientPage = () => {
  const {
    patients,
    currentPage,
    totalPages,
    searchCriteria,
    setSearchCriteria,
    setCurrentPage,
  } = usePatientList();

  const router = useRouter();

  const create = usePatientCreate();
  const edit = usePatientEdit();
  const del = usePatientDelete();
  const createAppointment = useAppointmentCreate();

  const handleUpdate = async (payload: UpdatePatientDTO) => {
    if (!edit.patient) return;
    await edit.handleUpdate(edit.patient.id, payload);
  };

  

  const handleAppointment = (patient: Patient) => {
    router.push(`/pacientes/${patient.id}/consultas`);
  };

  const handleStartAppointment = async (params: CreateAppointmentParams) => {
    await createAppointment.handleCreate(params);
  };

  const handleView = (patient: Patient) => {
    edit.open(patient);
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Pacientes')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLine icon={mdiTableBorder} title="Pacientes" main>
          <button
            className="ml-auto px-4 py-3 md:py-2 bg-blue-500 w-auto text-white text-xs md:text-base rounded-lg hover:bg-blue-600"
            onClick={create.open}
          >
            Novo Paciente
          </button>
        </SectionTitleLine>

        <PatientSearch
          searchCriteria={searchCriteria}
          onSearchChange={setSearchCriteria}
          resetPage={() => setCurrentPage(0)}
        />

        {create.isOpen && (
          <PatientModal
            isOpen
            mode="create"
            onSubmit={create.handleCreate}
            onCancel={create.close}
          />
        )}

        {edit.isOpen && edit.patient && (
          <PatientModal
            isOpen
            mode="edit"
            patient={edit.patient}
            onSubmit={handleUpdate}
            onCancel={edit.close}
          />
        )}

        {del.isOpen && del.patient && (
          <ConfirmModal
            isOpen={del.isOpen}
            title="Confirmar exclusão"
            description={`Tem certeza que deseja excluir o paciente ${del.patient.name}?`}
            confirmLabel="Excluir"
            cancelLabel="Cancelar"
            confirmColor="danger"
            onCancel={del.close}
            onConfirm={del.handleDelete}
          />
        )}

        <CardBox className="mb-6" hasTable>
          <TablePatient
            patients={patients}
            onView={handleView}
            onDelete={del.open}
            onAppointment={handleAppointment}
            onStartAppointment={handleStartAppointment}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

PatientPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default PatientPage;
