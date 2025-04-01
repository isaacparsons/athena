import { createStyledIcon } from '@athena/components';
import { Checkbox, Stack } from '@mui/material';
import { TemplateIcon, DeleteIcon } from '@athena/icons';

const Delete = createStyledIcon(DeleteIcon);
const CreateTemplate = createStyledIcon(TemplateIcon);

interface EditingHeaderProps {
  enabled: boolean;
  editing: boolean;
  allSelected: boolean;
  selected: Set<string>;
  handleSelectAll: () => void;
  handleCreateTemplate: () => void;
}

export function EditingHeader(props: EditingHeaderProps) {
  const {
    editing,
    allSelected,
    enabled,
    handleSelectAll,
    selected,
    handleCreateTemplate,
  } = props;
  if (!editing || !enabled) return null;

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" p={1}>
      <Checkbox
        sx={{ paddingRight: 2, width: 25 }}
        edge="end"
        onChange={() => handleSelectAll()}
        checked={allSelected}
      />
      {selected.size > 0 && (
        <Stack direction="row">
          <Delete sx={{ m: 0.3, height: 30, width: 30, borderRadius: 15 }} />
          <CreateTemplate
            onClick={handleCreateTemplate}
            sx={{ m: 0.3, height: 30, width: 30, borderRadius: 15 }}
          />
        </Stack>
      )}
    </Stack>
  );
}
