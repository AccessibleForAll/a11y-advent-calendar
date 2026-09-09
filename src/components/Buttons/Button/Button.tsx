import style from './Button.module.scss';
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
    style['bg-primary'],
    style['border-primary'],
    style['text-primary'],
  ],
  secondary: [
    style['bg-secondary'],
    style['border-match-secondary'],
    style['text-white'],
    style['font-bold'],
  ],
};

export default function Button({
  variant,
  icon: Icon,
  children,
  ...rest
}: ButtonProps) {
  const className = [style.button, ...variantClasses[variant]].join(' ');
  return (
    <button type="button" className={className} {...rest}>
      {Icon && <Icon className={style.icon} size={'1rem'} aria-hidden="true" />}
      {children}
    </button>
  );
}
