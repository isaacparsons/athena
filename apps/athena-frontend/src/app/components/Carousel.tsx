import { Box, MobileStepper } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useSnapCarousel } from 'react-snap-carousel';
import { AddMediaItemCard } from './index';
import { mapToArray } from '../../util/helpers';

interface CarouselProps<T> {
  items: T[];
}

export function Carousel<T>(props: CarouselProps<T>) {
  const { items } = props;
  const { scrollRef, activePageIndex, snapPointIndexes } = useSnapCarousel();

  console.log(items);
  //   const addNewsletterItems = useAddNewsletterItemsContext();

  //   useEffect(() => {
  //     // console.log(mapToArray(addNewsletterItems));
  //   }, [addNewsletterItems]);

  //   // console.log(addNewsletterItems);
  //   const addNewsletterItemsArray = useMemo(() => {
  //     return mapToArray(addNewsletterItems);
  //   }, [addNewsletterItems]);

  //   // console.log(addNewsletterItemsArray);

  return (
    <Box display="flex" flexDirection="column">
      <MobileStepper
        variant="dots"
        steps={items.length}
        position="static"
        activeStep={activePageIndex}
        sx={{ background: null }}
        backButton={null}
        nextButton={null}
        LinearProgressProps={{
          sx: { width: '100%' },
        }}
      />
      {/* 
       <Box
         ref={scrollRef}
         sx={{
           position: 'relative',
           display: 'flex',
           overflow: 'auto',
           scrollSnapType: 'x mandatory',
           flex: 1,
           flexDirection: 'row',
         }}
       >
         {mapToArray(addNewsletterItems).map((item, i) => (
           <AddMediaItemCard
             key={item.details.name}
             item={item}
             isSnapPoint={snapPointIndexes.has(i)}
           />
         ))}
       </Box> */}
    </Box>
  );
}
