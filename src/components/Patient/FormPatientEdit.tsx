import PatientForm from './PatientForm'
import { Patient, PatientFormValues, UpdatePatientDTO } from '../../types/patient'
import { toUpdatePatientDTO, toPatientFormValues } from '../../utils/mappers/patient'

interface Props {
  patient: Patient
  onConfirm: (id: string, data: UpdatePatientDTO) => void
  onCancel: () => void
}

const FormPatientEdit = ({ patient, onConfirm, onCancel }: Props) => {
  const handleSubmit = (values: PatientFormValues) => {
    const payload = toUpdatePatientDTO(values)
    onConfirm(patient.id, payload)
  }

  return (
    <PatientForm
      initialValues={toPatientFormValues(patient)}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      readOnlyFields={['cpf']}
    />
  )
}

export default FormPatientEdit
