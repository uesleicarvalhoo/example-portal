import { mdiClose } from '@mdi/js';
import { ReactNode } from 'react';
import type { ColorButtonKey } from '../../interfaces';
import Button from '../Button';
import Buttons from '../Buttons';
import CardBox from '.';
import CardBoxComponentTitle from './Component/Title';
import OverlayLayer from '../OverlayLayer';

type Props = {
  title: string;
  isActive: boolean;
  children: ReactNode;
  onCancel?: () => void;
  buttonColor?: ColorButtonKey;
  buttonLabel?: string;
  onConfirm?: () => void;
};

const CardBoxModal = ({
  title,
  isActive,
  children,
  onCancel,
  buttonLabel,
  buttonColor,
  onConfirm,
}: Props) => {
  if (!isActive) return null;

  const hasFooter = buttonLabel && buttonColor && onConfirm;

  const footer = hasFooter ? (
    <Buttons>
      <Button label={buttonLabel} color={buttonColor} onClick={onConfirm} />
      {!!onCancel && (
        <Button label="Cancelar" color={buttonColor} outline onClick={onCancel} />
      )}
    </Buttons>
  ) : undefined;

  return (
    <OverlayLayer
      onClick={onCancel ? (e) => onCancel() : undefined}
      className={onCancel ? 'cursor-pointer' : ''}
    >
      <CardBox
        className="transition-transform shadow-lg z-50 w-full md:w-[70%] lg:w-1/2 max-h-[90vh] overflow-hidden"
        isModal
        footer={footer}
      >
        <CardBoxComponentTitle title={title}>
          {!!onCancel && (
            <Button icon={mdiClose} color="whiteDark" onClick={onCancel} small roundedFull />
          )}
        </CardBoxComponentTitle>

        <div className="space-y-3 overflow-y-auto max-h-[calc(90vh-4rem)] px-4 pb-4">
          {children}
        </div>
      </CardBox>
    </OverlayLayer>
  );
};

export default CardBoxModal;
