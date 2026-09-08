import style from './Button.module.scss';
import { Trash2Icon, type LucideIcon } from 'lucide-react';
import { type ReactNode, type ButtonHTMLAttributes } from 'react';

type ButtonTone = 'primary' | 'brand' | 'danger' | 'neutral' | 'signIn';

export type ButtonProps = {
  tone: ButtonTone;
  icon?: LucideIcon;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const toneClasses: Record<ButtonTone, string[]> = {
  primary: [
    style.filled,
    style['bg-secondary'],
    style['text-white'],
    style['font-bold'],
  ],
  brand: [style.filled, style['bg-primary'], style['text-primary']],
  danger: [
    style.outlined,
    style['bg-primary'],
    style['text-primary'],
    style['border-black'],
  ],
  neutral: [
    style.outlined,
    style['bg-primary'],
    style['text-primary'],
    style['border-inactive'],
  ],
  signIn: [
    style.outlined,
    style['bg-off-white'],
    style['border-primary'],
    style['text-black'],
    style['font-bold'],
    style.sharper,
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
      {Icon && <Icon size={'1rem'} aria-hidden="true" />}
      {children}
    </button>
  );
}
