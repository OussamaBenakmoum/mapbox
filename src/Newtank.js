import React from 'react'
import "./newtank.css"

const Newtank = ({ percentage }) => {
  return (
    <div className="oil-tank">
      <div className="oil-level" style={{ height: `${percentage}%` }} />
    </div>
  )
}

export default Newtank