import React, { ReactNode } from 'react'
import CardBoxModal from '../components/CardBox/Modal'
import { useAppContext } from '../context/app'

type Props = {
  children: ReactNode
}

export default function LayoutGuest({ children }: Props) {
  const { hasNotification, title, message, messageType, hideMessage } = useAppContext()

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
      <div className="bg-gray-50 dark:bg-slate-800 dark:text-slate-100">{children}</div>
    </>
  )
}
