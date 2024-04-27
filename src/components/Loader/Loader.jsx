import React from "react"
import { ColorRing } from "react-loader-spinner"
import styles from "./Loader.module.scss"

const Loader = ({ size }) => {
  return (
    <ColorRing
      visible={true}
      height={size}
      width={size}
      ariaLabel='color-ring-loading'
      wrapperStyle={{}}
      wrapperClass='color-ring-wrapper'
      colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
    />
  )
}

export default Loader
