import PageShell from '../../components/PageShell/PageShell'
import './About.css'

function About() {
  return (
    <PageShell title="About" lead="Bio and background — content coming soon.">
      <div className="about-skeleton">
        <div className="skeleton-line skeleton-line--full" />
        <div className="skeleton-line skeleton-line--full" />
        <div className="skeleton-line skeleton-line--medium" />
        <div className="skeleton-line skeleton-line--full" />
        <div className="skeleton-line skeleton-line--short" />
      </div>
    </PageShell>
  )
}

export default About
