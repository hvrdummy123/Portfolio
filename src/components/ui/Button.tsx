import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type Common = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type ButtonAsButton = Common &
  Omit<ComponentProps<"button">, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = Common & {
  href: string;
  target?: string;
  rel?: string;
};

function classes(variant: Variant, className: string) {
  const v =
    variant === "secondary"
      ? "btn btn-secondary"
      : variant === "ghost"
        ? "btn btn-ghost"
        : "btn";
  return `${v} focus-ring ${className}`.trim();
}

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { children, variant = "primary", className = "" } = props;
  const cls = classes(variant, className);

  if ("href" in props && props.href) {
    const external = props.href.startsWith("http");
    if (external) {
      return (
        <a
          href={props.href}
          className={cls}
          target={props.target ?? "_blank"}
          rel={props.rel ?? "noreferrer"}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={cls}>
        {children}
      </Link>
    );
  }

  const { href: _h, ...btn } = props as ButtonAsButton;
  return (
    <button type="button" {...btn} className={cls}>
      {children}
    </button>
  );
}
