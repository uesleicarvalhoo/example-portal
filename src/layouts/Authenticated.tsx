import React, { ReactNode, useEffect } from 'react'
import { useState } from 'react'
import { mdiForwardburger, mdiBackburger, mdiMenu } from '@mdi/js'
import menuAside from '../menuAside'
import menuNavBar from '../menuNavBar'
import Icon from '../components/Icon'
import NavBar from '../components/NavBar'
import NavBarItemPlain from '../components/NavBar/Item/Plain'
import AsideMenu from '../components/AsideMenu'
import { useRouter } from 'next/router'
import { useAuthContext } from '../context'
import CardBoxModal from '../components/CardBox/Modal'
import { useAppContext } from '../context/app'
import { toast } from 'react-toastify'

type Props = {
  children: ReactNode
}
export default function LayoutAuthenticated({ children }: Props) {
  const router = useRouter()
  const { isAuthenticated } = useAuthContext()

  useEffect(() => {
    if (isAuthenticated) {
      if (router.pathname === '/login') {
        router.push('/')
      }
      return
    }
    router.push('/login')
    toast.error('Sua sessão expirou, por favor, faça login novamente.')
  }, [isAuthenticated, router.events])

  const { hasNotification, title, message, messageType, hideMessage } = useAppContext()

  const [isAsideMobileExpanded, setIsAsideMobileExpanded] = useState(false)
  const [isAsideLgActive, setIsAsideLgActive] = useState(false)

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsAsideMobileExpanded(false)
      setIsAsideLgActive(false)
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
    }
  }, [router.events])

  const layoutAsidePadding = 'xl:pl-60'

  return (
    <>
      <CardBoxModal
        title={title}
        buttonColor={messageType}
        buttonLabel="Confirmar"
        isActive={hasNotification}
        onConfirm={hideMessage}
        onCancel={hideMessage}
      >
        <p>{message}</p>
      </CardBoxModal>
      <div className={`overflow-hidden lg:overflow-visible`}>
        <div
          className={`${layoutAsidePadding} ${
            isAsideMobileExpanded ? 'ml-60 lg:ml-0' : ''
          } pt-14 min-h-screen w-screen transition-position lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100`}
        >
          <NavBar
            menu={menuNavBar}
            className={`${layoutAsidePadding} ${isAsideMobileExpanded ? 'ml-60 lg:ml-0' : ''}`}
          >
            <NavBarItemPlain
              display="flex lg:hidden"
              onClick={() => setIsAsideMobileExpanded(!isAsideMobileExpanded)}
            >
              <Icon path={isAsideMobileExpanded ? mdiBackburger : mdiForwardburger} size="24" />
            </NavBarItemPlain>
            <NavBarItemPlain
              display="hidden lg:flex xl:hidden"
              onClick={() => setIsAsideLgActive(true)}
            >
              <Icon path={mdiMenu} size="24" />
            </NavBarItemPlain>
          </NavBar>
          <AsideMenu
            isAsideMobileExpanded={isAsideMobileExpanded}
            isAsideLgActive={isAsideLgActive}
            menu={menuAside}
            onAsideLgClose={() => setIsAsideLgActive(false)}
          />
          {children}
        </div>
      </div>
    </>
  )
}
