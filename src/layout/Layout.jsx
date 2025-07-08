import React from 'react'
import Header from './component/Header'
import SidebarLayout from './component/Sidebar'
import { Outlet } from 'react-router-dom'
import "./Layout.css"

const Layout = () => {
  return (
    <div className='main-layout'>
        <Header/>
        <div className='layout-container'>
            <Outlet/>
        </div>
        <SidebarLayout/>  
    </div>
  )
}

export default Layout
