import { Fab } from '@mui/material';
import { SvgIconComponent } from '../Styled';

interface CustomFabProps {
  // Icon: SvgIconComponent;
  onClick: () => void;
}

// export function CustomFab(props: CustomFabProps) {
//   const { onClick, Icon } = props;
//   return (
//     <Fab
//       sx={{ position: 'fixed', bottom: 16, right: 16 }}
//       color="primary"
//       aria-label="add"
//       onClick={onClick}
//     >
//       <Icon />
//     </Fab>
//   );
// }

export const createCustomFab =
  (Icon: SvgIconComponent) => (props: CustomFabProps) => {
    const { onClick } = props;
    return (
      <Fab
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        color="primary"
        onClick={onClick}
      >
        <Icon />
      </Fab>
    );
  };
