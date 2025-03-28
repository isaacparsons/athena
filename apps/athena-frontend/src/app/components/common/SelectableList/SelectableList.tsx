import { Checkbox, List, ListItem } from '@mui/material';

interface SelectableListProps<U, T extends { id: NonNullable<U> }> {
  data: T[];
  selected: Set<U>;
  setSelected: (selected: Set<U>) => void;
  render: (value: T) => React.ReactNode;
  enabled?: boolean;
}

export function SelectableList<U, T extends { id: NonNullable<U> }>(
  props: React.PropsWithChildren<SelectableListProps<U, T>>
) {
  const { data, selected, setSelected, render, enabled } = props;

  const handleSelect = (value: T) => {
    selected.delete(value.id);
    setSelected(selected);
  };

  return (
    <List dense sx={{ width: '100%' }}>
      {data.map((value) => (
        <ListItem key={value.id.toString()} disablePadding>
          {enabled && (
            <Checkbox
              sx={{ paddingRight: 2 }}
              edge="end"
              onChange={() => handleSelect(value)}
              checked={selected.has(value.id)}
            />
          )}
          {render(value)}
        </ListItem>
      ))}
    </List>
  );
}
