import { useState } from 'react';
import { toast } from 'react-toastify';
import { patientService } from '@/modules/patient/service/patientService';
import { Patient } from '@/modules/patient/types';
import { usePatientList } from './usePatient';

export const usePatientDelete = () => {
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

    const handleDelete = async () => {
        if (!patient) return;
        await patientService.remove(patient.id);
        await fetchPatients();
        toast.success('Paciente removido com sucesso');
        close();
    };

    return {
        isOpen,
        patient,
        open,
        close,
        handleDelete,
    };
};
