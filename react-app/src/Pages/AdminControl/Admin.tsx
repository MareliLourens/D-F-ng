import React, { useState, useEffect } from 'react';
import useAdminService from '../../services/AdminService';

const Admin = () => {
  const [users, setUsers] = useState<{ userId: number; email: string; username: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const adminService = useAdminService();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await adminService.getAllUsers();
        console.log('Fetched users:', userData); // Log the fetched data
        if (Array.isArray(userData)) {
          setUsers(userData);
        } else {
          console.error('Fetched data is not an array:', userData);
          setUsers([]);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [adminService]); // Include adminService in the dependency array

  return (
    <div>
      <h1>Admin Page</h1>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.userId}>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2}>No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Admin;