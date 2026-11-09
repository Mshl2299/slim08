import logo from '../../assets/logo.png'
import './About.css'

function About() {
  return (
    <main className="about-page">
      <section className="about-page__section">
        <h1 className="about-page__title">About Me</h1>
        <img
          src={logo}
          alt="Marcus Lim (slim08) logo"
          className="about-page__logo"
          width={120}
          height={120}
        />
        <p className="about-page__description">
          Programmer, sound designer and game developer founded upon my core values of integrity,
          accountability, and a commitment to excellence. Whether it's apps, audio or even documentation,
          every detail matters as I build with the anchors of a bigger picture and vision. Also, I play a
          lot of Bloons Tower Defense 6. Thanks for visiting!
        </p>
      </section>

      <section className="about-page__section about-page__section--contact">
        <h2 className="about-page__subtitle">More Links</h2>
        <ul className="about-page__links">
          <li>
            <a
              href="https://github.com/Mshl2299"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/marcus-lim12/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/@FlyingLimbus"
              target="_blank"
              rel="noreferrer"
            >
              YouTube (Music)
            </a>
          </li>
          <li>
            <a
              href="https://mshl2299.itch.io/"
              target="_blank"
              rel="noreferrer"
            >
              Itch (Me)
            </a>
          </li>
          <li>
            <a
              href="https://goosemachine.itch.io/"
              target="_blank"
              rel="noreferrer"
            >
              Itch (Goose Machine)
            </a>
          </li>
        </ul>
      </section>
    </main>
  )
}

export default About
