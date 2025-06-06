import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className='font-bold bg-gradient-to-b from-blues-5 via-blues-10 to-blues-20 text-transparent bg-clip-text'>
    {" "}
        {text}
    </span>
  )
}

export default HighlightText
