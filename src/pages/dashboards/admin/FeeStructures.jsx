import React from 'react'
import { Header } from '../../../components/indexComponents'

export const FeeStructures = () => {
  return (
    <>
      <Header userRole={JSON.parse(localStorage.getItem("userRole"))} />
    </>
  )
}
