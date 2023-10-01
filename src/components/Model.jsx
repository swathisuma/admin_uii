import React, { useState } from "react";
import "./Model.css";
export default function Modal({ modalClose, onSubmit, defaultValue }) {
  const [form, setForm] = useState(
    defaultValue || {
      name: "",
      email: "",
      role: ""
    }
  );
function handleChange(e) {
  setForm({ ...form, [e.target.name]: e.target.value });
}
function handleSubmit(e) {
  e.preventDefault();
  onSubmit(form); 
  modalClose(); 
}
  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") modalClose();
      }}
    >
      <div className="modal">
        <form action="">
          <div className="form-group">
            <label htmlFor="page">Name</label>
            <input name="name" value={form.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input name="email" value={form.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <input name="role" value={form.role} onChange={handleChange} />
          </div>
          <div className="submit-btn">
            <button className="submit" onClick={handleSubmit} type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
