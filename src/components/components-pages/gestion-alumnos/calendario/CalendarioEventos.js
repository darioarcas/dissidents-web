import React from 'react'

export const CalendarioEventos = ({event}) => {
    const {title, name} = event;
  return (
    <div>
      <p>{title}</p>
    </div>
  )
}
