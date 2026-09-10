import styles from './Button.module.scss';
import { type LucideIcon } from 'lucide-react';
import { type ReactNode, type ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary';

export type ButtonProps = {
  variant: ButtonVariant;
  icon?: LucideIcon;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variantClasses: Record<ButtonVariant, string[]> = {
  primary: [
    styles['bg-primary'],
    styles['border-primary'],
    styles['text-primary'],
  ],
  secondary: [
    styles['bg-secondary'],
    styles['border-match-secondary'],
    styles['text-white'],
    styles['font-bold'],
  ],
};

export default function Button({
  variant,
  icon: Icon,
  children,
  className,
  ...rest
}: ButtonProps) {
  const classes = [styles.button, ...variantClasses[variant], className]
    .filter(Boolean)
    .join(' ');
  return (
    <button className={classes} type="button" {...rest}>
      {Icon && (
        <Icon className={styles.icon} size={'1rem'} aria-hidden="true" />
      )}
      {children}
    </button>
  );
}
