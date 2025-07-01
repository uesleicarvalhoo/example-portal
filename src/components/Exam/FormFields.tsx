import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import Divider from '../Divider';
import FormCheckRadio from '../Form/CheckRadio';
import FormField from '../Form/Field';
import { ExamFormValues } from '../../types/exam';

interface Props {
  initialValues: ExamFormValues;
  onSubmit: (values: ExamFormValues) => void;
  onCancel?: () => void;
  readOnlyFields?: (keyof ExamFormValues | string)[];
  submitLabel?: string;
}

const eyeSchema = Yup.object({
  spherical: Yup.number().nullable().optional(),
  cylindrical: Yup.number().nullable().optional(),
  axis: Yup.number()
    .nullable()
    .when('cylindrical', {
      is: (val: number | null | undefined) => typeof val === 'number' && val !== 0,
      then: (schema) => schema.required('Obrigatório quando há valor no cilindro'),
      otherwise: (schema) => schema.notRequired(),
    }),
  observations: Yup.string().optional(),
});

const validationSchema = Yup.object({
  observations: Yup.string().optional(),
  rightEye: eyeSchema,
  leftEye: eyeSchema,
  conditions: Yup.object({
    astigmatism: Yup.boolean().optional(),
    myopia: Yup.boolean().optional(),
    hyperopia: Yup.boolean().optional(),
    presbyopia: Yup.boolean().optional(),
  }),
});

const ExamFormFields = ({
  initialValues,
  onSubmit,
  onCancel,
  readOnlyFields = [],
  submitLabel = 'Salvar',
}: Props) => {
  const isReadOnly = (field: keyof ExamFormValues | string) =>
    readOnlyFields.includes('*') || readOnlyFields.includes(field);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <Form className="space-y-6">
        <Divider />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Olho Direito */}
          <div className="border p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2 text-center">Olho Direito</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField label="Esférico" name="rightEye.spherical">
                <Field type="number" step="0.01" name="rightEye.spherical" readOnly={isReadOnly('rightEye.spherical')} />
              </FormField>
              <FormField label="Cilíndrico" name="rightEye.cylindrical">
                <Field type="number" step="0.01" name="rightEye.cylindrical" readOnly={isReadOnly('rightEye.cylindrical')} />
              </FormField>
              <FormField label="Eixo" name="rightEye.axis">
                <Field type="number" step="0.01" name="rightEye.axis" readOnly={isReadOnly('rightEye.axis')} />
              </FormField>
            </div>
            <FormField label="Observações" name="rightEye.observations">
              <Field
                as="textarea"
                className="h-24 sm:h-32 md:h-40"
                name="rightEye.observations"
                placeholder="Observações do olho direito"
                readOnly={isReadOnly('rightEye.observations')
                }
              />
            </FormField>
          </div>

          {/* Olho Esquerdo */}
          <div className="border p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2 text-center">Olho Esquerdo</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField label="Esférico" name="leftEye.spherical">
                <Field type="number" step="0.01" name="leftEye.spherical" readOnly={isReadOnly('leftEye.spherical')} />
              </FormField>
              <FormField label="Cilíndrico" name="leftEye.cylindrical">
                <Field type="number" step="0.01" name="leftEye.cylindrical" readOnly={isReadOnly('leftEye.cylindrical')} />
              </FormField>
              <FormField label="Eixo" name="leftEye.axis">
                <Field type="number" step="0.01" name="leftEye.axis" readOnly={isReadOnly('leftEye.axis')} />
              </FormField>
            </div>
            <FormField label="Observações" name="leftEye.observations">
              <Field
                as="textarea"
                className="h-24 sm:h-32 md:h-40"
                name="leftEye.observations"
                placeholder="Observações do olho esquerdo"
                readOnly={isReadOnly('leftEye.observations')}
              />
            </FormField>
          </div>
        </div>

        <Divider />

        <h3 className="text-lg font-semibold">Condições</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <FormCheckRadio type="checkbox" label="Astigmatismo">
            <Field
              name="conditions.astigmatism"
              type="checkbox"
              disabled={isReadOnly('conditions.astigmatism')}
            />
          </FormCheckRadio>
          <FormCheckRadio type="checkbox" label="Miopia">
            <Field
              name="conditions.myopia"
              type="checkbox"
              disabled={isReadOnly('conditions.myopia')}
            />
          </FormCheckRadio>
          <FormCheckRadio type="checkbox" label="Hipermetropia">
            <Field
              name="conditions.hyperopia"
              type="checkbox"
              disabled={isReadOnly('conditions.hyperopia')}
            />
          </FormCheckRadio>
          <FormCheckRadio type="checkbox" label="Presbiopia">
            <Field
              name="conditions.presbyopia"
              type="checkbox"
              disabled={isReadOnly('conditions.presbyopia')}
            />
          </FormCheckRadio>
        </div>

        <Divider />

        <FormField label="Observações da consulta" name="observations">
          <Field
            as="textarea"
            className="h-32"
            name="observations"
            placeholder="Observações da consulta"
            readOnly={isReadOnly('observations')}
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
    </Formik>

  );
};

export default ExamFormFields;
