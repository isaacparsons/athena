import _ from 'lodash';
import React, { useMemo } from 'react';
import { Stack } from '@mui/material';
import { CustomList, CustomListItem, ToggleListHeader } from '@frontend/components';

interface ToggleListProps<T> {
  selectedItemIds: Set<number>;
  setSelectedItemIds: (items: Set<number>) => void;
  items: T[];
  selectable: boolean;
  renderItem: (props: {
    item: T;
    selectable: boolean;
    selected: boolean;
    onToggleSelect: (id: number) => void;
  }) => React.ReactNode;
}
export function ToggleList<T extends { id: number }>(props: ToggleListProps<T>) {
  const { items, selectable, renderItem, selectedItemIds, setSelectedItemIds } =
    props;

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

  const allSelected = useMemo(
    () =>
      _.difference(
        items.map((i) => i.id),
        Array.from(selectedItemIds)
      ).length === 0,
    [selectedItemIds, items]
  );
  return (
    <Stack>
      <ToggleListHeader
        allSelected={allSelected}
        selectable={selectable}
        selectedItemIds={selectedItemIds}
        onToggleSelectAll={handleToggleSelectAll}
      />
      <CustomList>
        {items.map((item) => {
          const isSelected = selectedItemIds.has(item.id);
          return (
            <CustomListItem id={item.id}>
              {renderItem({
                item,
                selectable: selectable,
                selected: isSelected,
                onToggleSelect: handleToggleSelect,
              })}
            </CustomListItem>
          );
        })}
      </CustomList>
    </Stack>
  );
}
