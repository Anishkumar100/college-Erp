import React from 'react'
import { Header } from '../../../components/indexComponents'

export const DeveloperDashBoard = () => {
  return (
    <>
    <Header userRole={JSON.parse(localStorage.getItem("userRole"))}/>
    
    </>
  )
}
