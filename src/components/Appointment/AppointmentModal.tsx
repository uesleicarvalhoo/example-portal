import CardBoxModal from '../CardBox/Modal';
import ExamForm from '../Exam/Form';
import { AppointmentStatus } from '../../enum';
import { toast } from 'react-toastify';
import { ExamParams } from '../../types/exam';
import { appointmentService } from '../../services';
import { AppointmentWithDetails } from '../../types/appointment';
import { Patient } from '../../types/patient';

interface Props {
    isActive: boolean;
    appointment: AppointmentWithDetails | null;
    patient: Patient | null;
    onClose: () => void;
    onRefresh?: () => void;
}

const AppointmentModal = ({ isActive, appointment, patient, onClose, onRefresh }: Props) => {
    const handleSubmitExam = async (params: ExamParams) => {
        try {
            if (!appointment) return;

            const hasExam = !!appointment.examination?.id;

            if (hasExam) {
                await appointmentService.updateExam(params);
                toast.success('Consulta atualizada com sucesso');
            } else {
                await appointmentService.registerExam(params);
                toast.success('Consulta registrada com sucesso');
            }

            onRefresh?.();
            onClose();
        } catch (err) {
            console.error(err);
            toast.error('Erro ao salvar os dados da consulta');
        }
    };

    return (
        <CardBoxModal title="Dados da consulta" isActive={isActive} onCancel={onClose}>
            {appointment && (
                <div className="pb-4">
                    <ExamForm
                        appointment={appointment}
                        onConfirm={handleSubmitExam}
                        onCancel={onClose}
                        readOnlyFields={appointment.status !== AppointmentStatus.InProgress ? ['*'] : []}
                    />
                </div>
            )}
        </CardBoxModal>
    );
};

export default AppointmentModal;
