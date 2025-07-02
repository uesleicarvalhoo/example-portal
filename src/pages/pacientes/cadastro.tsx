import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import FormField from '@/shared/components/Form/Field';
import Divider from '@/shared/components/Divider';
import Buttons from '@/shared/components/Buttons';
import Button from '@/shared/components/Button';

export type PatientFormValues = {
  fullName: string;
  birthDate: string;
  phone: string;
  email: string;
  cpf: string;
  notes: string;
};

const validationSchema = Yup.object({
  fullName: Yup.string().required('Nome completo é obrigatório'),
  birthDate: Yup.string().required('Data de nascimento é obrigatória'),
  phone: Yup.string().required('Telefone é obrigatório'),
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  cpf: Yup.string().required('CPF é obrigatório'),
});

interface PatientFormProps {
  initialValues?: PatientFormValues;
  onSubmit: (values: PatientFormValues) => void;
  submitLabel?: string;
}

const PatientForm = ({
  initialValues = {
    fullName: '',
    birthDate: '',
    phone: '',
    email: '',
    cpf: '',
    notes: '',
  },
  onSubmit,
  submitLabel = 'Cadastrar',
}: PatientFormProps) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (values: PatientFormValues) => {
    onSubmit(values);
    setSubmitted(true);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormField name="fullName" label="Nome completo" help="Por favor, digite o nome completo">
          <Field name="fullName" type="text" />
        </FormField>

        <FormField name="birthDate" label="Data de nascimento" help="Por favor, selecione a data de nascimento">
          <Field name="birthDate" type="date" />
        </FormField>

        <FormField name="phone" label="Telefone" help="Por favor, digite o número de telefone">
          <Field name="phone" type="text" />
        </FormField>

        <FormField name="email" label="Email" help="Por favor, digite o endereço de email">
          <Field name="email" type="email" />
        </FormField>

        <FormField name="cpf" label="CPF" help="Por favor, digite o CPF">
          <Field name="cpf" type="text" />
        </FormField>

        <FormField name="notes" label="Observações" help="Anotações adicionais sobre o paciente">
          <Field name="notes" as="textarea" className="h-32" />
        </FormField>

        <Divider />
        <Buttons>
          <Button type="submit" label={submitLabel} color="info" />
        </Buttons>

        {submitted && (
          <div className="text-green-600 text-sm mt-2 text-center">
            Cadastro realizado com sucesso!
          </div>
        )}
      </Form>
    </Formik>
  );
};

export default PatientForm;
