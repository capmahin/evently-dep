"use client"

type EventFormProps ={
    userId:string
    type: "Create" | "Edit"
}

const EventForm = ({userId, type}: EventFormProps) => {
  return (
    <div>EventForm</div>
  )
}

export default EventForm