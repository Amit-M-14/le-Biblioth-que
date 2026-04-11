import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton.jsx';
import Spinner from '../components/Spinner.jsx'; // Fixed absolute path to relative path

const ShowBooks = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/book/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    // Page container with consistent padding and background
    <div className='p-8 min-h-screen bg-slate-50'>
      <BackButton />
      
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-4xl font-extrabold my-8 text-slate-800 tracking-tight text-center'>
          Book <span className='text-indigo-600'>Details</span>
        </h1>

        {loading ? (
          <Spinner />
        ) : (
          // Main Detail Card
          <div className='bg-white border border-slate-200 rounded-3xl p-8 shadow-xl relative overflow-hidden'>
            
            {/* Top accent bar */}
            <div className='absolute top-0 left-0 w-full h-2 bg-indigo-500'></div>

            {/* Book ID Tag */}
            <div className='mb-8 flex justify-between items-center border-b border-slate-100 pb-4'>
              <span className='text-xs font-bold uppercase tracking-widest text-slate-400'>Database Record</span>
              <span className='text-xs font-mono bg-slate-100 text-slate-500 px-3 py-1 rounded-full'>{book._id}</span>
            </div>

            {/* Info Sections */}
            <div className='space-y-6'>
              <div className='flex flex-col'>
                <span className='text-sm font-semibold text-indigo-500 uppercase tracking-wide'>Title</span>
                <span className='text-2xl font-bold text-slate-800'>{book.title}</span>
              </div>

              <div className='flex flex-col'>
                <span className='text-sm font-semibold text-indigo-500 uppercase tracking-wide'>Author</span>
                <span className='text-xl text-slate-700 font-medium'>{book.author}</span>
              </div>

              <div className='flex flex-col'>
                <span className='text-sm font-semibold text-indigo-500 uppercase tracking-wide'>Publish Year</span>
                <span className='text-lg text-slate-600'>{book.publishYear}</span>
              </div>

              {/* Timestamps Section */}
              <div className='mt-10 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='flex flex-col'>
                  <span className='text-xs font-bold text-slate-400 uppercase tracking-tighter'>Date Created</span>
                  <span className='text-sm text-slate-500'>{new Date(book.createdAt).toLocaleString()}</span>
                </div>
                <div className='flex flex-col'>
                  <span className='text-xs font-bold text-slate-400 uppercase tracking-tighter'>Last Updated</span>
                  <span className='text-sm text-slate-500'>{new Date(book.updatedAt).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowBooks;