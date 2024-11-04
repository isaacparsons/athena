import { List } from '@mui/material'

interface CustomListProps {
    children: React.ReactNode;
}

export function CustomList({ children }: CustomListProps) {
    return (
        <List sx={{ width: '100%' }}>
            {children}
        </List>
    )
}
