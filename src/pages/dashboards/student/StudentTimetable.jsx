import React from 'react'
import { Header } from '../../../components/indexComponents'

export const StudentTimetable = () => {
  return (
    <>
      <Header userRole={JSON.parse(localStorage.getItem("userRole"))} />
    </>
  )
}
