import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import Navbar from "../components/navbar.jsx";


function Tickets() {
  const [form, setForm] = useState({ title: "", description: ""});
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(false)
  
  const token = localStorage.getItem("token")

  const fetchTickets = async () => {     
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`},
      });

      const data = await res.json();

      setTickets(data || [])
    } catch (error) {
      console.log("Failed to fetch tickets", error)
    }
  };

  useEffect(() => {
    fetchTickets()
  }, []);

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(false)
    console.log(form)
    
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/tickets`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      console.log(data)
      if (res.ok) {
        setForm({ title: "", description: ""});
        fetchTickets()
      } else {
        alert(data.message || "Ticket creation failed");
      }
    } catch (error) {
      alert("Error creating ticket");
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <Navbar />
      <div className="p-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Create Ticket</h2>

        <form onSubmit={handleSubmit} className="space-y-3 mb-8">
          <input 
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="Ticket Title"
            className="input input-bordered w-full"
            required
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Ticket Description"
            className="Textarea textarea-bordered w-full"
            required
          >
            
          </textarea>

          <button 
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Ticket"}
          </button>
        </form>

        <h2 className="text-xl font-semibold mb-2">
          All Tickets
        </h2>
        <div className="space-y-3">
          {
            // console.log(tickets)
            
            tickets.map((ticket) => (
              <Link
                key={ticket._id}
                className="card shadow-md p-4 bg-base-100 hover:bg-base-200 transition-colors"
                to={`/tickets/${ticket._id}`}
              >
                <h3 className="font-bold text-lg">{ticket.title}</h3>
                <p className="text-sm">{ticket.description}</p>
                <p className="text-sm text-base-content/60">
                  Created At: {new Date(ticket.createdAt).toLocaleString()}
                </p>
              </Link>
            ))
          }
          {tickets.length === 0 && <p>No tickets submitted yet</p>}
        </div>
      </div>
    </>
  )
}

export default Tickets