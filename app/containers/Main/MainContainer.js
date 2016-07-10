import React from 'react'

const MainContainer = React.createClass({
  render () {
    return (
      <div>
        <div>Main</div>
        <div>{this.props.children}</div>
      </div>
    )
  }
})

export default MainContainer