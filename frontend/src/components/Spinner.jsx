import React from 'react'

const Spinner = () => {
  return (
    <div className='flex justify-center items-center w-full py-10'>
      {/* Main Spinning Ring */}
      <div className='relative'>
        {/* Inner static circle for depth */}
        <div className='w-16 h-16 rounded-full border-4 border-slate-100'></div>
        
        {/* The actual spinning part */}
        <div className='absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-t-indigo-600 border-r-transparent border-b-transparent border-l-transparent animate-spin'></div>
      </div>
      
      {/* Optional: Hidden text for accessibility */}
      <span className='sr-only'>Loading...</span>
    </div>
  )
}

export default Spinner