import { ListItem } from "@mui/material";

interface CustomListItemProps {
    id: number | string
    children: React.ReactNode;
}

export function CustomListItem({ id, children }: CustomListItemProps) {
    return (
        <ListItem key={id} sx={{ p: 0 }}>
            {children}
        </ListItem>
    )
}
