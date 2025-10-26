import React, { useEffect, useState } from "react";
import "./UserTable.css";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchUsers();
  }, []);

  // Filter users by name (bonus)
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="user-table-container">
      <div className="controls">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>City</th>
            <th>Phone</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.address.city}</td>
                <td>{user.phone}</td>
                <td>{user.company.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-data">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={handlePrev} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages || 1}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;
