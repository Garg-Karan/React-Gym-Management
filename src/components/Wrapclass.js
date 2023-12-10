import React from 'react'
import { useLocation } from 'react-router-dom'
import Updatemember from './Updatemember';

export default function Wrapclass() {
    const location = useLocation();
    console.log(location.state.memberId.id);

  return (
    <div>
      <Updatemember memberId={location.state.memberId.id}></Updatemember>
    </div>
  )
}
