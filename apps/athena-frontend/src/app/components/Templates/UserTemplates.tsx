import { Template } from '@athena/common';
import { CustomList, CustomListItem } from '@frontend/components';
import { useNavigate } from 'react-router-dom';
import { TemplateCard } from '../common/Template/TemplateCard';
import { TemplateCardContent } from '../common/Template';

interface UserTemplatesProps {
  data: Template[];
}
export function UserTemplates(props: UserTemplatesProps) {
  const { data } = props;
  const navigate = useNavigate();

  return (
    <CustomList>
      {data.map((template) => {
        return (
          <CustomListItem id={template.id} key={template.id}>
            <TemplateCard onClick={() => navigate(`/templates/${template.id}`)}>
              <TemplateCardContent data={template} />
            </TemplateCard>
          </CustomListItem>
        );
      })}
    </CustomList>
  );
}
