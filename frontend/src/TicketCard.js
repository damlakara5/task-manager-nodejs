import React, { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const TicketCard = ({name, description, date, status, category, priority ,id, triggerRender, setTriggerRender}) => {
    const statusClass = {
        "Not started": "bg-danger",
        "Finished": "bg-success",
        "Started": "bg-warning"
    }
    const navigate= useNavigate()

    async function handleDelete (id) {
        const res = await fetch("http://127.0.0.1:3000/tickets/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
              },
            body: JSON.stringify( {
                id
            })
        })
        if(res.ok){
            setTriggerRender(prev => prev + 1); // Trigger a re-render
        }
        else{
            const message = await res.json()
            const m = await message.message
            setTimeout(() =>  navigate("/login"), 1000)
            alert(m)
            
        }
    }

    useEffect(() => {
        // Code to run after state update and re-render
        console.log('');
      }, [triggerRender]); //

  return (
    <div className='d-flex flex-column col align-items-start'>
    <h1 className='text-white'> {category} </h1>
    <div className='bg-secondary py-4 position-relative p-3 text-white text-start rounded' style={{maxWidth: "max-content",maxHeight: "max-content"}}>
       <div className='d-flex flex-items-between align-items-center'>
       {
            [1,2,3,4,5].map(el => (
                <i className={`bi bi-fire me-2`} style={{height: "40px", width: "40px", color: priority>= el ? 'red' : 'grey'}}></i>
            ))
        }
        <button className='bg-transparent border-0 fs-3' onClick={() => handleDelete(id)}>&times;</button>
       </div>
        <h2 className='border-bottom mt-4'> {name} </h2>
        <p> {description} </p>
        <p> {date} </p>
        <div className={`position-absolute end-0 me-4 rounded px-3 py-1 ${statusClass[status]} `}> {status}  </div>
    </div>
    </div>
  )
}

export default TicketCard