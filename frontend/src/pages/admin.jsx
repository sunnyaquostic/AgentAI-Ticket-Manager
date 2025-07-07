import {useEffect, useState } from 'react'

function Admin() {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [editingUsers, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({ role: "", skills: ""})
  const [searchQuery, setSearchQuery] = useState("")
  const token = localStorage.getItem("token")

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/users`,{
        headers : {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.json();

      if (res.ok) {
        setUsers(data)
        setFilteredUsers(data)
      } else {
        console.log(data.error)
      }
    } catch (error) {
      console.log("Error fetching users: ", error)
    }

    const handleEditClick = (user) => {
      setEditingUser(user.email)
      setFormData({
        role: user.role,
        skills: user.skills?.join(", "),
      });
    };
  }

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/update-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: editingUsers,
          role: formData.role,
          skills: formData.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
        }),
      })

      const data = await res.json()
      if(!res.ok) {
        console.log(data.error || "Failed to update user")
        return 
      }

      setEditingUser(null)
      setFormData({ role: "", skills: "" })
      fetchUsers()

    } catch (error) {
      console.error("Update failed.", error)
    }
  }

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query)
    setFilteredUsers(
      users.filter((user) => user.email.toLowerCase().includes(query))
    );
  };

  return (
    <div className='max-w-4xl mx-auto mt-10'>
      <h1 className="text-2xl font-bold mb-6">Admin Panel - Manager Users</h1>

      <input 
        type='text'
        className='input input-bordered w-full mb-6'
        placeholder='Search by email'
        value={searchQuery}
        onChange={handleSearch}
      />

      {
        filteredUsers.map((user) => (
          <div
            key={user._id}
            className='bg-base-100 shadow rounded p-4 mb-4 border'
          >
            <p>
              <strong>Email:</strong>  {user.email}
            </p>
            <p>
              <strong>Current Role: </strong> {user.role}
            </p>
            <p>
              <strong>Skills:</strong> {" "}
              {
                user.skills && user.skills.length > 0
                  ? user.skills.join(", ")
                  : "N/A"
              }
            </p>

            {editingUsers === user.email 
              ? (
                <div className="mt-4 space-y-2">
                  <select 
                    className='select select-bordered w-full'
                    value={formData.role}
                    onChange={(e) => 
                      setFormData({...formData, role: e.target.value})
                    }
                  >
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>

                  <input
                     type="text"
                     placeholder='Comma separated skills'
                     className='input input-bordered w-full'
                     value={formData.skills}
                     onChange={(e) => 
                      setFormData({ ...formData, skills: e.target.value })
                     }
                  />

                  <div className="flex gap-2">
                    <button 
                      className="btn btn-success btn-sm"
                      onClick={handleUpdate}
                    >
                      Save
                    </button>

                  </div>
                </div>
              ) 
              : (
                console.log('work in progress')
              )
            
            }
          </div>
        ))
      }
    </div>
  )
}

export default Admin