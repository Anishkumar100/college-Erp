import React from 'react'
import { Header } from '../../../components/indexComponents'

export const TeacherSubjects = () => {
  return (
    <>
      <Header userRole={JSON.parse(localStorage.getItem("userRole"))} />
    </>
  )
}
