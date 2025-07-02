import { useField } from 'formik';

interface FormFieldProps {
    label: string;
    name: string;
    children: React.ReactNode;
    help?: string;
}

const FormField = ({ label, name, children, help }: FormFieldProps) => {
    const [field, meta] = useField(name);
    const hasError = meta.touched && meta.error;

    return (
        <div className="flex flex-col space-y-1">
            <label htmlFor={name} className="font-medium text-sm">
                {label}
            </label>

            {children}

            {help && <small className="text-gray-500">{help}</small>}

            {hasError && (
                <div className="text-red-500 text-sm">{meta.error}</div>
            )}
        </div>
    );
};

export default FormField;
