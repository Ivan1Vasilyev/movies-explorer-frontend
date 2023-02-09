import { useState } from 'react';

const useSearchForm = (setKeyWord, keyWord) => {
  const [value, setValue] = useState(keyWord);
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

  return { value, isSearchEmpty, handleChange, handleSubmit };
};

export default useSearchForm;
