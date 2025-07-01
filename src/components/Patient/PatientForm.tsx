import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { mdiHomeGroup, mdiPhone, mdiEmail } from '@mdi/js';
import { useEffect } from 'react';
import FormField from '../../components/Form/Field';
import Divider from '../../components/Divider';
import { PatientFormValues } from '../../types/patient';
import { getAddressByCep } from '../../services/address';

interface Props {
  initialValues: PatientFormValues;
  onSubmit: (values: PatientFormValues) => void;
  submitLabel?: string;
  onCancel?: () => void;
  readOnlyFields?: (keyof PatientFormValues)[];
}

const validationSchema = Yup.object({
  fullName: Yup.string().required('Nome completo é obrigatório'),
  birthDate: Yup.string().required('Data de nascimento é obrigatória'),
  phone: Yup.string().required('Telefone é obrigatório'),
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  cpf: Yup.string().required('CPF é obrigatório'),
  street: Yup.string().required('Rua é obrigatória'),
  neighborhood: Yup.string().required('Bairro é obrigatório'),
  city: Yup.string().required('Cidade é obrigatória'),
  state: Yup.string().required('Estado é obrigatório'),
  cep: Yup.string().required('CEP é obrigatório'),
});

const PatientForm = ({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = 'Salvar',
  readOnlyFields = [],
}: Props) => {
  const isReadOnly = (field: keyof PatientFormValues) =>
    readOnlyFields.includes(field);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, values, setFieldValue }) => {
        useEffect(() => {
          const cep = values.cep?.replace(/\D/g, '');
          if (cep && cep.length === 8) {
            getAddressByCep(cep).then((address) => {
              if (address) {
                setFieldValue('street', address.street || '');
                setFieldValue('neighborhood', address.neighborhood || '');
                setFieldValue('city', address.city || '');
                setFieldValue('state', address.state || '');
              }
            });
          }
        }, [values.cep]);

        return (
          <Form onSubmit={handleSubmit}>
            <FormField label="Nome completo" name="fullName">
              <Field name="fullName" type="text" placeholder="Nome completo" readOnly={isReadOnly('fullName')} />
            </FormField>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="CPF" name="cpf">
                <Field name="cpf" type="numeric"
                  minLength="14"
                  maxLength="14"
                  placeholder="000.000.000-00" readOnly={isReadOnly('cpf')} />
              </FormField>

              <FormField label="Data de nascimento" name="birthDate">
                <Field name="birthDate" type="date" readOnly={isReadOnly('birthDate')} />
              </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Telefone" name="phone" icons={[mdiPhone]}>
                <Field
                  name="phone"
                  type="text"
                  placeholder="71999999999"
                  readOnly={isReadOnly('phone')}
                  minLength="11"
                  maxLength="11"
                />
              </FormField>

              <FormField label="Email" name="email" icons={[mdiEmail]}>
                <Field name="email" type="email" placeholder="nome@email.com" readOnly={isReadOnly('email')} />
              </FormField>
            </div>

            <Divider />

            <FormField label="Rua" name="street" icons={[mdiHomeGroup]}>
              <Field name="street" type="text" placeholder="Nome da rua" readOnly={isReadOnly('street')} />
            </FormField>

            <FormField label="Bairro" name="neighborhood">
              <Field name="neighborhood" type="text" placeholder="Bairro" readOnly={isReadOnly('neighborhood')} />
            </FormField>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField label="Cidade" name="city">
                <Field name="city" type="text" placeholder="Cidade" readOnly={isReadOnly('city')} />
              </FormField>

              <FormField label="Estado" name="state">
                <Field name="state" as="select" readOnly={isReadOnly('state')}>
                  <option value="">UF</option>
                  {['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'].map((uf) => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </Field>
              </FormField>

              <FormField label="CEP" name="cep">
                <Field
                  name="cep"
                  type="text"
                  placeholder="CEP"
                  inputMode="numeric"
                  maxLength={8}
                  pattern="\d{8}"
                  readOnly={isReadOnly('cep')}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const onlyNumbers = e.target.value.replace(/\D/g, '').slice(0, 8);
                    e.target.value = onlyNumbers;
                    // Formik precisa dessa chamada para atualizar corretamente o estado
                    e.target.dispatchEvent(new Event('input', { bubbles: true }));
                  }}
                />
              </FormField>

            </div>

            <FormField label="Complemento" name="complement">
              <Field name="complement" type="text" placeholder="Complemento" readOnly={isReadOnly('complement')} />
            </FormField>

            <Divider />

            <FormField label="Observações" name="observations">
              <Field
                name="observations"
                as="textarea"
                className="h-32"
                readOnly={isReadOnly('observations')}
                placeholder="Observações adicionais sobre o paciente"
              />
            </FormField>

            <Divider />

            <div className="flex justify-end space-x-2">
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                >
                  Cancelar
                </button>
              )}
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-blue-500 text-white hover:bg-blue-600 rounded"
              >
                {submitLabel}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PatientForm;
