"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type LuButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger";
export type LuButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium tracking-wide rounded-sm transition-all duration-[var(--dur-fast)] ease-smooth focus-visible:outline-2 focus-visible:outline-brand disabled:opacity-50 disabled:pointer-events-none select-none";

const variants: Record<LuButtonVariant, string> = {
  primary: "bg-brand text-white hover:bg-brand-hover shadow-glow",
  secondary: "bg-surface3 text-ink hover:bg-surface2 border border-line",
  ghost: "bg-transparent text-ink-muted hover:text-ink hover:bg-surface2",
  outline: "bg-transparent text-ink border border-line hover:border-brand hover:text-ink",
  danger: "bg-transparent text-brand border border-brand/50 hover:bg-brand hover:text-white",
};

const sizes: Record<LuButtonSize, string> = {
  sm: "text-[13px] h-10 px-3 sm:h-11 sm:px-4",
  md: "text-[15px] h-11 px-5",
  lg: "text-[16px] h-12 px-7",
};

interface CommonProps {
  variant?: LuButtonVariant;
  size?: LuButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
  className?: string;
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AnchorProps = CommonProps & { href: string; onClick?: () => void };

export function LuButton(props: ButtonProps | AnchorProps) {
  const {
    variant = "primary",
    size = "md",
    fullWidth,
    loading,
    leftIcon,
    rightIcon,
    children,
    className,
  } = props;
  const classes = cn(base, variants[variant], sizes[size], fullWidth && "w-full", className);
  const inner = (
    <>
      {loading ? (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!loading && rightIcon}
    </>
  );
  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes} onClick={props.onClick}>
        {inner}
      </Link>
    );
  }
  const { variant: _v, size: _s, fullWidth: _fw, loading: _l, leftIcon: _li, rightIcon: _ri, children: _c, className: _cn, ...rest } =
    props as ButtonProps;
  void _v; void _s; void _fw; void _l; void _li; void _ri; void _c; void _cn;
  return (
    <button className={classes} disabled={loading || rest.disabled} {...rest}>
      {inner}
    </button>
  );
}
