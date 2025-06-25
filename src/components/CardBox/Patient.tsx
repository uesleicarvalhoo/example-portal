import React from 'react'
import CardBoxComponentBody from './Component/Body'
import { Patient } from '../../types'
import { calculateAge, parseDateToString } from '../../utils/formaters'

type Props = {
    patient: Patient
}

const CardBoxPatient = ({ patient }: Props) => {
    const lastAppointment = patient.appointments?.reduce((latest, appointment) => {
        return new Date(appointment.date) > new Date(latest.date) ? appointment : latest;
    }, patient.appointments[0]);

    return (
        <div className='rounded-2xl bg-white bg-gray-800 dark:bg-slate-700 border-gray-800 dark:border-slate-700 flex-col'>
            <div className="flex items-center justify-between bg-blue-500 dark:bg-slate-900 border-slate-500 dark:border-slate-700 text-white">
                <h1 className="text-2xl p-2">Informações do paciente</h1>
            </div>
            <CardBoxComponentBody>
                <div className="flex">
                    <div className="flex-1">
                        <div className="font-bold text-black dark:text-white">Nome completo</div>
                        <div className="text-black dark:text-white">{patient.name}</div>
                    </div>
                    <div className="flex-1">
                        <div className="font-bold text-black dark:text-white">Data de nascimento</div>
                        <div className="text-black dark:text-white">{parseDateToString(patient.birthDate)} {patient.birthDate? '- ' + calculateAge(patient.birthDate) + ' Anos': ''}</div>
                    </div>
                    <div className="flex-1">
                        <div className='font-bold text-black dark:text-white'>Ultima consulta</div>
                        <div className="text-black dark:text-white">{lastAppointment ? parseDateToString(lastAppointment.date) : '-'}</div>
                    </div>
                    <div className="flex-1">
                        <div className="font-bold text-black dark:text-white">Profissão</div>
                        <div className="text-black dark:text-white">{patient.occupation}</div>
                    </div>
                </div>
                <div className='flex-1 mt-4'>
                    <div className='font-bold text-black dark:text-white'>Observações</div>
                    <div className="text-black dark:text-white">{patient.observations}</div>
                </div>
            </CardBoxComponentBody>
        </div>
    )
}

export default CardBoxPatient
