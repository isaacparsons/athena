import _ from 'lodash'
import { useParams } from 'react-router-dom';
import { ActionBar, BackButton, CustomContainer } from '../components';
import { useStore } from '../store';
import { useShallow } from 'zustand/react/shallow';
import { useEffect, useMemo } from 'react';


export function NewsletterItemTemplate() {
  const params = useParams();
  const { templates, fetchTemplate } = useStore(
    useShallow((state) => ({
      templates: state.newsletterItemTemplates.data,
      fetchTemplate: state.newsletterItemTemplates.fetch,
      loading: state.newsletterItemTemplates.loading,
    }))
  )
  const { newsletterItemTemplateId } = params

  const template = useMemo(() => newsletterItemTemplateId && templates[_.parseInt(newsletterItemTemplateId)], [newsletterItemTemplateId, templates])

  useEffect(() => {
    if (newsletterItemTemplateId) fetchTemplate(_.parseInt(newsletterItemTemplateId))
  }, [newsletterItemTemplateId, fetchTemplate])

  if (!template) return null

  return (
    <>
      <ActionBar backBtn={<BackButton />}>
      </ActionBar>
      <CustomContainer>
        {template.name}
      </CustomContainer>
    </>
  )
}
