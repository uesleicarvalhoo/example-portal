import { useEffect, type ReactElement } from 'react';
import Head from 'next/head';
import Button from '@/shared/components/Button';
import CardBox from '@/shared/components/CardBox';
import SectionFullScreen from '@/shared/components/Section/FullScreen';
import LayoutGuest from '../layouts/Guest';
import { Field, Form, Formik } from 'formik';
import FormField from '@/shared/components/Form/Field';
import Divider from '@/shared/components/Divider';
import Buttons from '@/shared/components/Buttons';
import { getPageTitle } from '@/config';
import { LoginData } from '@/shared/types/auth';
import { useAuthContext } from '../context';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const { login } = useAuthContext();

  useEffect(() => {
    const loginError = localStorage.getItem('loginError');
    if (loginError) {
      toast.error(loginError);
      localStorage.removeItem('loginError');
    }
  }, []);

  const initialValues: LoginData = {
    email: '',
    password: '',
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Login')}</title>
      </Head>
      <SectionFullScreen bg="purplePink">
        <CardBox className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
          <Formik initialValues={initialValues} onSubmit={login}>
            <Form>
              <FormField label="Email" help="Por favor, digite o seu email" name="email">
                <Field name="email" type="email" />
              </FormField>

              <FormField label="Senha" help="Por favor, digite a sua senha" name="password">
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
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};

export default LoginPage;
