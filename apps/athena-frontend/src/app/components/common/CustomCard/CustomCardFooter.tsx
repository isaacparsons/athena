import { Grid2 as Grid, Typography } from '@mui/material';
import { ArrowForwardIcon } from '../../../icons';
import React from 'react';
import { CustomIconButton } from '../CustomIconButton';

interface CustomCardFooterProps {
    children?: React.ReactNode
    right?: React.ReactNode
}

export function CustomCardFooter({ children, right }: CustomCardFooterProps) {
    return (
        <Grid container spacing={3}>
            <Grid size="grow" sx={{
                display: 'flex', flex: 1, justifyContent: 'flex-start',
            }}>
                {children}
                {/* <Typography>{"Sat Jun 3, 2024"}</Typography> */}
            </Grid>
            <Grid size={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {right}
                {/* <CustomIconButton
                    onClick={() => console.log('click')}
                    icon={<ArrowForwardIcon sx={{ fontSize: 25, color: 'white' }} />} /> */}
            </Grid>
        </Grid>
    )
}