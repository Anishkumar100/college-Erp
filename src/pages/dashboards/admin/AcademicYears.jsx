import React from 'react';
import { Header } from '../../../components/Header';

export const AcademicYears = () => {
  return (
   <>
   <Header userRole={JSON.parse(localStorage.getItem("userRole"))}/>
   
   </>
  );
};

