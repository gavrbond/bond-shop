import React from "react"
import styles from "./Layout.module.scss"
import { Outlet } from "react-router-dom"
import Header from "../Header/Header"
const Layout = () => {
  return (
    <div className={styles.root}>
      <Header />
      <Outlet />
    </div>
  )
}

export default Layout
