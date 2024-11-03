import { Box, Button, ButtonBase, Grid2 as Grid, IconButton, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowBackIcon, ArrowForwardIcon } from '../../icons';
import React from 'react';

interface CustomImageCardProps {
    src: string;
}

const Item = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
}));

export function CustomImageCard({ src }: CustomImageCardProps) {
    return (
        <Box
            sx={{
                m: 1,
                p: 2,
                borderRadius: 5,
                backgroundImage: `url(${src})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                minHeight: 500,
                display: "flex"

            }}
        >
            <Grid
                container
                direction={"column"}
                bgcolor='secondary.main'
                sx={{ justifyContent: "space-between", width: '100%' }}>
                <CustomCardHeader />
                <CustomCardFooter />
            </Grid>
        </Box>
    )
}

// interface CustomCardHeaderProps {}

function CustomCardHeader() {
    return (
        <Grid
            container
            spacing={3}
            direction="row"
            sx={{
                justifyContent: "center",
                alignItems: "stretch",
            }}
        >
            <Grid item size={1}>
                <Item>
                    <CustomIconButton icon={<ArrowBackIcon sx={{ fontSize: 25, color: 'white' }} />} />
                </Item>
            </Grid>
            <Grid item size="grow">
                <Item>
                    <Typography>
                        Title
                    </Typography>
                </Item>
            </Grid>
            <Grid item size={1}>
                <Item>3</Item>
            </Grid>
        </Grid>
    )
}

interface CustomIconButtonProps {
    icon: React.ReactElement
}

function CustomIconButton({ icon }: CustomIconButtonProps) {
    return (
        <ButtonBase
            onClick={() => console.log('clicked')}
        >
            <Box sx={{
                bgcolor: 'primary.main',
                borderRadius: 35 / 2,
                width: 35,
                height: 35,
                justifyContent: 'center',
                alignContent: 'center',
            }}>
                {icon}
                {/* <ArrowForwardIcon /> */}
            </Box>
        </ButtonBase>
    )
}

function CustomCardFooter() {
    return (
        <Grid container spacing={3}>
            <Grid size={2}>
                <Item></Item>
            </Grid>
            <Grid size="grow">
                <Item>2</Item>
            </Grid>
            <Grid size={2} >
                <Item>
                    <CustomIconButton icon={<ArrowForwardIcon sx={{ fontSize: 25, color: 'white' }} />} />
                </Item>
            </Grid>
        </Grid>
    )
}