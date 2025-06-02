import { Book } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <Book className='w-32 h-32 animate-ping'  />
    </div>
  )
}
