import { useState } from 'react';
import { Patient } from '@/modules/patient/types';

export const usePatientView = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [patient, setPatient] = useState<Patient | null>(null);

    const open = (p: Patient) => {
        setPatient(p);
        setIsOpen(true);
    };
    const close = () => {
        setPatient(null);
        setIsOpen(false);
    };

    return {
        isOpen,
        patient,
        open,
        close,
    };
};
