import { getEventById } from '@/lib/actions/event.actions'
import { SearchParamProps } from '@/types'
import React from 'react'

const EventDetails = async({params:{id}}: SearchParamProps) => {
  const event = await getEventById(id)
  return (
    <section className='flex justify-center bg-primary-50 bg-dotted-pattern bg-contain'>
       
    </section>
  )
}

export default EventDetails