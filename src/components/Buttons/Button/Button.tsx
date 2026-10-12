import styles from './Button.module.scss';
import { type LucideIcon } from 'lucide-react';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary';

export type ButtonProps = {
  variant: ButtonVariant;
  icon?: LucideIcon;
  children: ReactNode;
  onClick: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  variant,
  icon: Icon,
  children,
  className,
  ...rest
}: ButtonProps) {
  const classes = [styles.button, styles[`variant-${variant}`], className]
    .filter(Boolean)
    .join(' ');
  return (
    <button className={classes} type="button" {...rest}>
      {Icon && <Icon className={styles.icon} aria-hidden="true" />}
      {children}
    </button>
  );
}
