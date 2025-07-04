import { useCallback, useEffect, useState } from 'react';
import { Patient } from '../types';
import { patientService } from '../service/patientService';
import { PAGE_SIZE } from '@/config';

export const usePatientList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchCriteria, setSearchCriteria] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPatients = useCallback(async () => {
    setLoading(true);
    try {
      const response = await patientService.search(currentPage, PAGE_SIZE, searchCriteria);
      setPatients(response.data);
      setTotalPages(Math.max(1, response.totalPages));
    } catch (err) {
      console.error('Erro ao buscar pacientes:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchCriteria]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  return {
    patients,
    currentPage,
    totalPages,
    searchCriteria,
    setSearchCriteria,
    setCurrentPage,
    fetchPatients,
    loading,
  };
};
