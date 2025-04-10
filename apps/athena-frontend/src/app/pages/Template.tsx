import {
  createCustomFab,
  CustomContainer,
  CustomList,
  CustomListItem,
} from '@frontend/components';
import { useParamId, useTemplate } from '@frontend/hooks';
import { AddIcon } from '@frontend/icons';
import { useStore } from '@frontend/store';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

export function Template() {
  const templateId = useParamId('templateId');

  const { template, loading } = useTemplate(templateId);

  const [editing, setEditing] = useState(false);
  console.log(template);

  if (loading) return <CircularProgress />;

  return (
    <CustomContainer>
      <></>
    </CustomContainer>
  );
}
