import { useState } from 'react';

const useSearchForm = (setKeyWord) => {
  const [value, setValue] = useState('');
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
    setIsSearchEmpty(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === '') {
      setIsSearchEmpty(true);
      return;
    }
    setIsSearchEmpty(false);
    setKeyWord(value);
  };

  return { value, setValue, isSearchEmpty, handleChange, handleSubmit };
};

export default useSearchForm;
