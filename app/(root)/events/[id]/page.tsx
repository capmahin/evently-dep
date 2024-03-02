import { getEventById } from '@/lib/actions/event.actions'
import { SearchParamProps } from '@/types'
import React from 'react'

const EventDetails = async({params:{id}}: SearchParamProps) => {
  const event = await getEventById(id)
  return (
    <section className='flex justify-center bg-primary-50 bg-dotted-pattern bg-contain'>
       <div className='grid grid-cols-1 2xl:max-w-7xl'>

       </div>
    </section>
  )
}

export default EventDetails