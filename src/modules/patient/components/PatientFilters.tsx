import { useState } from 'react';

interface Props {
  onSearch: (value: string) => void;
}

export default function PatientFilters({ onSearch }: Props) {
  const [search, setSearch] = useState('');

  const handleSearch = () => {
    onSearch(search);
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Buscar por nome ou cpf"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 px-2 py-1 rounded"
      />
      <button onClick={handleSearch} className="btn btn-primary">
        Buscar
      </button>
    </div>
  );
}
