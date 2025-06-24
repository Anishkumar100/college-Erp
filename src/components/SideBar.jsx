import React, { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Avatar } from 'primereact/avatar';
import { Ripple } from 'primereact/ripple';
import { assets } from "../assets/assets";
import { useNavigate, Link } from 'react-router-dom';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import 'primereact/resources/themes/lara-dark-indigo/theme.css';

export const SideBar = ({ visible, setVisible, userRole }) => {
    /*
    🧠 Note:
    - `userRole` is passed from <Header /> (which reads it from localStorage).
    - Used to determine which menuItems to show.
    */

    const [openDropdown, setOpenDropdown] = useState(null); // Tracks which dropdown is expanded

    const toggleDropdown = (label) => {
        setOpenDropdown(prev => (prev === label ? null : label));
    };

    const navigate = useNavigate();

    // 🔒 Logout logic
    const handleLogout = () => {
        localStorage.removeItem('userRole');
        localStorage.removeItem('username');
        navigate('/');
    };

    // 🔽 Sidebar menu items based on role
    const menuItems = {
        admin: [
            { icon: "pi-home", label: "Dashboard", path: "/dashboard/admin" },
            {
                icon: "pi-users", label: "Students", dropdown: [
                    { icon: "pi-user-plus", label: "Enrollment", path: "/dashboard/admin/enrollment" },
                    { icon: "pi-list", label: "Student List", path: "/dashboard/admin/students" },
                    { icon: "pi-sort-amount-up", label: "Promotion", path: "/dashboard/admin/promotion" }
                ]
            },
            {
                icon: "pi-book", label: "Academics", dropdown: [
                    { icon: "pi-sitemap", label: "Departments", path: "/dashboard/admin/departments" },
                    { icon: "pi-briefcase", label: "Programs", path: "/dashboard/admin/programs" },
                    { icon: "pi-calendar", label: "Academic Years", path: "/dashboard/admin/years" },
                    { icon: "pi-users", label: "Batches", path: "/dashboard/admin/batches" },
                    { icon: "pi-bookmark", label: "Subjects", path: "/dashboard/admin/subjects" }
                ]
            },
            {
                icon: "pi-user", label: "Faculty", dropdown: [
                    { icon: "pi-user-plus", label: "Add Faculty", path: "/dashboard/admin/faculty/add" },
                    { icon: "pi-list", label: "Faculty List", path: "/dashboard/admin/faculty" },
                    { icon: "pi-sliders-h", label: "Assign Subjects", path: "/dashboard/admin/faculty/assign" }
                ]
            },
            { icon: "pi-calendar-clock", label: "Timetable", path: "/dashboard/admin/timetable" },
            {
                icon: "pi-credit-card", label: "Finance", dropdown: [
                    { icon: "pi-list", label: "Fee Structures", path: "/dashboard/admin/finance/structure" },
                    { icon: "pi-dollar", label: "Payments", path: "/dashboard/admin/finance/payments" }
                ]
            },
            { icon: "pi-chart-line", label: "Reports", path: "/dashboard/admin/report" },
            { icon: "pi-eye", label: "Audit Trail", path: "/dashboard/admin/audit-trail" }
        ],

        teacher: [
            { icon: "pi-home", label: "Dashboard", path: "/dashboard/teacher" },
            { icon: "pi-book", label: "Subjects", path: "/dashboard/teacher/subjects" },
            { icon: "pi-pencil", label: "Assessments", path: "/dashboard/teacher/assessments" },
            { icon: "pi-calendar-times", label: "Attendance", path: "/dashboard/teacher/attendance" },
            { icon: "pi-upload", label: "Upload Materials", path: "/dashboard/teacher/materials" },
            { icon: "pi-megaphone", label: "Announcements", path: "/dashboard/teacher/announcements" },
            { icon: "pi-chart-line", label: "Reports", path: "/dashboard/teacher/reports" }
        ],

        student: [
            { icon: "pi-home", label: "Dashboard", path: "/dashboard/student" },
            { icon: "pi-book", label: "My Courses", path: "/dashboard/student/courses" },
            { icon: "pi-download", label: "Study Materials", path: "/dashboard/student/materials" },
            { icon: "pi-calendar", label: "Timetable", path: "/dashboard/student/timetable" },
            { icon: "pi-check-square", label: "Attendance", path: "/dashboard/student/attendance" },
            { icon: "pi-credit-card", label: "Payments", path: "/dashboard/student/payments" },
            { icon: "pi-chart-line", label: "Performance", path: "/dashboard/student/performance" }
        ],

        developer: [
            { icon: "pi-home", label: "Dashboard", path: "/dashboard/developer" },
            { icon: "pi-server", label: "API Access", path: "/dashboard/developer/api" },
            { icon: "pi-database", label: "Database Console", path: "/dashboard/developer/db" },
            { icon: "pi-cog", label: "System Logs", path: "/dashboard/developer/logs" },
            { icon: "pi-user-edit", label: "Role Management", path: "/dashboard/developer/roles" },
            { icon: "pi-upload", label: "Bulk Import", path: "/dashboard/developer/import" }
        ]
    };

    return (
        <Sidebar
            visible={visible}
            onHide={() => setVisible(false)}
            className="p-0"
            content={({ hide }) => (
                <div className="flex flex-col h-screen text-sm bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">

                    {/* 🔹 Logo & Close Button */}
                    <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2">
                            <img src={assets.SCNLogo} className="w-16" alt="SCN LOGO" />
                            <p className="text-lg font-semibold tracking-wide">SCON</p>
                        </div>
                        <button
                            onClick={(e) => hide(e)}
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-amber-500 hover:bg-amber-600 text-white dark:bg-amber-600 dark:hover:bg-amber-700 transition-colors"
                        >
                            <i className="pi pi-times text-base"></i>
                        </button>
                    </div>

                    {/* 🔹 Dynamic Menu Based on Role */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide px-3 py-4 space-y-2">
                        {menuItems[userRole]?.map((item, index) =>
                            item.dropdown ? (
                                <div key={index}>
                                    {/* Dropdown Header */}
                                    <div
                                        className="flex items-center justify-between gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                                        onClick={() => toggleDropdown(item.label)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <i className={`pi ${item.icon}`}></i>
                                            <span>{item.label}</span>
                                        </div>
                                        <i className={`pi ${openDropdown === item.label ? 'pi-chevron-up' : 'pi-chevron-down'} text-xs`}></i>
                                        <Ripple />
                                    </div>
                                    {/* Dropdown Links */}
                                    {openDropdown === item.label && (
                                        <ul className="ml-6 space-y-1">
                                            {item.dropdown.map((sub, subIdx) => (
                                                <li key={subIdx}>
                                                    <Link
                                                        to={sub.path}
                                                        className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                                                    >
                                                        <i className={`pi ${sub.icon}`}></i>
                                                        <span>{sub.label}</span>
                                                        <Ripple />
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ) : (
                                // 📁 Non-Dropdown Menu Item
                                <Link
                                    to={item.path}
                                    key={index}
                                    className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                                >
                                    <i className={`pi ${item.icon}`}></i>
                                    <span>{item.label}</span>
                                    <Ripple />
                                </Link>
                            )
                        )}
                    </div>

                    {/* 🔹 User Info + Logout */}
                    <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-3">
                        <div className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                            <Avatar image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png" shape="circle" />
                            <div>
                                <div className="font-bold">Amy Elsner</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{userRole}</div>
                            </div>
                            <Ripple />
                        </div>

                        <ConfirmDialog />

                        {/* 🚪 Logout Button */}
                        <button
                            onClick={() => {
                                confirmDialog({
                                    message: 'Are you sure you want to logout?',
                                    header: 'Logout Confirmation',
                                    icon: 'pi pi-exclamation-triangle',
                                    acceptLabel: 'Yes',
                                    rejectLabel: 'Cancel',
                                    acceptClassName: 'p-button-danger',
                                    accept: handleLogout
                                });
                            }}
                            className="flex items-center gap-3 p-2 rounded cursor-pointer text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-600 hover:text-red-900 dark:hover:text-white transition-colors"
                        >
                            <i className="pi pi-sign-out"></i>
                            <span>Logout</span>
                            <Ripple />
                        </button>
                    </div>
                </div>
            )}
        />
    );
};
