import { Box, Checkbox, Stack } from '@mui/material';
import { useMemo } from 'react';
import _ from 'lodash';
import { createStyledIcon } from '../Styled/createStyledIcon';
import { CloseIcon, EditIcon } from '@athena/icons';

interface SelectableListHeaderProps<U, T extends { id: NonNullable<U> }> {
  data: T[];
  selected: Set<U>;
  setSelected: (selected: Set<U>) => void;
  onClose: () => void;
  editing: boolean;
  toggleEditing: () => void;
}

const Close = createStyledIcon(CloseIcon);
const Edit = createStyledIcon(EditIcon);

export function SelectableListHeader<U, T extends { id: NonNullable<U> }>(
  props: SelectableListHeaderProps<U, T>
) {
  const { data, selected, setSelected, onClose, editing, toggleEditing } = props;

  const allSelected = useMemo(
    () => _.every(data, (i) => selected.has(i.id)),
    [data, selected]
  );

  const handleSelectAll = () => {
    const newSelected = allSelected ? [] : data.map((i) => i.id);
    setSelected(new Set(newSelected));
  };

  const handleClose = () => {
    setSelected(new Set([]));
    onClose();
  };

  const handleEdit = () => {
    toggleEditing();
  };

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" p={1}>
      {editing ? (
        <>
          <Checkbox
            sx={{ paddingRight: 2, width: 25 }}
            edge="end"
            onChange={() => handleSelectAll()}
            checked={allSelected}
          />
          <Close onClick={handleClose} />
        </>
      ) : (
        <>
          <Box></Box>
          <Edit onClick={handleEdit} />
        </>
      )}
    </Stack>
  );
}
