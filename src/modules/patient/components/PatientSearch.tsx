import { mdiMagnify } from '@mdi/js';
import { Field, Formik } from 'formik';
import FormField from '@/shared/components/Form/Field';
import SearchFieldWatcher from '@/shared/components/Form/SearchFieldWatcher';

interface Props {
  searchCriteria: string;
  onSearchChange: (value: string) => void;
  resetPage: () => void;
}

const PatientSearch = ({ searchCriteria, onSearchChange, resetPage }: Props) => {
  return (
    <Formik initialValues={{ searchCriteria }} onSubmit={() => { }}>
      {({ values }) => (
        <>
          <SearchFieldWatcher
            value={values.searchCriteria}
            onChange={(val) => {
              onSearchChange(val);
              resetPage();
            }}
          />
          <FormField icons={[mdiMagnify]} name="searchCriteria">
            <Field
              type="text"
              name="searchCriteria"
              placeholder="Digite o nome ou CPF do paciente para filtrar os resultados"
              className="px-4 py-2 border border-gray-300 rounded-lg mr-4 flex-grow"
            />
          </FormField>
        </>
      )}
    </Formik>
  );
};

export default PatientSearch;
