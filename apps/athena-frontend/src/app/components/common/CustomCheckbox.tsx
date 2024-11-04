import { Checkbox, Box } from '@mui/material'

interface CustomCheckboxProps {
    id: number | string;
    value: boolean;
    onClick: () => void;
}

export function CustomCheckbox({ id, value, onClick }: CustomCheckboxProps) {
    return (
        <Box sx={{ borderRadius: 1 }}>
            <Checkbox key={id} checked={value} onClick={onClick} />
        </Box>
    )
}
