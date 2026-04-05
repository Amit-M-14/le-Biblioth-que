import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import BackButton from '../components/BackButton.jsx';
import Spinner from 'c:/Users/Amit/Desktop/MERN/Bookstore/frontend/src/components/Spinner.jsx';

const ShowBooks = () => {
  const [book, setBook] = useState({})
  const [loading, setLoading] = useState(false)
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
    .get(`http://localhost:5555/book/${id}`)
    .then((res)=>{
      setBook(res.data);
      setLoading(false);
    })
    .catch((error)=>{
      console.log(error);
      setLoading(false);
    })
    return () => {
    }
  }, [])
  
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text=3xl my-4 '>Show Book</h1>
      {loading ? (<Spinner/>)
      : (
      <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-fit p-4'>
        <div className='my-4'>
          <spam className='text-xl mr-4 text-grey-500'>Id</spam>
          <spam>{book._id}</spam>
        </div>
        <div className='my-4'>
          <spam className='text-xl mr-4 text-grey-500'>Title</spam>
          <spam>{book.title}</spam>
        </div>
        <div className='my-4'>
          <spam className='text-xl mr-4 text-grey-500'>Author</spam>
          <spam>{book.author}</spam>
        </div>
        <div className='my-4'>
          <spam className='text-xl mr-4 text-grey-500'>Publish Year</spam>
          <spam>{book.publishYear}</spam>
        </div>
        <div className='my-4'>
          <spam className='text-xl mr-4 text-grey-500'>Create Time</spam>
          <spam>{new Date(book.createdAt).toString()}</spam>
        </div>
        <div className='my-4'>
          <spam className='text-xl mr-4 text-grey-500'>Last Updated Time</spam>
          <spam>{new Date(book.updatedAt).toString()}</spam>
        </div>
      </div>
    )}
    </div>
  )
}

export default ShowBooks
