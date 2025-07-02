import {
    mdiEye,
    mdiListBoxOutline,
    mdiTrashCan,
    mdiStethoscope,
} from '@mdi/js';

import Button from '@/shared/components/Button';
import Buttons from '@/shared/components/Buttons';

import { Patient } from '../types/patient';
import { CreateAppointmentParams } from '@/modules/appointment/types/appointment';
import { toCreateAppointmentParams } from '../mappers/patientMapper';

interface Props {
    patient: Patient;
    onView: (patient: Patient) => void;
    onDelete: (patient: Patient) => void;
    onAppointment: (patient: Patient) => void;
    onStartAppointment: (params: CreateAppointmentParams) => void;
}

export default function PatientActions({
    patient,
    onView,
    onDelete,
    onAppointment,
    onStartAppointment,
}: Props) {
    const handleStartAppointment = () => {
        const params = toCreateAppointmentParams(patient);
        onStartAppointment(params);
    };

    return (
        <Buttons type="justify-start lg:justify-end" noWrap>
            <Button
                label="Adicionar à fila"
                icon={mdiStethoscope}
                color="warning"
                onClick={handleStartAppointment}
                small
            />
            <Button
                label="Consultas"
                icon={mdiListBoxOutline}
                color="success"
                onClick={() => onAppointment(patient)}
                small
            />
            <Button
                icon={mdiEye}
                color="info"
                onClick={() => onView(patient)}
                small
            />
            <Button
                icon={mdiTrashCan}
                color="danger"
                onClick={() => onDelete(patient)}
                small
            />
        </Buttons>
    );
}
