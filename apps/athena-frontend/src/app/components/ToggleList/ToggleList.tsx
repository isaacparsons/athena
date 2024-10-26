import { List, Stack } from '@mui/material';
import { ToggleListHeader } from './ToggleListHeader';
import { ToggleListItem } from './ToggleListItem';

interface ToggleListProps<T> {
  selectedItemIds: Set<number>;
  setSelectedItemIds: (items: Set<number>) => void;
  items: T[];
  selectable: boolean;
  onDelete: (ids: number[]) => void;
  renderItem: (item: T) => React.ReactNode;
}
export function ToggleList<T extends { id: number }>(
  props: ToggleListProps<T>
) {
  const {
    items,
    selectable,
    onDelete,
    renderItem,
    selectedItemIds,
    setSelectedItemIds,
  } = props;

  const handleToggleSelect = (id: number) => {
    const newSelectedItemIds = new Set(selectedItemIds);
    if (newSelectedItemIds.has(id)) {
      newSelectedItemIds.delete(id);
    } else {
      newSelectedItemIds.add(id);
    }
    setSelectedItemIds(newSelectedItemIds);
  };

  const handleToggleSelectAll = () => {
    const newSelectedItemIds = new Set(selectedItemIds);
    if (newSelectedItemIds.size === items.length) {
      newSelectedItemIds.clear();
    } else {
      items.forEach((item) => newSelectedItemIds.add(item.id));
    }
    setSelectedItemIds(newSelectedItemIds);
  };

  return (
    <Stack>
      <ToggleListHeader
        allSelected={items.length === selectedItemIds.size}
        selectable={selectable}
        selectedItemIds={selectedItemIds}
        onToggleSelectAll={handleToggleSelectAll}
        onDelete={() => onDelete(Array.from(selectedItemIds))}
      />
      <List>
        {items.map((item) => {
          const isSelected = selectedItemIds.has(item.id);
          return (
            <ToggleListItem
              key={item.id.toString()}
              id={item.id}
              selectable={selectable}
              selected={isSelected}
              onToggleSelect={handleToggleSelect}
            >
              {renderItem(item)}
            </ToggleListItem>
          );
        })}
      </List>
    </Stack>
  );
}
