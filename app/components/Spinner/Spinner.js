import React from 'react'
import Loader from 'react-loader'

export default function Spinner () {
  return (
    <Loader loaded={false} lines={13} length={20} width={10} radius={30}
      corners={1} rotate={0} direction={1} color="#000" speed={1}
      trail={60} shadow={false} hwaccel={false} className="spinner"
      zIndex={2e9} top="50%" left="50%" scale={.50}
      loadedClassName="loadedContent" />
  )
}