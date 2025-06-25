import { createContext, useContext, useState, ReactNode } from 'react';

type NotificationType = 'success' | 'danger' | 'warning' | 'info';

type AppContextType = {
  title: string | null;
  message: string | null;
  messageType: NotificationType | null;
  hasNotification: boolean;
  showMessage: (title: string, message: string, type: NotificationType) => void;
  hideMessage: () => void;
};

type AppProviderProps = {
  children: ReactNode;
};

export const AppContext = createContext<AppContextType>({
  title: null,
  message: null,
  messageType: null,
  hasNotification: false,
  showMessage: () => {},
  hideMessage: () => {},
});

export function AppProvider({ children }: AppProviderProps) {
  const [title, setTitle] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<NotificationType | null>(null);

  const hasNotification = !!message;

  const showMessage = (title: string, message: string, type: NotificationType): void => {
    setTitle(title);
    setMessage(message);
    setMessageType(type);
  };

  const hideMessage = (): void => {
    setTitle(null);
    setMessage(null);
    setMessageType(null);
  };

  return (
    <AppContext.Provider
      value={{ title, message, messageType, hasNotification, showMessage, hideMessage }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
