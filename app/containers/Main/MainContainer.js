import React from 'react'
import { container, innerContainer } from './styles.css'

const MainContainer = React.createClass({
  render () {
    return (
      <div className={container}>
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
    )
  }
})

export default MainContainer