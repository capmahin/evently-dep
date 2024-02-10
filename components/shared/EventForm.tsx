"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

type EventFormProps ={
    userId:string
    type: "Create" | "Update"
}

const EventForm = ({userId, type}: EventFormProps) => {
  return (
    <div>EventForm {type}</div>
  )
}

export default EventForm