import React from 'react';
import { Header } from '../../../components/indexComponents';

export const Promotion = () => {
  return (
    <>
    <Header userRole={JSON.parse(localStorage.getItem("userRole"))}/>
    
    </>
  );
};

