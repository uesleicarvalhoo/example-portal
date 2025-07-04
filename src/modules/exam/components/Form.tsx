import { Exam, ExamFormValues } from '../types/exam'
import { fromExamFormValues, toExamFormValues } from '../mappers/exam'
import ExamFormFields from './FormFields'
import { ExamParams } from '../types/exam'
import { AppointmentWithDetails } from '@/modules/appointment/types/appointment'
import { AppointmentStatus } from '@/modules/appointment/enum'
import PatientInfo from '@/modules/patient/components/PatientInfo'

interface Props {
    appointment: AppointmentWithDetails
    onConfirm: (data: Exam) => void
    onCancel: () => void
    readOnlyFields?: (keyof Exam | string)[]
}

const ExamFormView = ({
    appointment,
    onConfirm,
    onCancel,
    readOnlyFields = [],
}: Props) => {
    const handleSubmit = (values: ExamFormValues) => {
        const examId = appointment.examination ? appointment.examination.id : ''
        const payload = fromExamFormValues(examId, appointment.id, values)
        onConfirm(payload)
    }

    const initialValues: ExamParams = appointment.examination ? toExamFormValues(appointment.examination) : {
        appointmentId: appointment.id,
        observations: '',
        rightEye: {
            spherical: 0,
            cylindrical: 0,
            axis: 0,
            observations: '',
        },
        leftEye: {
            spherical: 0,
            cylindrical: 0,
            axis: 0,
            observations: '',
        },
        conditions: {
            astigmatism: false,
            myopia: false,
            hyperopia: false,
            presbyopia: false,
        },
    }

    return (
        <div className="px-4 pb-4">
            <PatientInfo
                patient={appointment.patient}
            />
            <ExamFormFields
                initialValues={initialValues}
                onSubmit={handleSubmit}
                onCancel={onCancel}
                readOnlyFields={readOnlyFields}
                submitLabel={appointment.status == AppointmentStatus.InProgress ? 'Salvar' : 'Confirmar'}
            />
        </div>
    )
}

export default ExamFormView
