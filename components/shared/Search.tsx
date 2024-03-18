"use client"


import Image from 'next/image';
import { useState } from 'react'

const Search = () => {
    const [query, setQuery] = useState('');
  return (
    <div className='flex-center min-h-[54px] w-full overflow-hidden rounded-full
    bg-grey-50 px-4 py-2'>
        
      <Image src="/assets/icons/search.svg" alt='search'/>
    </div>
  )
}

export default Search