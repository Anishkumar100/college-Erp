import React from 'react'
import { Header } from '../../../components/indexComponents'

export const StudentPayments = () => {
  return (
    <>
      <Header userRole={JSON.parse(localStorage.getItem("userRole"))} />
    </>

  )
}
