import { TextField } from '@mui/material';
import { useAddNewsletterItemsDispatchContext } from '../../context/addNewsletterItemsContext';
import { useEffect, useState } from 'react';

interface NameInputProps {
  id: number;
  name: string;
}

function NameInput(props: NameInputProps) {
  const { name: inputName, id } = props;
  const [name, setName] = useState('');

  const dispatch = useAddNewsletterItemsDispatchContext();

  useEffect(() => {
    setName(inputName);
  }, [inputName]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const updateName = () => {
    dispatch({
      entityType: 'newsletter-item',
      action: 'name-updated',
      id: id,
      payload: name,
    });
  };

  return (
    <TextField
      // autoFocus
      required
      margin="dense"
      id="name"
      name="name"
      label="Name"
      type="text"
      fullWidth
      onBlur={updateName}
      variant="standard"
      value={name}
      onChange={handleNameChange}
    />
  );
}

export default NameInput;
