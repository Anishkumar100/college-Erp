import React from 'react'
import { Header } from '../../../components/indexComponents'

export const AuditTrail = () => {
  return (
        <>
        <Header userRole={JSON.parse(localStorage.getItem("userRole"))}/>
        </>
  )
}
