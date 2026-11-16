type IconProps = { className?: string; title?: string };

function Svg({
  children,
  className = "h-5 w-5",
  title,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

const fill = "currentColor";

export function IconHome(p: IconProps) {
  return (
    <Svg {...p}>
      <path fill={fill} d="M2 7h1V6h1V5h1V4h1V3h2v1h1v1h1v1h1v1h1v1h1v7H9v-3H7v3H2V8H1V7h1zm2 1v5h2v-3h4v3h2V8H4z" />
    </Svg>
  );
}

export function IconWork(p: IconProps) {
  return (
    <Svg {...p}>
      <path fill={fill} d="M5 3h6v2h3v9H2V5h3V3zm1 1v1h4V4H6zm-3 3v6h10V7H3z" />
    </Svg>
  );
}

export function IconLab(p: IconProps) {
  return (
    <Svg {...p}>
      <path fill={fill} d="M6 1h4v1H9v4l3 5v3H4v-3l3-5V2H6V1zm1 6.5L5 12h6L9 7.5V2H7v5.5z" />
    </Svg>
  );
}

export function IconNote(p: IconProps) {
  return (
    <Svg {...p}>
      <path fill={fill} d="M3 1h8l2 2v12H3V1zm1 1v12h8V4h-2V2H4zm2 4h5v1H6V6zm0 3h5v1H6V9zm0 3h3v1H6v-1z" />
    </Svg>
  );
}

export function IconPerson(p: IconProps) {
  return (
    <Svg {...p}>
      <path fill={fill} d="M6 2h4v1h1v3H9v1H7V6H5V3h1V2zm-3 9h10v1H3v-1zm1-1h8v1H4v-1zM5 8h6v1H5V8z" />
      <path fill={fill} d="M5 11h6v3H5v-3z" />
    </Svg>
  );
}

export function IconGame(p: IconProps) {
  return (
    <Svg {...p}>
      <path fill={fill} d="M2 6h3V5h6v1h3v5H2V6zm1 1v3h2V9h1V8H5V7H3zm7 0v1H9v1h1v1h2V7h-2z" />
    </Svg>
  );
}

export function IconMail(p: IconProps) {
  return (
    <Svg {...p}>
      <path fill={fill} d="M1 4h14v9H1V4zm1 1v1l6 4 6-4V5H2zm12 2.2-6 4-6-4V12h12V7.2z" />
    </Svg>
  );
}

export function IconExternal(p: IconProps) {
  return (
    <Svg {...p}>
      <path fill={fill} d="M3 3h6v1H4v8h8V9h1v4H3V3zm6 0h4v4h-1V5L8 9 7 8l4-4H9V3z" />
    </Svg>
  );
}
