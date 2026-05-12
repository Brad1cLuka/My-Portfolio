import React from 'react'
import './Title.css'

const Title = ({ subTitle, title }) => {
  return (
    <div className="title">
      <p className="title-subtitle">{subTitle}</p>
      <h2 className="title-heading">{title}</h2>
    </div>
  )
}

export default Title