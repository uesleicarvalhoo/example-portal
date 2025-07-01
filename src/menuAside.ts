import {
  mdiAccountCircle,
  mdiMonitor,
  mdiStethoscope,
} from '@mdi/js'
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/',
    icon: mdiMonitor,
    label: 'Dashboard',
  },
  {
    href: '/pacientes',
    label: 'Pacientes',
    icon: mdiAccountCircle,
  },
  {
    href: '/consultas',
    label: 'Consultas',
    icon: mdiStethoscope,
  },
]

export default menuAside
