import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { mdiForwardburger, mdiBackburger, mdiMenu } from '@mdi/js';

import menuAside from '../menuAside';
import menuNavBar from '../menuNavBar';

import Icon from '../components/Icon';
import NavBar from '../components/NavBar';
import NavBarItemPlain from '../components/NavBar/Item/Plain';
import AsideMenu from '../components/AsideMenu';
import CardBoxModal from '../components/CardBox/Modal';

import { useAuthContext } from '../context';
import { useAppContext } from '../context/app';
import { toast } from 'react-toastify';

type Props = {
  children: ReactNode;
};

export default function LayoutAuthenticated({ children }: Props) {
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();
  const { hasNotification, title, message, messageType, hideMessage } = useAppContext();

  const [isAsideMobileExpanded, setIsAsideMobileExpanded] = useState(false);
  const [isAsideLgActive, setIsAsideLgActive] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsAsideMobileExpanded(false);
      setIsAsideLgActive(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [router.events]);

  // Proteção de rota: redireciona para login se não autenticado
  useEffect(() => {
    // Desativa proteção em dev (com mock de autenticação)
    if (process.env.NODE_ENV === 'development') return;

    if (!isAuthenticated) {
      toast.error('Sua sessão expirou, por favor, faça login novamente.');
      router.push('/login');
    } else if (router.pathname === '/login') {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const layoutAsidePadding = 'xl:pl-60';

  return (
    <>
      <CardBoxModal
        title={title ?? ''}
        buttonColor={messageType ?? 'info'}
        buttonLabel="Confirmar"
        isActive={hasNotification}
        onConfirm={hideMessage}
        onCancel={hideMessage}
      >
        <p>{message}</p>
      </CardBoxModal>

      <div className="overflow-hidden lg:overflow-visible">
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
  );
}
