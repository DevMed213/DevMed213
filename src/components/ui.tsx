import Link from "next/link";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-6xl px-5 md:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({
  children,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={`font-mono text-[11px] uppercase tracking-[0.28em] text-black/45`}
    >
      {children}
    </p>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost" | "dark";
  className?: string;
}) {
  const styles = {
    solid: "bg-black text-white hover:bg-neutral-800",
    ghost: "border border-black/20 text-black hover:border-black hover:bg-black hover:text-white",
    dark: "bg-black text-white hover:bg-neutral-800",
  }[variant];

  return (
    <Link
      href={href}
      className={`inline-flex h-12 items-center justify-center px-5 text-sm font-medium tracking-wide transition-colors ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}
