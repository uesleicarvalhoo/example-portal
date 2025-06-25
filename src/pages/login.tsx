import type { ReactElement } from 'react'
import Head from 'next/head'
import Button from '../components/Button'
import CardBox from '../components/CardBox'
import SectionFullScreen from '../components/Section/FullScreen'
import LayoutGuest from '../layouts/Guest'
import { Field, Form, Formik } from 'formik'
import FormField from '../components/Form/Field'
import Divider from '../components/Divider'
import Buttons from '../components/Buttons'
import { getPageTitle } from '../config'
import { LoginData } from '../types'
import { useAuthContext } from '../context'

const LoginPage = () => {
  const { login } = useAuthContext()

  const initialValues: LoginData = {
    email: '',
    password: '',
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('Login')}</title>
      </Head>
      <SectionFullScreen bg="purplePink">
        <CardBox className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
          <Formik initialValues={initialValues} onSubmit={login}>
            <Form>
              <FormField label="Email" help="Por favor, digite o seu email">
                <Field name="email" />
              </FormField>

              <FormField label="Password" help="Por favor, digite a sua senha">
                <Field name="password" type="password" />
              </FormField>

              <Divider />
              <Buttons>
                <Button type="submit" label="Login" color="info" />
              </Buttons>
            </Form>
          </Formik>
        </CardBox>
      </SectionFullScreen>
    </>
  )
}

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}

export default LoginPage
