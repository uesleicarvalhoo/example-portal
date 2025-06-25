import PatientForm from './PatientForm'
import { toCreatePatientDTO } from '../../utils/mappers/patient'
import { CreatePatientDTO, PatientFormValues } from '../../types/patient'

interface Props {
  onConfirm: (data: CreatePatientDTO) => void
  onCancel: () => void
}

const FormPatientCreate = ({ onConfirm, onCancel }: Props) => {
  const handleSubmit = (values: PatientFormValues) => {
    const payload = toCreatePatientDTO(values)
    onConfirm(payload)
  }

  const initialValues: PatientFormValues = {
    fullName: '',
    birthDate: '',
    cpf: '',
    phone: '',
    email: '',
    observations: '',
    street: '',
    neighborhood: '',
    city: '',
    state: '',
    cep: '',
    complement: '',
  }

  return (
    <PatientForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  )
}

export default FormPatientCreate
