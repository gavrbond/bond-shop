import React from "react"
import { Circles } from "react-loader-spinner"
const Loader = () => {
  return (
    <Circles
      height='200'
      width='200'
      radius='9'
      color='green'
      ariaLabel='loading'
      wrapperStyle
      wrapperClass
    />
  )
}

export default Loader
