import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = ({ destination = '/' }) => {
  return (
    <div className='flex'>
      <Link
        to={destination}
        className='bg-white text-indigo-600 border border-indigo-100 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-xl w-fit shadow-sm transition-all duration-200 flex items-center gap-2 group active:scale-95'
      >
        <BsArrowLeft className='text-xl group-hover:-translate-x-1 transition-transform' />
        <span className='font-bold text-sm uppercase tracking-wide'>Back</span>
      </Link>
    </div>
  );
};

export default BackButton;
