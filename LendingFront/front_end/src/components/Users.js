import React, { useState, useEffect, useRef } from "react";

const API = process.env.REACT_APP_API;

export const Users = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company,setCompany] = useState("");
  const [nit, setNit] = useState("");
  const [amount, setAmount] = useState("");
  let [status, setStatus] = useState("");


  const [editing, setEditing] = useState(false);
  const [id, setId] = useState("");

  const nameInput = useRef(null);

  let [users, setUsers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (amount < 50000){
      alert("Kudos to you " +name+ ", your request has been approved!!");
      status = 'Approved';
    }
    if (amount == 50000){
      alert("Dear " +name+ " your request is undecided");
      status = 'undecided';
    }
    if (amount > 50000){
      alert("Sorry " +name+ " your request has been declined...");
      status = 'Declined';
    }
    if (!editing) {
      const res = await fetch(`${API}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          company,
          nit,
          amount,
          status
        }),
      });
      await res.json();
    } else {
      const res = await fetch(`${API}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          company,
          nit,
          amount,
          status
        }),
      });
      const data = await res.json();
      console.log(data);
      setEditing(false);
      setId("");
    }
    await getUsers();

    setName("");
    setEmail("");
    setCompany("");
    setNit("");
    setAmount("");
    setStatus("");
    nameInput.current.focus();
  };

  const getUsers = async () => {
    const res = await fetch(`${API}/users`);
    const data = await res.json();
    setUsers(data);
  };

  const deleteUser = async (id) => {
    const userResponse = window.confirm("Are you sure you want to delete it?");
    if (userResponse) {
      const res = await fetch(`${API}/users/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      await getUsers();
    }
  };

  const editUser = async (id) => {
    const res = await fetch(`${API}/users/${id}`);
    const data = await res.json();

    setEditing(true);
    setId(id);

    // Reset
    setName(data.name);
    setEmail(data.email);
    setCompany(data.company);
    setNit(data.nit);
    setAmount(data.amount);
    setStatus(data.status);
    nameInput.current.focus();
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="row">
      <div className="col-md-4">
        <form onSubmit={handleSubmit} className="card card-body">
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="form-control"
              placeholder="Name"
              ref={nameInput}
              autoFocus
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
              placeholder="User's Email"
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setCompany(e.target.value)}
              value={company}
              className="form-control"
              placeholder="Company Name"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setNit(e.target.value)}
              value={nit}
              className="form-control"
              placeholder="Nit"
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              className="form-control"
              placeholder="Amount"
            />
          </div>
          <button className="btn btn-primary btn-block">
            {editing ? "Update" : "Create"}
          </button>
        </form>
      </div>
      <div className="col-md-6">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Nit</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.company}</td>
                <td>{user.nit}</td>
                <td>{user.amount}</td>
                <td>{user.status}</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm btn-block"
                    onClick={(e) => editUser(user._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm btn-block"
                    onClick={(e) => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};