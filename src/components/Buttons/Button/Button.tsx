import style from './Button.module.scss';
import { type LucideIcon } from 'lucide-react';
import { type ReactNode, type ButtonHTMLAttributes } from 'react';

type ButtonTone =
  'primary' | 'brand' | 'danger' | 'neutral' | 'signIn' | 'cancel';

export type ButtonProps = {
  tone: ButtonTone;
  icon?: LucideIcon;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const toneClasses: Record<ButtonTone, string[]> = {
  primary: [
    style.outlined,
    style['bg-off-white'],
    style['border-black'],
    style['text-primary'],
  ],
  brand: [
    style.filled,
    style['bg-secondary'],
    style['text-white'],
    style['font-bold'],
  ],
  danger: [
    style.outlined,
    style['bg-primary'],
    style['text-primary'],
    style['border-black'],
  ],
  neutral: [style.filled, style['bg-primary'], style['text-primary']],
  signIn: [
    style.outlined,
    style['bg-off-white'],
    style['border-primary'],
    style['text-black'],
    style['font-bold'],
    style.sharper,
  ],
  cancel: [
    style.outlined,
    style['bg-off-white'],
    style['border-primary'],
    style['text-black'],
  ],
};

export default function Button({
  tone,
  icon: Icon,
  children,
  ...rest
}: ButtonProps) {
  const className = [style.button, ...toneClasses[tone]].join(' ');
  return (
    <button className={className} {...rest}>
      {Icon && <Icon className={style.icon} size={'1rem'} aria-hidden="true" />}
      {children}
    </button>
  );
}
