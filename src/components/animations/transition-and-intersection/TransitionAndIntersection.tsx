import { DOMAttributes, HTMLAttributes, useEffect, useState } from 'react';

import { useIntersectionObserver } from '@/hooks';

type TransitionAndIntersectionProps = HTMLAttributes<DOMAttributes<'div'>> & {
  children: JSX.Element;
  valueInitial?: string;
  valueFinal?: string;
  duration?: string;
};

export const TransitionAndIntersection = ({
  children,
  valueInitial = 'opacity-0 translate-y-1',
  valueFinal = 'opacity-100 translate-y-0',
  duration = '300',
  ...props
}: TransitionAndIntersectionProps) => {
  const [triggeredOnce, setTriggeredOnce] = useState(false);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0,
  });

  useEffect(() => {
    if (!triggeredOnce) {
      if (isIntersecting) {
        setTriggeredOnce(true);
      }
    }
  }, [triggeredOnce, isIntersecting]);

  return (
    <div
      ref={ref}
      style={{ transitionDuration: `${duration}ms` }}
      className={`transition-all ${
        triggeredOnce ? valueFinal : valueInitial
      } ${props?.className}`}
    >
      {children}
    </div>
  );
};
