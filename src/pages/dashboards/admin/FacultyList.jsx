import React from 'react';
import { Header } from '../../../components/Header';

export const FacultyList = () => {
  return (
    <>
    <Header userRole={JSON.parse(localStorage.getItem("userRole"))}/>
    
    </>
  );
};

