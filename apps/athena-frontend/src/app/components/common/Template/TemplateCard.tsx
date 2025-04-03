import { CustomCard } from '@athena/components';
import React from 'react';

interface TemplateCardProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

export function TemplateCard(props: TemplateCardProps) {
  const { children, onClick } = props;
  return <CustomCard onClick={onClick}>{children}</CustomCard>;
}
