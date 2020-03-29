import React from 'react'
import { RouteProps } from 'react-router'

import './Contact.scss'
import { Link } from 'react-router-dom'
import routes from 'consts/routes'

const Contact: React.FC<RouteProps> = (props: RouteProps) => {
  return (
    <div className='Contact-container'>
      <h1 className='Contact-title'>Contact</h1>
      <p className='Contact-info'>
        If you have comments, questions or feedback about my work — just shoot me an email. For partnerships or
        collaborations inquiries please use email as well. Otherwise, feel free to reach out to me on social networks.
      </p>
      <a className='Contact-link' href='mailto:alexkorzh7@gmail.com'>
        alexkorzh7@gmail.com
      </a>
      <a className='Contact-link' href='https://github.com/AlexKLWS'>
        Github
      </a>
      <a className='Contact-link' href='https://twitter.com/alexkorzh7'>
        Twitter
      </a>
      <a className='Contact-link' href='https://www.linkedin.com/in/aleksei-korzh-52952392'>
        LinkedIn
      </a>
      <div className='Contact-separator' />
      <Link to={routes.login} className='Contact-secret'>
        Log in
      </Link>
    </div>
  )
}

export default Contact
