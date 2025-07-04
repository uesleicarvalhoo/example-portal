import CardBoxModal from '@/shared/components/CardBox/Modal';

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: 'danger' | 'warn' | 'info' | 'success';
}

const ConfirmModal = ({
  isOpen,
  title = 'Confirmação',
  description,
  onCancel,
  onConfirm,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  confirmColor = 'info',
}: ConfirmModalProps) => {
  const colorClasses = {
    danger: 'bg-red-500 text-white hover:bg-red-600',
    warn: 'bg-yellow-500 text-white hover:bg-yellow-600',
    info: 'bg-blue-500 text-white hover:bg-blue-600',
    success: 'bg-green-500 text-white hover:bg-green-600',
  };

  return (
    <CardBoxModal
      title={title}
      isActive={isOpen}
      onCancel={onCancel}
    >
      <div className="px-4 pb-4">
        <p>{description}</p>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm rounded ${colorClasses[confirmColor]}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </CardBoxModal>
  );
};

export default ConfirmModal;
