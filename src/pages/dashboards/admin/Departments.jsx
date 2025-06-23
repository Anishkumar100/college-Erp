import React from 'react'
import { Header } from '../../../components/indexComponents'

export const Departments = () => {
  return (
    <>
      <Header userRole={JSON.parse(localStorage.getItem("userRole"))} />
    </>
  )
}
