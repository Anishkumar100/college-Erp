import React from 'react';
import { Header } from '../../../components/Header';

export const StudentList = () => {
  return (
    <div>
     
             <Header userRole={JSON.parse(localStorage.getItem("userRole"))}/>


    </div>
  );
};

