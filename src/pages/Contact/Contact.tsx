import React from 'react'

import './Contact.scss'
import { Link } from 'react-router-dom'
import routes from 'consts/routes'

const Contact: React.FC = () => {
  return (
    <div className='Contact-container'>
      <h1 className='Contact-title'>Contact</h1>
      <p className='Contact-info'>
        If you have any comments, questions or feedback about my work — just shoot me an email. For partnerships or
        collaborations inquiries please use email as well. Otherwise, feel free to reach out to me on social networks.
      </p>
      <a className='Contact-link' href='mailto:alexkorzh7@pm.me'>
        alexkorzh7@pm.me
      </a>
      <a className='Contact-link' href='https://github.com/AlexKLWS'>
        Github
      </a>
      <a className='Contact-link' href='https://www.linkedin.com/in/aleksei-korzh-52952392'>
        LinkedIn
      </a>
      <div style={{ height: '16px' }} />
      <span className='Twitter-caption'>Video games, code, art and everything related:</span>
      <a className='Contact-link' href='https://twitter.com/longwinshadows'>
        @longwinshadows
      </a>
      <span className='Twitter-caption'>Personal stuff, Russian politics, etc:</span>
      <a className='Contact-link' href='https://twitter.com/alexkorzh7'>
        @alexkorzh7
      </a>
      <div className='Bottom-section'>
        <div className='Contact-separator' />
        <div className='Contact-secret-container'>
          <Link to={routes.login} className='Contact-secret'>
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Contact
