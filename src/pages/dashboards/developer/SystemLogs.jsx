import React from 'react'
import { Header } from '../../../components/indexComponents'

export const SystemLogs = () => {
  return (
    <>
      <Header userRole={JSON.parse(localStorage.getItem("userRole"))} />
    </>
  )
}
