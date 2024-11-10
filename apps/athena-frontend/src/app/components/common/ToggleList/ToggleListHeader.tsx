import { Box, Typography } from '@mui/material';
import { CustomCheckbox, CustomCardHeader } from '@athena/components';

interface ToggleListHeaderProps {
  allSelected: boolean;
  selectable: boolean;
  selectedItemIds: Set<number>;
  onToggleSelectAll: () => void;
}

export function ToggleListHeader(props: ToggleListHeaderProps) {
  const {
    allSelected,
    selectable,
    selectedItemIds,
    onToggleSelectAll,
  } = props;

  if (!selectable) return null;
  return (
    <Box sx={{ borderRadius: 5, bgColor: 'white', boxShadow: 1 }}>
      <CustomCardHeader left={<CustomCheckbox id='select-all' value={selectedItemIds.size > 0 && allSelected} onClick={onToggleSelectAll} />}>
        <Typography>Select all</Typography>
      </CustomCardHeader>
    </Box>
  );
}
