import { ButtonBase, Typography, Grid2 as Grid } from '@mui/material';
import { LocationIcon } from '@athena/icons';
import { LocationInput as ILocationInput } from '@athena/common';

interface LocationInputProps {
  onClick: () => void;
  location: ILocationInput;
}
export function LocationInput({ location, onClick }: LocationInputProps) {
  return (
    <ButtonBase onClick={onClick} sx={{ width: "100%", justifyContent: 'flex-start' }}>
      <Grid
        container
        bgcolor={'primary.main'}
        sx={{
          p: 0.5,
          ...(location ? { flexGrow: 1 } : {}),
          borderRadius: 20,
          alignItems: 'center',
        }}>
        <Grid size={1} sx={{ m: 0.5, color: 'secondary.light' }}>
          <LocationIcon />
        </Grid>
        <Grid size="grow">
          <LocationLabel location={location} />
        </Grid>

      </Grid>
    </ButtonBase>
  )

}

interface LocationLabelProps {
  location: ILocationInput;
}

const roundToDecimal = (num: number, decimalPlaces: number) => Math.round(num * 10 ** decimalPlaces) / 10 ** decimalPlaces

function LocationLabel({ location }: LocationLabelProps) {
  if (location?.name) return <Typography color='secondary.light'>{location.name}</Typography>
  if (location?.latitude && location.longitude) return (<Typography color='secondary.light'>
    {`${roundToDecimal(location.latitude, 4)}, ${roundToDecimal(location.longitude, 4)}`}
  </Typography>)
}

export default LocationInput;
