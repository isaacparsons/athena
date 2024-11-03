import _ from 'lodash';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NewsletterItemsList, CustomContainer, ActionBar, BackButtonIcon } from '../components';
import { useStore } from '../store';
import { useShallow } from 'zustand/react/shallow';


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

  const { fetch, newsletterItems, loading } = useStore(
    useShallow((state) => ({
      fetch: state.newsletterItems.fetch,
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
      <ActionBar backBtn={item !== null ? (<BackButtonIcon onClick={handleBackBtnClick} />) : null} />
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
