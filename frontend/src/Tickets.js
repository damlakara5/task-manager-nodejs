import React, { useEffect, useState } from 'react'
import TicketCard from './TicketCard'
import { NavLink } from 'react-router-dom'

const Tickets = () => {
    const [data, setData] = useState()
    const [triggerRender, setTriggerRender] = useState(0);

    useEffect(() => {
        async function fetchTicket () {
            const res = await  fetch("http://127.0.0.1:3000/tickets")
            const data = await res.json()
            setData(data)
        }
        fetchTicket()
    }, [triggerRender])

  return (
    <div className='ticket-container p-5 grid container gap-3'>
        <div className='row'>
        {
           data?.tickets.map(ticket => (
                <TicketCard 
                    id={ticket._id} 
                    name={ticket.name} 
                    description={ticket.description} 
                    date={ticket.createdAt} 
                    status={ticket.status}  
                    category={ticket.category} 
                    priority={ticket.priority} 
                    triggerRender={triggerRender}
                    setTriggerRender={setTriggerRender}
                />
            )) 
        }
        </div>
        {
            data?.tickets.length === 0 && <h1 className='text-white'>There is no ticket.Please create one!</h1>
        }
        <div className='row'>
        <NavLink to="/createTicket" className="text-white text-decoration-none mt-5">Create Ticket</NavLink>
        </div>
    </div>
  )
}

export default Tickets