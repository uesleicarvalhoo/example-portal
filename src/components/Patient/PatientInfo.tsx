import { Patient } from '../../types/patient';

interface Props {
  patient: Patient | null;
}

const PatientInfo = ({ patient }: Props) => {
  if (!patient) {
    return null
  }

  return (
    <div className="rounded bg-white">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{patient.name}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div>
          <p className="text-sm font-medium text-gray-500">Email</p>
          <p className="text-base text-gray-800">{patient.email}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Telefone</p>
          <p className="text-base text-gray-800">{patient.phone}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">CPF</p>
          <p className="text-base text-gray-800">{patient.cpf}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Data de Nascimento</p>
          <p className="text-base text-gray-800">
            {new Date(patient.birthDate).toLocaleDateString()}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Cidade</p>
          <p className="text-base text-gray-800">{patient.address.city}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Estado</p>
          <p className="text-base text-gray-800">{patient.address.state}</p>
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;
