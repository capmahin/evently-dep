"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'

type PaginationProps ={
  page: number | string,
  totalPages: number,
  urlParamName?: string

}

const Pagination = ({page, totalPages, urlParamName}:
  PaginationProps
) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const onClick = (btnType: string)=>{

  }
  return (
    <div className='flex gap-2'>
      <Button>
        Previous
      </Button>
    </div>
  )
}

export default Pagination