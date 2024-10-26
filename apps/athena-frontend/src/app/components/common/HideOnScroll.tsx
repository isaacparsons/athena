import { Slide, useScrollTrigger } from '@mui/material';

interface HideOnScrollProps {
  children: React.ReactElement;
}

export function HideOnScroll(props: HideOnScrollProps) {
  const { children } = props;
  const trigger = useScrollTrigger();
  console.log(trigger);
  return <Slide in={!trigger}>{children}</Slide>;
}
