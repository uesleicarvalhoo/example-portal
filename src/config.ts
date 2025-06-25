import getConfig from 'next/config'

export const containerMaxW = 'xl:max-w-6xl xl:mx-auto'

export const appTitle = 'Vision Manager'

export const getPageTitle = (currentPageTitle: string) => `${appTitle} — ${currentPageTitle}`

export const getCoreConfig = () => {
  const config = getConfig()
  return { ...config }
}

export const CEP_API_ENDPOINT = 'https://brasilapi.com.br/api/cep/v1/{cep}'
export const BACKEND_API_BASE_URL = 'http://localhost:5000'
