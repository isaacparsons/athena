import { Stack, TextField, Typography } from '@mui/material';
import { CustomDateRange } from '@frontend/components';
import { ReadNewsletter } from '@athena/common';
import { useUpdateNewsletterForm } from '@frontend/hooks';
import { Control, Controller } from 'react-hook-form';

interface NewsletterPropertiesProps {
  // data: ReadNewsletter;
  editing: boolean;
  control: Control<
    {
      id: number;
      name?: string | undefined;
      dateRange?:
        | {
            start: string | null;
            end: string | null;
          }
        | undefined;
    },
    any,
    {
      id: number;
      name?: string | undefined;
      dateRange?:
        | {
            start: string | null;
            end: string | null;
          }
        | undefined;
    }
  >;
}

export function NewsletterProperties(props: NewsletterPropertiesProps) {
  const { editing, control } = props;

  return (
    <Stack spacing={1}>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) =>
          editing ? (
            <TextField
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              variant="outlined"
              value={value}
              onChange={onChange}
              // helperText={errors.name?.message}
              // error={Boolean(errors.name)}
            />
          ) : (
            <Typography variant="h4">{value}</Typography>
          )
        }
      />
      <Controller
        control={control}
        name="dateRange"
        render={({ field: { onChange, value } }) => (
          <CustomDateRange
            value={
              value ?? {
                start: new Date().toISOString(),
                end: null,
              }
            }
            editing={editing}
            onChange={editing ? onChange : undefined}
          />
        )}
      />
    </Stack>
  );
}
