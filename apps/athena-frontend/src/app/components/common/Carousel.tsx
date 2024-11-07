// import { Box, MobileStepper } from '@mui/material';
// import { useEffect, useMemo } from 'react';
// import { useSnapCarousel } from 'react-snap-carousel';
// import { AddItemCard } from './index';
// import { mapToArray } from '../../util/helpers';
// import { StoreAddNewsletterMediaItem } from '../store/add-newsletter-items';

// // interface CarouselProps<T> {
// //   items: T[];
// // }
// interface CarouselProps {
//   items: StoreAddNewsletterMediaItem[];
// }

// export function Carousel(props: CarouselProps) {
//   const { items } = props;
//   const { scrollRef, activePageIndex, snapPointIndexes } = useSnapCarousel();

//   return (
//     <Box display="flex" flexDirection="column">
//       <MobileStepper
//         variant="dots"
//         steps={items.length}
//         position="static"
//         activeStep={activePageIndex}
//         sx={{ background: null }}
//         backButton={null}
//         nextButton={null}
//         LinearProgressProps={{
//           sx: { width: '100%' },
//         }}
//       />

//       <Box
//         ref={scrollRef}
//         sx={{
//           position: 'relative',
//           display: 'flex',
//           overflow: 'auto',
//           scrollSnapType: 'x mandatory',
//           flex: 1,
//           flexDirection: 'row',
//         }}
//       >
//         {items.map((item, i) => (
//           <AddItemCard key={item.tempId} item={item} />
//         ))}
//       </Box>
//     </Box>
//   );
// }
