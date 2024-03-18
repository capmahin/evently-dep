"use client"


import Image from 'next/image';
import { useState } from 'react'
import { Input } from '../ui/input';

const Search = () => {
    const [query, setQuery] = useState('');
  return (
    <div className='flex-center min-h-[54px] w-full overflow-hidden rounded-full
    bg-grey-50 px-4 py-2'>
        
      <Image src="/assets/icons/search.svg" alt='search' width={24}
      height={24}/>
      <Input
      type='text'
      placeholder='Search'
      onChange={(e)=> setQuery(e.target.value)}
      />
    </div>
  )
}

export default Search