export function ProductPhoto({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  if (!src) return null;
  return (
    // Admin photos can be any https URL, so the optimizer’s remote allow-list would block them.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={`bg-neutral-200 object-cover ${className}`} />
  );
}
