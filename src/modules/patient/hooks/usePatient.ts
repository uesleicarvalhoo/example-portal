import { useState } from 'react';
import { Patient } from '../types/patient';
import { patientService } from '../service';

export const usePatientList = () => {
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const fetch = async (page: number, size: number, search?: string) => {
    setLoading(true);
    try {
      const response = await patientService.search(page, size, search);
      setPatients(response.data);
      setTotalPages(response.totalPages);
    } catch (err) {
      console.error('Erro ao buscar pacientes:', err);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    patients,
    totalPages,
    fetch,
  };
};
