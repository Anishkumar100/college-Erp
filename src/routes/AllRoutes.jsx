import React from 'react';
import { Route, Routes } from 'react-router-dom';

import {
  AdminDashBoard,
  Enrollment,
  StudentList,
  Promotion,
  Departments,
  Programs,
  AcademicYears,
  Batches,
  Subjects,
  AddFaculty,
  FacultyList,
  AssignSubjects,
  AdminTimetable,
  FeeStructures,
  Payments,
  AdminReports,
  AuditTrail,

  TeacherDashBoard,
  TeacherSubjects,
  Assessments,
  TeacherAttendance,
  UploadMaterials,
  Announcements,
  TeacherReports,

  StudentDashBoard,
  MyCourses,
  StudyMaterials,
  StudentTimetable,
  StudentAttendance,
  StudentPayments,
  Performance,

  DeveloperDashBoard,
  APIAccess,
  DatabaseConsole,
  SystemLogs,
  RoleManagement,
  BulkImport,

  LoginPage,
  PageNotFound
} from '../pages/indexPages';

import { ProtectedRoute } from '../components/ProtectedRoute';

export const AllRoutes = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<LoginPage />} />

      {/* Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/dashboard/admin" element={<AdminDashBoard />} />
        <Route path="/dashboard/admin/enrollment" element={<Enrollment />} />
        <Route path="/dashboard/admin/students" element={<StudentList />} />
        <Route path="/dashboard/admin/promotion" element={<Promotion />} />
        <Route path="/dashboard/admin/departments" element={<Departments />} />
        <Route path="/dashboard/admin/programs" element={<Programs />} />
        <Route path="/dashboard/admin/years" element={<AcademicYears />} />
        <Route path="/dashboard/admin/batches" element={<Batches />} />
        <Route path="/dashboard/admin/subjects" element={<Subjects />} />
        <Route path="/dashboard/admin/faculty/add" element={<AddFaculty />} />
        <Route path="/dashboard/admin/faculty" element={<FacultyList />} />
        <Route path="/dashboard/admin/faculty/assign" element={<AssignSubjects />} />
        <Route path="/dashboard/admin/timetable" element={<AdminTimetable />} />
        <Route path="/dashboard/admin/finance/structure" element={<FeeStructures />} />
        <Route path="/dashboard/admin/finance/payments" element={<Payments />} />
        <Route path="/dashboard/admin/report" element={<AdminReports />} />
        <Route path="/dashboard/admin/audit-trail" element={<AuditTrail />} />
      </Route>

      {/* Teacher Routes */}
      <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
        <Route path="/dashboard/teacher" element={<TeacherDashBoard />} />
        <Route path="/dashboard/teacher/subjects" element={<TeacherSubjects />} />
        <Route path="/dashboard/teacher/assessments" element={<Assessments />} />
        <Route path="/dashboard/teacher/attendance" element={<TeacherAttendance />} />
        <Route path="/dashboard/teacher/materials" element={<UploadMaterials />} />
        <Route path="/dashboard/teacher/announcements" element={<Announcements />} />
        <Route path="/dashboard/teacher/reports" element={<TeacherReports />} />
      </Route>

      {/* Student Routes */}
      <Route element={<ProtectedRoute allowedRoles={['student']} />}>
        <Route path="/dashboard/student" element={<StudentDashBoard />} />
        <Route path="/dashboard/student/courses" element={<MyCourses />} />
        <Route path="/dashboard/student/materials" element={<StudyMaterials />} />
        <Route path="/dashboard/student/timetable" element={<StudentTimetable />} />
        <Route path="/dashboard/student/attendance" element={<StudentAttendance />} />
        <Route path="/dashboard/student/payments" element={<StudentPayments />} />
        <Route path="/dashboard/student/performance" element={<Performance />} />
      </Route>

      {/* Developer Routes */}
      <Route element={<ProtectedRoute allowedRoles={['developer']} />}>
        <Route path="/dashboard/developer" element={<DeveloperDashBoard />} />
        <Route path="/dashboard/developer/api" element={<APIAccess />} />
        <Route path="/dashboard/developer/db" element={<DatabaseConsole />} />
        <Route path="/dashboard/developer/logs" element={<SystemLogs />} />
        <Route path="/dashboard/developer/roles" element={<RoleManagement />} />
        <Route path="/dashboard/developer/import" element={<BulkImport />} />
      </Route>

      {/* Catch All */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
