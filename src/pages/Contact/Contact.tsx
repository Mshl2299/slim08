import PageShell from '../../components/PageShell/PageShell'
import './Contact.css'

function Contact() {
  return (
    <PageShell title="Contact" lead="Get in touch — form coming soon.">
      <form className="contact-form" aria-label="Contact form placeholder">
        <div className="contact-field skeleton-block">
          <span className="contact-field__label">Name</span>
          <div className="contact-field__input" />
        </div>
        <div className="contact-field skeleton-block">
          <span className="contact-field__label">Email</span>
          <div className="contact-field__input" />
        </div>
        <div className="contact-field skeleton-block contact-field--tall">
          <span className="contact-field__label">Message</span>
          <div className="contact-field__input contact-field__input--area" />
        </div>
        <div className="contact-submit skeleton-block" aria-hidden="true" />
      </form>
    </PageShell>
  )
}

export default Contact
