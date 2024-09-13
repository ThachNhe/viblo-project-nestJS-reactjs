import React, { useState } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'

const Tooltip = ({ children, data , place}) => {
  const [randomID, setRandomID] = useState(String(Math.random()))

  return (
    <>
      <div data-tip={data} data-for={randomID}>{children}</div>
      <ReactTooltip id={randomID} effect='solid' place={place} />
    </>
  )
}


export default Tooltip