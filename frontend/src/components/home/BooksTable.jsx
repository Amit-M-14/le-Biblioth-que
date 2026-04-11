import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const BooksTable = ({ books }) => {
  return (
    // Outer container for rounded corners and shadow
    <div className='overflow-hidden border border-slate-200 rounded-2xl shadow-lg bg-white'>
      <table className='w-full text-left border-collapse'>
        <thead>
          <tr className='bg-slate-50 border-b border-slate-200'>
            <th className='px-6 py-4 text-sm font-bold uppercase tracking-wider text-slate-500'>No.</th>
            <th className='px-6 py-4 text-sm font-bold uppercase tracking-wider text-slate-500'>Title</th>
            <th className='px-6 py-4 text-sm font-bold uppercase tracking-wider text-slate-500 max-md:hidden'>Author</th>
            <th className='px-6 py-4 text-sm font-bold uppercase tracking-wider text-slate-500 max-md:hidden'>Year</th>
            <th className='px-6 py-4 text-sm font-bold uppercase tracking-wider text-slate-500 text-center'>Operations</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-slate-100'>
          {books.map((book, index) => (
            <tr 
              key={book._id} 
              className='hover:bg-indigo-50/30 transition-colors duration-200 group'
            >
              <td className='px-6 py-4 text-slate-500 font-medium'>{index + 1}</td>
              <td className='px-6 py-4 text-slate-800 font-bold'>{book.title}</td>
              <td className='px-6 py-4 text-slate-600 max-md:hidden'>{book.author}</td>
              <td className='px-6 py-4 text-slate-600 max-md:hidden'>{book.publishYear}</td>
              <td className='px-6 py-4'>
                <div className='flex justify-center gap-x-6'>
                  <Link to={`/books/details/${book._id}`}>
                    <BsInfoCircle className='text-xl text-emerald-500 hover:text-emerald-700 transition-transform hover:scale-125' />
                  </Link>
                  <Link to={`/books/edit/${book._id}`}>
                    <AiOutlineEdit className='text-xl text-amber-500 hover:text-amber-700 transition-transform hover:scale-125' />
                  </Link>
                  <Link to={`/books/delete/${book._id}`}>
                    <MdOutlineDelete className='text-xl text-rose-500 hover:text-rose-700 transition-transform hover:scale-125' />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;