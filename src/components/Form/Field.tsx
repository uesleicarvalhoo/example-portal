import { Children, cloneElement, ReactElement, ReactNode } from 'react';
import { useField } from 'formik';
import Icon from '../Icon';

type Props = {
  name: string;
  label?: string;
  labelFor?: string;
  help?: string;
  icons?: string[] | null[];
  isBorderless?: boolean;
  isTransparent?: boolean;
  hasTextareaHeight?: boolean;
  children: ReactNode;
};

const FormField = ({
  icons = [],
  name,
  label,
  labelFor,
  help,
  isBorderless,
  isTransparent,
  hasTextareaHeight,
  children,
}: Props) => {
  const [field, meta] = useField(name);
  const showError = meta.touched && !!meta.error;

  const childrenCount = Children.count(children);

  let elementWrapperClass = '';
  switch (childrenCount) {
    case 2:
      elementWrapperClass = 'grid grid-cols-1 gap-3 md:grid-cols-2';
      break;
    case 3:
      elementWrapperClass = 'grid grid-cols-1 gap-3 md:grid-cols-3';
      break;
  }

  const controlClassName = [
    'px-3 py-2 max-w-full border-gray-700 rounded w-full dark:placeholder-gray-400',
    'focus:ring focus:ring-blue-600 focus:border-blue-600 focus:outline-none',
    hasTextareaHeight ? 'h-24' : 'h-12',
    isBorderless ? 'border-0' : 'border',
    isTransparent ? 'bg-transparent' : 'bg-white dark:bg-slate-800',
    showError ? 'border-red-600' : '',
  ].join(' ');

  return (
    <div className="mb-6 last:mb-0">
      {label && (
        <label
          htmlFor={labelFor || name}
          className={`block font-bold mb-2 ${labelFor || name ? 'cursor-pointer' : ''}`}
        >
          {label}
        </label>
      )}

      <div className={elementWrapperClass}>
        {Children.toArray(children)
          .filter((child): child is ReactElement => typeof child === 'object' && 'type' in child)
          .map((child, index) => (
            <div className="relative" key={index}>
              {cloneElement(child, {
                className: `${child.props.className || ''} ${controlClassName} ${icons[index] ? 'pl-10' : ''
                  }`.trim(),
                id: labelFor || name,
                value: field.value,
                onChange: field.onChange,
                onBlur: field.onBlur,
                name: field.name,
              })}
              {icons[index] && (
                <Icon
                  path={icons[index]}
                  w="w-10"
                  h={hasTextareaHeight ? 'h-full' : 'h-12'}
                  className="absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400"
                />
              )}
            </div>
          ))}
      </div>

      {showError ? (
        <div className="text-xs text-red-600 mt-1">{meta.error}</div>
      ) : help ? (
        <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">{help}</div>
      ) : null}
    </div>
  );
};

export default FormField;
