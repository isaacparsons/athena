import { ButtonBase, Typography, Stack } from '@mui/material';
import { EditIcon, LocationIcon } from '@athena/icons';
import { CreateLocation } from '@athena/common';
import { CustomLocationDialog } from './CustomLocationDialog';
import { useState } from 'react';

interface LocationInputProps {
  readonly: boolean;
  onChange?: (location: CreateLocation) => void;
  location?: CreateLocation;
}

const defaultProps = {
  readonly: true,
};

export function CustomLocationInput({
  location,
  onChange,
  readonly,
}: LocationInputProps) {
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const handleCloseLocationDialog = () => setLocationDialogOpen(false);
  const handleOpenLocationDialog = () => setLocationDialogOpen(true);

  const handleSaveLocation = (location: CreateLocation) => {
    if (onChange) onChange(location);
    setLocationDialogOpen(false);
  };

  return (
    <>
      <CustomLocationDialog
        open={!readonly && locationDialogOpen}
        onClose={handleCloseLocationDialog}
        onSave={handleSaveLocation}
      />
      <ButtonBase
        onClick={handleOpenLocationDialog}
        sx={{ width: '100%', justifyContent: 'flex-start' }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            p: 1,
            pl: 2,
            pr: 2,
            borderRadius: 10,
            bgcolor: 'primary.main',
          }}
        >
          <LocationIcon sx={{ color: 'white' }} />
          {!readonly && !location ? (
            <Typography sx={{ color: 'white' }}> Add location</Typography>
          ) : (
            location && <LocationLabel location={location} />
          )}
          {!readonly && <EditIcon sx={{ color: 'white' }} />}
        </Stack>
      </ButtonBase>
    </>
  );
}

CustomLocationInput.defaultProps = defaultProps;

interface LocationLabelProps {
  location: CreateLocation;
}

const roundToDecimal = (num: number, decimalPlaces: number) =>
  Math.round(num * 10 ** decimalPlaces) / 10 ** decimalPlaces;

function LocationLabel({ location }: LocationLabelProps) {
  if (location?.name)
    return <Typography color="secondary.light">{location.name}</Typography>;
  if (location.position?.latitude && location.position?.longitude)
    return (
      <Typography color="secondary.light">
        {`${roundToDecimal(location.position?.latitude, 4)}, ${roundToDecimal(
          location.position?.longitude,
          4
        )}`}
      </Typography>
    );
}
