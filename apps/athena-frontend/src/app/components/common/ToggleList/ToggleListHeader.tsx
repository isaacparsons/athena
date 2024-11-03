import { Checkbox, IconButton, Paper, Stack, Typography } from '@mui/material';
import { DeleteIcon } from '../../../icons';

interface ToggleListHeaderProps {
  allSelected: boolean;
  selectable: boolean;
  selectedItemIds: Set<number>;
  onToggleSelectAll: () => void;
  onDelete: () => void;
}

export function ToggleListHeader(props: ToggleListHeaderProps) {
  const {
    allSelected,
    selectable,
    selectedItemIds,
    onToggleSelectAll,
    onDelete,
  } = props;

  if (!selectable) return null;
  return (
    <Paper elevation={2}>
      <Stack direction="row" spacing={1}>
        <Stack direction="row">
          <Checkbox value={allSelected} onClick={onToggleSelectAll} />
          <Typography>Select all</Typography>
        </Stack>

        <IconButton onClick={onDelete} disabled={selectedItemIds.size === 0}>
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
}
