import { createContext, useContext, useState } from 'react'

type notificationType = 'success' | 'danger' | 'warning' | 'info'

type AppContextType = {
  title: string
  message: string
  messageType: notificationType
  hasNotification: boolean
  showMessage: (title: string, message: string, type: notificationType) => void
  hideMessage: () => void
}

export const AppContext = createContext({} as AppContextType)

export function AppProvider({ children }) {
  const [title, setTitle] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [messageType, setMessageType] = useState<notificationType | null>(null)

  const hasNotification = !!message

  const showMessage = (title: string, message: string, type: notificationType): void => {
    setTitle(title)
    setMessage(message)
    setMessageType(type)
  }

  const hideMessage = (): void => {
    setMessageType(null)
    setMessage(null)
    setMessageType(null)
  }

  return (
    <AppContext.Provider
      value={{ title, message, messageType, hasNotification, showMessage, hideMessage }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AppContext)
}
