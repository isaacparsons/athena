import _ from 'lodash';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { NewsletterRole } from '@athena/common';

interface SelectMemberRoleProps {
  disabled: boolean;
  value: NewsletterRole;
  onChange: (role: NewsletterRole) => void;
}

export function SelectMemberRole(props: SelectMemberRoleProps) {
  const { disabled, value, onChange } = props;

  const handleRoleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as NewsletterRole);
  };
  return (
    <FormControl disabled={disabled}>
      <InputLabel id="demo-simple-select-label">Role</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Role"
        onChange={handleRoleChange}
      >
        {Object.keys(NewsletterRole).map((k) => {
          const r = _.get(NewsletterRole, k);
          return <MenuItem value={r}>{r}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
}
