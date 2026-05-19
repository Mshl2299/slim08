import type { ReactNode } from 'react'
import './PageShell.css'

type PageShellProps = {
  title: string
  lead?: string
  children?: ReactNode
}

function PageShell({ title, lead, children }: PageShellProps) {
  return (
    <article className="page-shell">
      <header className="page-shell__header">
        <h1 className="page-shell__title">{title}</h1>
        {lead ? <p className="page-shell__lead">{lead}</p> : null}
      </header>
      {children ? <div className="page-shell__body">{children}</div> : null}
    </article>
  )
}

export default PageShell
