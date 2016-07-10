import React, { PropTypes } from 'react'
import { container, title, slogan } from './styles.css'

export default function Home (props) {
  return (
    <div className={container}>
      <p className={title}>{'Would You Rather'}</p>
      <p className={slogan}>{'The 100 year old American Classic'}</p>
    </div>
  )
}
