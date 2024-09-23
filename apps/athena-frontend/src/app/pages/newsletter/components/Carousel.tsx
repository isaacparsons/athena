import { Box, MobileStepper, TextField, Typography } from '@mui/material';
import React, { useState, useEffect, useMemo } from 'react';
import { useSnapCarousel } from 'react-snap-carousel';
import AddMediaItemCard from './add-media-item-card/AddMediaItemCard';
import { useAddNewsletterItemsContext } from '../../../context/addNewsletterItemsContext';
import { mapToArray } from '../../../../util/helpers';

function Carousel() {
  const { scrollRef, activePageIndex, snapPointIndexes } = useSnapCarousel();

  const addNewsletterItems = useAddNewsletterItemsContext();

  useEffect(() => {
    // console.log(mapToArray(addNewsletterItems));
  }, [addNewsletterItems]);

  // console.log(addNewsletterItems);
  const addNewsletterItemsArray = useMemo(() => {
    return mapToArray(addNewsletterItems);
  }, [addNewsletterItems]);

  // console.log(addNewsletterItemsArray);

  return (
    <Box display="flex" flexDirection="column">
      <MobileStepper
        variant="dots"
        steps={mapToArray(addNewsletterItems).length}
        position="static"
        activeStep={activePageIndex}
        sx={{ background: null }}
        backButton={null}
        nextButton={null}
        LinearProgressProps={{
          sx: { width: '100%' },
        }}
      />
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
      </Box>
    </Box>
  );
}
export default Carousel;
