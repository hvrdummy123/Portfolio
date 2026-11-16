import type { ReactNode } from "react";

type WindowProps = {
  title: string;
  children: ReactNode;
  status?: string;
  className?: string;
  bodyClassName?: string;
  actions?: ReactNode;
};

export function Window({
  title,
  children,
  status,
  className = "",
  bodyClassName = "",
  actions,
}: WindowProps) {
  return (
    <section className={`win ${className}`}>
      <div className="win-titlebar">
        <div className="win-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span className="flex-1 truncate">{title}</span>
        {actions}
      </div>
      <div className={`win-body ${bodyClassName}`}>{children}</div>
      {status ? <div className="win-statusbar">{status}</div> : null}
    </section>
  );
}
