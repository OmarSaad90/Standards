import Link from 'next/link'
import { DATA_VERSION, PRODUCT_LABEL } from '@/lib/config'

export function SiteHeader() {
  return (
    <header className="top">
      <div className="wrap topin">
        <Link className="brand" href="/" aria-label="Aedifica Standards Explorer home">
          <span className="mark" aria-hidden="true">
            <i /><i /><i /><i />
          </span>
          <span className="word">Aedifica</span>
        </Link>
        <span className="product">{PRODUCT_LABEL}</span>
        <span className="topspacer" />
        <Link className="toplink" href="/standards">
          Explore standards
        </Link>
        <Link className="probtn" href="/pro">
          Aedifica Pro
        </Link>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap footerin">
        <div>
          <div>
            Aedifica {PRODUCT_LABEL} &middot; Public data v{DATA_VERSION}
          </div>
          <div style={{ marginTop: 6 }}>Where standards become usable learning intelligence.</div>
        </div>
        <nav className="footernav" aria-label="Footer">
          <Link href="/standards">Standards</Link>
          <Link href="/subjects">Subjects</Link>
          <Link href="/grades">Grades</Link>
          <Link href="/about">About</Link>
          <Link href="/pro">Aedifica Pro</Link>
        </nav>
      </div>
    </footer>
  )
}

export interface Crumb {
  label: string
  href?: string
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`} style={{ display: 'contents' }}>
          {item.href ? <Link href={item.href}>{item.label}</Link> : <strong>{item.label}</strong>}
          {i < items.length - 1 && <span aria-hidden="true">&rsaquo;</span>}
        </span>
      ))}
    </nav>
  )
}
