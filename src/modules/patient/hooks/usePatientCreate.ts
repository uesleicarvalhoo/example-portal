import { useState } from 'react';
import { toast } from 'react-toastify';
import { patientService } from '@/modules/patient/service/patientService';
import { CreatePatientDTO } from '@/modules/patient/types';
import { usePatientList } from './usePatient';

export const usePatientCreate = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { fetchPatients } = usePatientList();

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    const handleCreate = async (payload: CreatePatientDTO) => {
        await patientService.create(payload);
        await fetchPatients();
        toast.success('Paciente cadastrado com sucesso');
        close();
    };

    return {
        isOpen,
        open,
        close,
        handleCreate,
    };
};
