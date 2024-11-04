import _ from 'lodash';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NewsletterItemsList, CustomContainer, ActionBar, BackButtonIcon, CustomIconButton } from '../components';
import { useStore } from '../store';
import { useShallow } from 'zustand/react/shallow';
import { MoreVertIcon } from '../icons';



export function NewsletterItem() {
  const params = useParams();
  const navigate = useNavigate();

  const newsletterId =
    params.newsletterId && !_.isNaN(params.newsletterId)
      ? _.parseInt(params.newsletterId)
      : null;
  const newsletterItemId =
    params.newsletterItemId && !_.isNaN(params.newsletterItemId)
      ? _.parseInt(params.newsletterItemId)
      : null;

  const { newsletterItems, loading } = useStore(
    useShallow((state) => ({
      newsletterItems: state.newsletterItems.data,
      loading: state.newsletterItems.loading,
    }))
  );

  const item = useMemo(() => {
    if (newsletterItemId === null) return null;
    return newsletterItems[newsletterItemId];
  }, [newsletterItemId, newsletterItems]);


  const items = useMemo(() => {
    if (item === null) return [];
    return item ? item.childrenIds.map((cId) => newsletterItems[cId]) : [];
  }, [newsletterItems, item]);

  if (!newsletterId || !newsletterItemId) return null;


  const handleBackBtnClick = () => {
    if (item) navigate(item.parentId === null ? `/newsletters/${newsletterId}` : `/newsletters/${newsletterId}/items/${item.parentId}`)
  }
  return (
    <>
      <ActionBar
        backBtn={item !== null ? (<BackButtonIcon onClick={handleBackBtnClick} />) : null} >
        <CustomIconButton
          onClick={() => console.log('clicked')}
          icon={<MoreVertIcon htmlColor="#fff" fontSize="inherit" />} />
      </ActionBar>

      <CustomContainer>
        <NewsletterItemsList
          editing={false}
          newsletterId={newsletterId}
          items={items}
        />
      </CustomContainer>
    </>
  );
}
