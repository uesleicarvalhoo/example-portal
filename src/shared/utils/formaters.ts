import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { AppointmentStatus } from '@/modules/appointment/enum';

export const parseCpf = (cpf: string): string => {
  const cleaned = cpf.replace(/\D/g, '')
  if (cleaned.length == 0) {
    return ''
  } else {
    const firstPart = cleaned.slice(0, 3)
    const secondPart = cleaned.slice(3, 6)
    const thirdPart = cleaned.slice(6, 9)
    const verifyCode = cleaned.slice(9)

    let formattedCPF = `${firstPart}`
    if (secondPart) {
      formattedCPF = `${formattedCPF}.${secondPart}`
    }
    if (thirdPart) {
      formattedCPF = `${formattedCPF}.${thirdPart}`
    }
    if (verifyCode) {
      formattedCPF = `${formattedCPF}-${verifyCode}`
    }

    return formattedCPF
  }
}

export const parseCep = (cep: string): string => {
  return cep.replace(/^(\d{5})(\d{3})$/, '$1-$2')
}

export const parsePhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length == 0) {
    return ''
  } else if (cleaned.length <= 2) {
    return `(${cleaned}`
  } else {
    const ddd = cleaned.slice(0, 2)
    const firstPart = cleaned.slice(2, 7)
    const lastPart = cleaned.slice(7)

    let formattedPhone = `(${ddd})${firstPart}`
    if (lastPart) {
      formattedPhone = `${formattedPhone}-${lastPart}`
    }

    return formattedPhone
  }
}

export const parseDateFromString = (dateString: string): Date | null => {
  const parts = dateString.split('-')

  // Verifica se a string possui o formato esperado (dd/mm/yyyy)
  if (parts.length === 3) {
    // Extrai o dia, mês e ano da string
    const day = parseInt(parts[2], 10)
    const month = parseInt(parts[1], 10) - 1 // Os meses em JavaScript são base 0 (janeiro = 0)
    const year = parseInt(parts[0], 10)

    // Cria um objeto Date com os valores extraídos
    const date = new Date(year, month, day)

    // Verifica se a data é válida
    if (!isNaN(date.getTime())) {
      return date
    }
  }

  // Retorna null se a string não estiver no formato esperado ou se a data for inválida
  return null
}

export const parseDateToString = (date: Date): string => {
  return date ? format(date, 'dd/MM/yyyy', { locale: ptBR }) : ''
}

export const calculateAge = (birthDate: Date): number => {
  const birth = new Date(birthDate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDifference = today.getMonth() - birth.getMonth()

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
}

export const formatElapsedMicros = (micros: number) => {
  const totalSeconds = Math.floor(micros / 1_000_000)
  const min = Math.floor(totalSeconds / 60)
  const sec = totalSeconds % 60
  return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}


export const formatDuration = (duration: string | undefined): string => {
  return duration ? duration.split('.')[0] : '--:--:--'
}

export const getStatusBadgeProps = (
  status: AppointmentStatus
): { label: string; color: 'gray' | 'blue' | 'green' | 'red' | 'yellow' } => {
  switch (status) {
    case AppointmentStatus.Pending:
      return { label: 'Pendente', color: 'gray' };
    case AppointmentStatus.Completed:
      return { label: 'Concluída', color: 'green' };
    case AppointmentStatus.InProgress:
      return { label: 'Em Andamento', color: 'blue' };
    case AppointmentStatus.Canceled:
      return { label: 'Cancelada', color: 'red' };
    case AppointmentStatus.WaitingPayment:
      return { label: 'Aguardando Pagamento', color: 'yellow' };
    case AppointmentStatus.NoShow:
      return { label: 'Faltou', color: 'blue' };
    default:
      return { label: 'Desconhecido', color: 'gray' };
  }
};
