import PageShell from '../../components/PageShell/PageShell'
import './SoundDesign.css'

const tracks = [1, 2, 3, 4]

function SoundDesign() {
  return (
    <PageShell title="Sound Design" lead="Audio work and demos — content coming soon.">
      <ul className="sound-list">
        {tracks.map((n) => (
          <li key={n} className="sound-row skeleton-block">
            <div className="sound-row__play" aria-hidden="true" />
            <div className="sound-row__meta">
              <div className="skeleton-line skeleton-line--medium" />
              <div className="skeleton-line skeleton-line--short" />
            </div>
            <div className="sound-row__wave" aria-hidden="true" />
          </li>
        ))}
      </ul>
    </PageShell>
  )
}

export default SoundDesign
