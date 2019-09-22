import { useState } from 'react';

export default entries => {
  const initialState = entries.reduce(
    (acc, cur) => ({ ...acc, [cur]: '' }),
    {}
  );

  const [formState, setFormState] = useState(initialState);

  const clearForm = () => {
    setFormState(initialState);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  return [formState, handleChange, clearForm];
};
