import { useState, useEffect } from 'react';

interface SearchInputProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

const SearchInput = ({ onSearch, initialQuery }: SearchInputProps) => {
  const [inputValue, setInputValue] = useState(initialQuery || '');

  useEffect(() => {
    setInputValue(initialQuery || '');
  }, [initialQuery]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={inputValue}
        onChange={handleChange}
        placeholder="Search for images.."
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 transition-colors duration-200 shadow-sm border border-gray-700"
      >
        Search
      </button>
    </form>
  );
};

export default SearchInput;
