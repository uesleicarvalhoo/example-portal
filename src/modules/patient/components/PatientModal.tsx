import CardBoxModal from '@/shared/components/CardBox/Modal';
import PatientForm from './PatientForm';
import { Patient, CreatePatientDTO, UpdatePatientDTO, PatientFormValues } from '../types/patient';
import { toCreatePatientDTO, toUpdatePatientDTO, toPatientFormValues } from '../mappers/patientMapper';

interface Props {
    isOpen: boolean;
    mode: 'create' | 'edit' | 'view';
    patient?: Patient;
    onSubmit: (data: CreatePatientDTO | UpdatePatientDTO) => void;
    onCancel: () => void;
}

const PatientModal = ({
    isOpen,
    mode,
    patient,
    onSubmit,
    onCancel,
}: Props) => {
    const isView = mode === 'view';
    const isEdit = mode === 'edit';
    const allFields = Object.keys({} as PatientFormValues) as (keyof PatientFormValues)[];

    const handleSubmit = (values: PatientFormValues) => {
        if (isEdit && patient) {
            const payload = toUpdatePatientDTO(values);
            onSubmit({ ...payload });
        } else {
            const payload = toCreatePatientDTO(values);
            onSubmit(payload);
        }
    };

    const getTitle = () => {
        if (mode === 'create') return 'Cadastrar novo paciente';
        if (mode === 'edit') return 'Editar paciente';
        return 'Visualizar paciente';
    };

    return (
        <CardBoxModal title={getTitle()} isActive={isOpen} onCancel={onCancel}>
            <div className="pb-4">
                <PatientForm
                    initialValues={patient ? toPatientFormValues(patient) : undefined}
                    onSubmit={handleSubmit}
                    onCancel={onCancel}
                    readOnlyFields={isView ? allFields : isEdit ? ['cpf'] : []}
                    submitLabel={isView ? undefined : (isEdit ? 'Salvar Alterações' : 'Cadastrar')}
                />
            </div>
        </CardBoxModal>
    );
};

export default PatientModal;
