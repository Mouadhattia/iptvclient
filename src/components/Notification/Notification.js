import { Alert } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNotifications } from '../../store/userSlice'
import "./notification.css"

const Notification = () => {
    const dispatch = useDispatch()
    const { notification: message } = useSelector((state) => state.user);
    const { data:current } =useSelector((state) => state.auth);

    useEffect(() => {
        if(current)
     dispatch(fetchNotifications({role:current.role}))
    
     
    }, [dispatch,current])
   
  return (
    <div className='notifiaction'>
        { message[0]?.message&& current.role==="provider"&&<Alert variant="outlined" severity="warning">
               {message[0]?.message}
      </Alert>}
    </div>
  )
}

export default Notification