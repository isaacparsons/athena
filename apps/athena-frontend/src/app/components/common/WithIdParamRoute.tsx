import { useParamId } from '@frontend/hooks';
import { useMemo } from 'react';

export type IdParamRouteProps = {
  id: number;
};

export type WithIdParamRouteProps = {
  k: string;
  render: (id: number) => React.ReactNode;
};

export function WithIdParamRoute(props: WithIdParamRouteProps) {
  const { k, render } = props;
  const id = useParamId(k);

  return useMemo(() => (id === undefined ? null : render(id)), [id, render]);
}
