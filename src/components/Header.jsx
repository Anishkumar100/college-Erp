import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { SideBar } from './indexComponents'; // ensure correct path

export const Header = ( {userRole}) => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            {/* Top Navbar */}
            <header className="flex items-center justify-between px-4 py-3 bg-gray-900 text-white dark:bg-gray-900 dark:text-white shadow-md">
                {/* Sidebar Toggle Button */}
                <div className="flex justify-around items-center gap-2">
                    
                    <span className="ml-2 text-lg font-semibold tracking-wide">Shenbagha College Of Nursing</span>

                   
                </div>
                 <Button 
                        icon="pi pi-bars" 
                        onClick={() => setVisible(true)} 
                        aria-controls={visible ? 'sbar' : null} 
                        aria-expanded={visible ? true : false}
                        className="text-white bg-gray-800 hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 border-none"
                    />

               
            </header>

            {/* Sidebar Drawer */}
            <SideBar 
                id="sbar" 
                visible={visible} 
                setVisible={setVisible} 
                onHide={() => setVisible(false)} 
                role="region" 

                userRole={userRole}
                
            />
        </>
    );
};
