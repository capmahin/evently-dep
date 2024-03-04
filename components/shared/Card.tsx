import { IEvent } from '@/lib/database/models/event.model'
import React from 'react'

type CardProps = {
    event: IEvent,
    hasOrderLink?: boolean,
    hidePrice?: boolean
  }

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  return (
    <div>Card</div>
  )
}

export default Card