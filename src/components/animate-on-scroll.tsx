"use client";

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

type AnimateOnScrollProps = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
};

export default function AnimateOnScroll({ children, className, as: Tag = 'div' }: AnimateOnScrollProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: unobserve after animation
            // observer.unobserve(entry.target);
          } else {
             entry.target.classList.remove('active');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <Tag ref={ref} data-animate className={cn(className)}>
      {children}
    </Tag>
  );
}
