import React from 'react'
import {
  TheContent,
  TheHeader
} from './index'

const TheLayout = () => {

  return (
    <div className="c-app c-default-layout">
      <TheHeader/>
      <TheContent/>
    </div>
  )
}

export default TheLayout
