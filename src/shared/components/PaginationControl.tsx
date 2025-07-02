import Button from './Button';
import Buttons from './Buttons';

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) => {
  const pagesList = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
      <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
        <Buttons>
          {pagesList.map((page) => (
            <Button
              key={page+1}
              label={(page + 1).toString()}
              active={page === currentPage}
              color={page === currentPage ? 'lightDark' : 'whiteDark'}
              small
              onClick={() => onPageChange(page)}
            />
          ))}
        </Buttons>
        <small className="mt-6 md:mt-0">
          Página {currentPage + 1} de {totalPages}
        </small>
      </div>
    </div>
  );
};

export default PaginationControls;
