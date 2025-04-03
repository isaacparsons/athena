import { TemplateBase } from '@athena/common';
import { CustomList, CustomListItem } from '@athena/components';
import { useNavigate } from 'react-router-dom';
import { TemplateCard } from '../../components/common/Template/TemplateCard';
import { TemplateCardContent } from '../../components/common/Template';

interface UserTemplatesProps {
  data: TemplateBase[];
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
