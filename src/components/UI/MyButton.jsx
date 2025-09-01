import React from 'react'

const MyButton = ({children, ...props}) => {
  return (
    <button {...props} className='
        font-medium 
        px-6 
        py-2 
        bg-zinc-700 
        border-2 
        border-gray-800 
        border-solid
        hover:text-white 
        hover:bg-zinc-900
        w-full'
    >
        {children}
    </button>
  )
}

export default MyButton