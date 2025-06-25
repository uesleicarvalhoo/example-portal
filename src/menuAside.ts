import {
  mdiAccountCircle,
  mdiMonitor,
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
]

export default menuAside
