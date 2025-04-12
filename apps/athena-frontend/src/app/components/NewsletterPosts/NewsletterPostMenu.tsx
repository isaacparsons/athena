import { DeleteIcon, EditIcon } from '@frontend/icons';
import { Divider, ListItemIcon, ListItemText, MenuItem, Menu } from '@mui/material';

interface NewsletterPostSettingsProps {
  anchorEl: null | HTMLElement;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function NewsletterPostMenu(props: NewsletterPostSettingsProps) {
  const { anchorEl, onClose, onEdit, onDelete } = props;

  const handleEditClick = () => {
    onEdit();
    onClose();
  };

  const handleDeleteClick = () => {
    onDelete();
    onClose();
  };
  return (
    <Menu open={Boolean(anchorEl)} onClose={onClose} anchorEl={anchorEl}>
      <MenuItem onClick={handleEditClick}>
        <ListItemIcon>
          <EditIcon fontSize="inherit" />
        </ListItemIcon>
        <ListItemText>Edit</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleDeleteClick}>
        <ListItemIcon>
          <DeleteIcon fontSize="small" color="error" />
        </ListItemIcon>
        <ListItemText>Delete</ListItemText>
      </MenuItem>
    </Menu>
  );
}
