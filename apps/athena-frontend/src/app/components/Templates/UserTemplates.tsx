import { Template } from '@athena/common';
import {
  CustomCard,
  CustomCardFooter,
  CustomIconButton,
  CustomList,
  CustomListItem,
} from '@frontend/components';
import { useNavigate } from 'react-router-dom';
import { TemplateCardContent } from '../common/Template';
import { ArrowForwardIcon } from '@frontend/icons';

interface UserTemplatesProps {
  data: Template[];
}
export function UserTemplates(props: UserTemplatesProps) {
  const { data } = props;
  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    navigate(`/templates/${id}`);
  };

  return (
    <CustomList>
      {data.map((template) => {
        return (
          <CustomListItem id={template.id} key={template.id}>
            <CustomCard
              onClick={() => handleNavigate(template.id)}
              content={<TemplateCardContent data={template} />}
              footer={
                <CustomCardFooter
                  right={
                    <CustomIconButton
                      onClick={() => handleNavigate(template.id)}
                      icon={
                        <ArrowForwardIcon sx={{ fontSize: 25, color: 'white' }} />
                      }
                    />
                  }
                />
              }
            />
          </CustomListItem>
        );
      })}
    </CustomList>
  );
}
