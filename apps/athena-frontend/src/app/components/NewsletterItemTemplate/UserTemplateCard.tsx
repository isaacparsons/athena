import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { CustomCard, CustomCardFooter, CustomIconButton } from "@athena/components";
import { NewsletterItemTemplateBase } from '@athena/common';
import { ArrowForwardIcon } from "@athena/icons";


interface UserTemplatesCardProps {
    template: NewsletterItemTemplateBase;
}

export function UserTemplateCard({ template }: UserTemplatesCardProps) {
    const navigate = useNavigate()

    const handleNavigate = () => navigate(`/templates/item/${template.id}`)
    return (
        <CustomCard onClick={handleNavigate}>
            <Typography sx={{ color: 'primary.main' }}>{template.name}</Typography>

            <CustomCardFooter right={
                <CustomIconButton
                    onClick={handleNavigate}
                    icon={<ArrowForwardIcon sx={{ fontSize: 25, color: 'white' }} />} />}>
            </CustomCardFooter>
        </CustomCard>
    );
}