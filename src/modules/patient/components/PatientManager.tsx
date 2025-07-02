import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { mdiMagnify, mdiTableBorder } from '@mdi/js';

import SectionMain from '@/shared/components/Section/Main';
import CardBoxModal from '@/shared/components/CardBox/Modal';
import SectionTitleLine from '@/shared/components/Section/TitleLine';
import CardBox from '@/shared/components/CardBox';
import FormField from '@/shared/components/Form/Field';
import { Field, Formik } from 'formik';

import FormPatientCreate from './FormPatientCreate';
import FormPatientEdit from './FormPatientEdit';
import TablePatient from './PatientTable';

import { CreatePatientDTO, UpdatePatientDTO, Patient } from '@/modules/patient/types';
import { patientService } from '@/modules/patient/service/patientService';
import SearchFieldWatcher from '@/shared/components/Form/SearchFieldWatcher';
import { CreateAppointmentParams } from '@/modules/appointment/types';
import { toast } from 'react-toastify';
import { PAGE_SIZE } from '@/config';
import { appointmentService } from '@/modules/appointment/services';


const PatientManager = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [searchCriteria, setSearchCriteria] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [numPages, setNumPages] = useState(1);

    const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);
    const [isRegisterFormActive, setRegisterFormActive] = useState(false);
    const [isEditFormActive, setEditFormActive] = useState(false);

    const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);


    const router = useRouter();

    const fetchPatients = useCallback(async () => {
        try {
            const response = await patientService.search(currentPage, PAGE_SIZE, searchCriteria,
            );

            setPatients(response.data);
            setNumPages(Math.ceil(response.totalPages));
        } catch (err) {
            console.log(err);
        }
    }, [currentPage, searchCriteria]);

    useEffect(() => {
        fetchPatients();
    }, [fetchPatients]);

    const reset = () => {
        setRegisterFormActive(false);
        setEditFormActive(false);
        setCurrentPatient(null);
    };

    const handleRegister = async (payload: CreatePatientDTO) => {
        try {
            await patientService.create(payload);
            await fetchPatients();
            toast.success('Paciente cadastrado com sucesso');
            reset();
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdate = async (id: string, payload: UpdatePatientDTO) => {
        try {
            await patientService.update(id, payload);
            await fetchPatients();
            reset();
        } catch (err) {
            console.log(err);
        }
    };

    const handleRemove = async () => {
        if (!patientToDelete) return;

        try {
            await patientService.remove(patientToDelete.id);
            await fetchPatients();
            toast.success('Paciente removido com sucesso');
            setPatientToDelete(null);
            setIsDeleteConfirmOpen(false);
            reset();
        } catch (err) {
            console.log(err);
        }
    };

    const handleStartAppointment = async (params: CreateAppointmentParams) => {
        try {
            await appointmentService.create(params);
            toast.success('Consulta iniciada com sucesso');
        } catch (err) {
            console.log(err);
        }
    };

    const handleView = (patient: Patient) => {
        setCurrentPatient(patient);
        setEditFormActive(true);
    };

    const handleAppointment = (patient: Patient) => {
        router.push(`/pacientes/${patient.id}/consultas`);
    };


    const handleViewRegisterForm = () => {
        setRegisterFormActive(true);
    };


    const confirmDelete = (patient: Patient) => {
        setPatientToDelete(patient);
        setIsDeleteConfirmOpen(true);
    };

    return (
        <SectionMain>
            <SectionTitleLine icon={mdiTableBorder} title="Pacientes" main>
                <button
                    className="ml-auto px-4 py-3 md:py-2 bg-blue-500 w-auto text-white text-xs md:text-base rounded-lg hover:bg-blue-600"
                    onClick={handleViewRegisterForm}
                >
                    Novo Paciente
                </button>
            </SectionTitleLine>

            <CardBoxModal
                title="Cadastrar novo paciente"
                isActive={isRegisterFormActive}
                onCancel={reset}
            >
                <div className="px-4 pb-4">
                    <FormPatientCreate onConfirm={handleRegister} onCancel={reset} />
                </div>
            </CardBoxModal>

            <Formik initialValues={{ searchCriteria }} onSubmit={() => { }}>
                {({ values }) => (
                    <>
                        <SearchFieldWatcher
                            value={values.searchCriteria}
                            onChange={(val) => {
                                setSearchCriteria(val);
                                setCurrentPage(0);
                            }}
                        />
                        <FormField icons={[mdiMagnify]} name="searchCriteria">
                            <Field
                                type="text"
                                name="searchCriteria"
                                placeholder="Digite o nome ou CPF do paciente para filtrar os resultados"
                                className="px-4 py-2 border border-gray-300 rounded-lg mr-4 flex-grow"
                            />
                        </FormField>
                    </>
                )}
            </Formik>

            <CardBoxModal
                title="Atualizar dados do paciente"
                isActive={isEditFormActive}
                onCancel={reset}
            >
                <div className="px-4 pb-4">
                    <FormPatientEdit
                        patient={currentPatient as Patient}
                        onConfirm={handleUpdate}
                        onCancel={reset}
                    />
                </div>
            </CardBoxModal>

            <CardBoxModal
                title="Confirmar exclusão"
                isActive={isDeleteConfirmOpen}
                onCancel={() => {
                    setIsDeleteConfirmOpen(false);
                    setPatientToDelete(null);
                }}
                buttonLabel="Excluir"
                buttonColor="danger"
                onConfirm={handleRemove}
            >
                <div className="px-4 pb-4">
                    <p>Tem certeza que deseja excluir o paciente <strong>{patientToDelete?.name}</strong>?</p>
                </div>
            </CardBoxModal>

            <CardBox className="mb-6" hasTable>
                <TablePatient
                    patients={patients}
                    onView={handleView}
                    onDelete={confirmDelete}
                    onAppointment={handleAppointment}
                    onStartAppointment={handleStartAppointment}
                    currentPage={currentPage}
                    totalPages={numPages}
                    onPageChange={setCurrentPage}
                />
            </CardBox>
        </SectionMain>
    );
};

export default PatientManager;
