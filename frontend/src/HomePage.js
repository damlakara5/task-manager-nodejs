import React from 'react'
import { NavLink } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>Start to create ticket!

      <NavLink className="text-white text-decoration-none ms-5 fs-4" to="/createTicket">Create Ticket</NavLink>
    </div>
  )
}

export default HomePage