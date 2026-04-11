import React from 'react';
import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const BookSingleCard = ({ book }) => {
  return (
    <div
      className='bg-white border border-slate-200 rounded-2xl p-6 relative hover:shadow-2xl transition-all duration-300 group'
    >
      {/* Year Badge - Top Right */}
      <h2 className='absolute top-4 right-4 px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full shadow-sm'>
        {book.publishYear}
      </h2>

      {/* Database ID - Subtle and small */}
      <h4 className='mb-4 text-slate-400 text-[10px] font-mono uppercase tracking-tight'>
        {book._id}
      </h4>

      {/* Title Section */}
      <div className='flex justify-start items-center gap-x-3 mb-3'>
        <div className='p-2 bg-indigo-50 rounded-lg'>
          <PiBookOpenTextLight className='text-indigo-500 text-2xl' />
        </div>
        <h2 className='text-xl font-bold text-slate-800 truncate' title={book.title}>
          {book.title}
        </h2>
      </div>

      {/* Author Section */}
      <div className='flex justify-start items-center gap-x-3 mb-6'>
        <div className='p-2 bg-slate-50 rounded-lg'>
          <BiUserCircle className='text-slate-400 text-2xl' />
        </div>
        <h2 className='text-slate-600 font-medium italic'>{book.author}</h2>
      </div>

      {/* Action Footer */}
      <div className='flex justify-between items-center gap-x-2 mt-4 pt-5 border-t border-slate-100'>
        <Link 
          to={`/books/details/${book._id}`}
          className='p-2 hover:bg-emerald-50 rounded-xl transition-colors'
        >
          <BsInfoCircle className="text-2xl text-emerald-500 hover:text-emerald-700" />
        </Link>
        <Link 
          to={`/books/edit/${book._id}`}
          className='p-2 hover:bg-amber-50 rounded-xl transition-colors'
        >
          <AiOutlineEdit className="text-2xl text-amber-500 hover:text-amber-700" />
        </Link>
        <Link 
          to={`/books/delete/${book._id}`}
          className='p-2 hover:bg-rose-50 rounded-xl transition-colors'
        >
          <MdOutlineDelete className="text-2xl text-rose-500 hover:text-rose-700" />
        </Link>
      </div>
    </div>
  );
};

export default BookSingleCard;