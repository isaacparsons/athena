import { Checkbox, Stack } from '@mui/material';

interface ToggleListItemProps {
  id: number;
  selectable: boolean;
  selected: boolean;
  onToggleSelect: (id: number) => void;
  children: React.ReactNode;
}

export function ToggleListItem(props: ToggleListItemProps) {
  const { id, selectable, selected, onToggleSelect, children } = props;

  if (!selectable) return children;

  return (
    <Stack direction="row">
      <Checkbox
        key={id}
        checked={selected}
        onClick={() => onToggleSelect(id)}
      />
      {children}
    </Stack>
  );
}
