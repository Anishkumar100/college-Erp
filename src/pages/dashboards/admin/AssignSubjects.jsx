import React from 'react'
import { Header } from '../../../components/indexComponents'

export const AssignSubjects = () => {
  return (
        <>
        <Header userRole={JSON.parse(localStorage.getItem("userRole"))}/>
        </>
  )
}
