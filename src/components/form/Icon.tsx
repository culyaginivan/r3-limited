import type { SVGAttributes } from 'react';
type IconProps = Omit<SVGAttributes<SVGSVGElement>, 'title'> & {
  name: string;
  title?: string;
  desc?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
};

export default function Icon({ name, title, desc, size, width, height, ...props }: IconProps) {
  const iconName = name.startsWith('local:') ? name.slice(6) : name;
  const accessible = Boolean(title || desc);
  const resolvedWidth = width ?? size ?? '1em';
  const resolvedHeight = height ?? size ?? '1em';

  return (
    <svg
      {...props}
      width={resolvedWidth}
      height={resolvedHeight}
      aria-hidden={accessible ? undefined : true}
      role={accessible ? 'img' : undefined}
    >
      {title && <title>{title}</title>}
      {desc && <desc>{desc}</desc>}
      <use href={`#ai:local:${iconName}`} />
    </svg>
  );
}
