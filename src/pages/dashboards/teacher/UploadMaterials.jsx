import React from 'react'
import { Header } from '../../../components/indexComponents'

export const UploadMaterials = () => {
  return (
    <>
      <Header userRole={JSON.parse(localStorage.getItem("userRole"))} />
    </>
  )
}
