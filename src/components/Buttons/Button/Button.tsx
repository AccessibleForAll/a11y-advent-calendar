import style from './Button.module.scss';
import { type LucideIcon } from 'lucide-react';
import { type ReactNode, type ButtonHTMLAttributes } from 'react';

type ButtonStyle = 'filled' | 'outlined';
type ButtonTone = 'primary' | 'brand' | 'danger' | 'neutral';
type ButtonShape = 'default' | 'sharper';

type ButtonProps = {
  buttonStyle: ButtonStyle;
  tone: ButtonTone;
  shape?: ButtonShape;
  icon?: LucideIcon;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  buttonStyle,
  tone,
  shape = 'default',
  icon: Icon,
  children,
  ...rest
}: ButtonProps) {
  const className = `${style.button} ${style[buttonStyle]} ${style[tone]} ${shape !== 'default' ? style[shape] : ''}`;
  return (
    <button className={className} {...rest}>
      {Icon && <Icon size={16} aria-hidden="true" />}
      {children}
    </button>
  );
}
