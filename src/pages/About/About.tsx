import logo from '../../assets/logo.png'
import './About.css'

function About() {
  return (
    <main className="about-page">
      <section className="about-page__section">
        <h1 className="about-page__title">About Me</h1>
        <img src={logo} alt="Marcus Lim logo" className="about-page__logo" width={160} height={160} />
        <p className="about-page__description">
          Programmer, sound designer and game developer with a founder's drive, passion for learning, and a love for creating. 
          Sweating the small details while keeping a big picture in mind, I build with integrity, authenticity, and a commitment to excellence.
        </p>
      </section>

      <section className="about-page__section about-page__section--contact">
        <h2 className="about-page__subtitle">More Links</h2>
        <ul className="about-page__links">
          <li>
            <a href="https://github.com/Mshl2299" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/marcus-lim12/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/@FlyingLimbus" target="_blank" rel="noreferrer">
              YouTube (Music)
            </a>
          </li>
          <li>
            <a href="https://mshl2299.itch.io/" target="_blank" rel="noreferrer">
              Itch (Me)
            </a>
          </li>
          <li>
            <a href="https://goosemachine.itch.io/" target="_blank" rel="noreferrer">
              Itch (Goose Machine)
            </a>
          </li>
        </ul>
      </section>
    </main>
  )
}

export default About
