import { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.scss';

type CardProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export default function Card({ children, className, ...rest }: CardProps) {
  const classes = [styles.card, className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
