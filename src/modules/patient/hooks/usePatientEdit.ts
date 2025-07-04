import { useState } from 'react';
import { toast } from 'react-toastify';
import { patientService } from '@/modules/patient/service/patientService';
import { UpdatePatientDTO, Patient } from '@/modules/patient/types';
import { usePatientList } from './usePatient';

export const usePatientEdit = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [patient, setPatient] = useState<Patient | null>(null);
  const { fetchPatients } = usePatientList();

  const open = (p: Patient) => {
    setPatient(p);
    setIsOpen(true);
  };
  const close = () => {
    setPatient(null);
    setIsOpen(false);
  };

  const handleUpdate = async (id: string, payload: UpdatePatientDTO) => {
    await patientService.update(id, payload);
    await fetchPatients();
    toast.success('Paciente atualizado com sucesso');
    close();
  };

  return {
    isOpen,
    patient,
    open,
    close,
    handleUpdate,
  };
};
