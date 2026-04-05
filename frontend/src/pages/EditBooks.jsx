import React, { useState , useEffect} from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate , useParams } from 'react-router-dom';

const EditBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState(''); // Fixed spelling
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(() => {
    setLoading(true);
    axios
    .get(`http://localhost:5555/book/${id}`)
    .then((res)=>{
      setAuthor(res.data.author);
      setTitle(res.data.title);
      setPublishYear(res.data.publishYear);
      setLoading(false);
    })
    .catch((error)=>{
      setLoading(false);
      alert('An error occured please check console');
      console.log(error);
    })
    return () => {
    }
  }, [])
  

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear: Number(publishYear), // Ensure this is a Number
    };

    setLoading(true);
    axios
      .put(`http://localhost:5555/book/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        // This log is critical: it shows the backend's specific rejection message
        console.log("Axios Error Response:", error.response?.data);
        alert('An error happened. Check the console for the 400 error details.');
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full mb-4'
          />
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full mb-4'
          />
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)} // Fixed spelling
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8 text-white font-bold' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBooks;
