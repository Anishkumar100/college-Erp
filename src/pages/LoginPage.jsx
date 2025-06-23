import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const mockUsers = [
  { username: 'admin1', password: 'admin123', role: 'admin' },
  { username: 'teacher1', password: 'teach123', role: 'teacher' },
  { username: 'student1', password: 'stud123', role: 'student' },
  { username: 'dev1', password: 'dev123', role: 'developer' },
];


export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const role = JSON.parse(localStorage.getItem('userRole')) || undefined;
    if (role) {
      navigate(`/dashboard/${role}`);
    }
    else {
      navigate(`/`)
    }
  }, []);

  /*What we are doing with useEffect? its simple. We are preventing the user to not access the loginPage once he has signed in. after u signed in, the handleLogin function gets executed. where, the username and the password is stored in localstorage in (userRole) strings. u got the userRole by parsing it (that's why it can be put in ${}) whoa!!!!*/

  const handleLogin = () => {
    const user = mockUsers.find(
      (u) => u.username === form.username && u.password === form.password
    );
    // finding the userobject from the mockUsers array of objects

    if (user) {
      localStorage.setItem('userRole', JSON.stringify(user.role));
      localStorage.setItem('username', JSON.stringify(user.username));
      navigate(`/dashboard/${user.role}`);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 dark:bg-gray-900 dark:text-white">
        <h1 className="text-3xl font-bold mb-6 text-center">SCON College ERP Login</h1>

        {error && (
          <div className="mb-4 text-sm text-red-500 text-center">{error}</div>
        )}

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          autoComplete="off"
        >
          <div>
            <label htmlFor="username" className="block mb-1 font-medium">
              Username
            </label>
            <input
              id="username"
              name="username"
              autoComplete="new-username"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
              placeholder="Enter username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="off"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 pr-10"
              placeholder="Enter password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              tabIndex={-1}
            >
              <i className={`pi ${showPassword ? 'pi-eye-slash' : 'pi-eye'}`}></i>
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};


/*
u might wonder why we used ...form, its simple we are a single useState, to store both values (username,userPassword) so, when we override the username, userpassword will be gone. that's why we retain the previous value which is they empty key value pair 

*/