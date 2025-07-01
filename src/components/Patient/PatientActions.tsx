import {
    mdiEye,
    mdiListBoxOutline,
    mdiTrashCan,
    mdiStethoscope,
} from '@mdi/js';
import Button from '../../components/Button';
import Buttons from '../../components/Buttons';
import { Patient } from '../../types/patient';
import { CreateAppointmentParams } from '../../types/appointment';
import { toCreateAppointmentParams } from '../../utils/mappers/patient';

interface PatientActionsProps {
    patient: Patient;
    onView: (patient: Patient) => void;
    onDelete: (patient: Patient) => void;
    onAppointment: (patient: Patient) => void;
    onStartAppointment: (patient: CreateAppointmentParams) => void;
}

const PatientActions = ({
    patient,
    onView,
    onDelete,
    onAppointment,
    onStartAppointment,
}: PatientActionsProps) => {
    
    const handleStartAppointment = (patient: Patient) => {
        const params = toCreateAppointmentParams(patient);
        onStartAppointment(params)
    }

    return (
        <Buttons type="justify-start lg:justify-end" noWrap>
            <Button
                label="Adicionar a fila"
                icon={mdiStethoscope}
                color="warning"
                onClick={() => handleStartAppointment(patient)}
                small
            />
            <Button
                label="Consultas"
                color="success"
                icon={mdiListBoxOutline}
                onClick={() => onAppointment(patient)}
                small
            />
            <Button
                color="info"
                icon={mdiEye}
                onClick={() => onView(patient)}
                small
            />
            <Button
                color="danger"
                icon={mdiTrashCan}
                onClick={() => onDelete(patient)}
                small
            />
        </Buttons>
    );
};

export default PatientActions;
