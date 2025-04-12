import { ReadNewsletter } from '@athena/common';
import { useStore } from '@frontend/store';
import { useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useNewsletters } from '@frontend/hooks';

// export const useNewsletter = (
//   newsletterId: number | undefined,
//   newsletters: Record<number, ReadNewsletter>
// ) =>
//   useMemo(
//     () =>
//       newsletterId !== undefined && newsletters[newsletterId]
//         ? newsletters[newsletterId]
//         : undefined,
//     [newsletterId, newsletters]
//   );

export const useNewsletter = (newsletterId: number | undefined) => {
  const { newsletters, fetch } = useNewsletters();

  useEffect(() => {
    if (newsletterId !== undefined && !newsletters[newsletterId]) {
      fetch(newsletterId);
    }
  }, [newsletters, newsletterId, fetch]);

  return useMemo(
    () =>
      newsletterId !== undefined && newsletters[newsletterId]
        ? newsletters[newsletterId]
        : undefined,
    [newsletterId, newsletters]
  );
};
