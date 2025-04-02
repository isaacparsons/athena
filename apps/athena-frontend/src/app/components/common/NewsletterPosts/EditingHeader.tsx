import { Checkbox, Stack } from '@mui/material';

interface EditingHeaderProps {
  enabled: boolean;
  editing: boolean;
  allSelected: boolean;
  selected: Set<string>;
  handleSelectAll: () => void;
  children: React.ReactNode;
}

export function EditingHeader(props: EditingHeaderProps) {
  const { editing, allSelected, enabled, handleSelectAll, selected, children } =
    props;
  if (!editing || !enabled) return null;

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" p={1}>
      <Checkbox
        sx={{ paddingRight: 2, width: 25 }}
        edge="end"
        onChange={() => handleSelectAll()}
        checked={allSelected}
      />
      {selected.size > 0 && <Stack direction="row">{children}</Stack>}
    </Stack>
  );
}
