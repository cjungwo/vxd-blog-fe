import clsx from 'clsx';
import Link from 'next/link';
import { SocialBtnProps } from '@/shared';
import Image from 'next/image';

export const SocialBtn = ({
  className,
  href,
  icon,
  label,
  variant = 'default',
  size = 'md',
  ...props
}: SocialBtnProps) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black';
  
  const variantStyles = {
    default: 'bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-gray-500',
  };

  const sizeStyles = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
  };

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      aria-label={label}
      {...props}
    >
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">
        <Image src={icon} alt={label} width={24} height={24} />
      </span>
    </Link>
  );
};
