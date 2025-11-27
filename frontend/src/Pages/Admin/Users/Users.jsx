import { useEffect, useState } from "react";
import { getUsers, addUser, deleteUser } from "../api/adminAPI";
import "./Users.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");

  useEffect(() => {
    async function fetchUsers() {
    const data = await getUsers(); // wait for the array
    setUsers(data);
  }
  fetchUsers();
  }, []);

  const handleAdd = async () => {
  if (!newUser) return;
  await addUser({ name: newUser, role: "user" });
  const updatedUsers = await getUsers();
  setUsers(updatedUsers);
  setNewUser("");
};

const handleDelete = async (id) => {
  await deleteUser(id);
  const updatedUsers = await getUsers();
  setUsers(updatedUsers);
};

  

  return (
    <div className="users-container">
      <h2>Users</h2>
      
      <div className="UserAdd">
        <input 
        type="text" 
        value={newUser}
        placeholder="New user name"
        onChange={(e) => setNewUser(e.target.value)}
      />
      <button onClick={handleAdd}>Add User</button>
      </div>
      

      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.name}
            <button onClick={() => handleDelete(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );

  
}


