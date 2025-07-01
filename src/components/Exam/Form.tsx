import { Exam } from '../../types'
import { ExamFormValues } from '../../types/exam'
import { fromExamFormValues, toExamFormValues } from '../../utils/mappers/exam'
import ExamFormFields from './FormFields'
import { ExamParams } from '../../types/exam'
import { AppointmentWithDetails } from '../../types/appointment'
import { AppointmentStatus } from '../../enum'
import PatientInfo from '../Patient/PatientInfo'

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
        console.log('exam values: ', values)
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
