import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksCard from "../components/home/BooksCard";
import BooksTable from "../components/home/BooksTable";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/book")
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching books:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen bg-slate-50">
      {/* View Toggle Section */}
      <div className="flex justify-center items-center gap-x-6 mb-10">
        <button
          className={`${
            showType === 'table' 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          } px-8 py-2 rounded-full font-bold transition-all active:scale-95`}
          onClick={() => setShowType('table')}
        >
          Table View
        </button>
        <button
          className={`${
            showType === 'card' 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          } px-8 py-2 rounded-full font-bold transition-all active:scale-95`}
          onClick={() => setShowType('card')}
        >
          Card View
        </button>
      </div>

      {/* Header Section */}
      <div className="flex justify-between items-center mb-8 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
            Book <span className="text-indigo-600">Collection</span>
          </h1>
          <p className="text-slate-500 mt-1 font-medium">Manage your personal library</p>
        </div>
        
        <Link to="/books/create" title="Add new book">
          <div className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-2xl shadow-lg shadow-emerald-100 transition-all active:scale-95">
            <MdOutlineAddBox className="text-2xl" />
            <span className="font-bold">Add Book</span>
          </div>
        </Link>
      </div>

      {/* Main Content Area */}
      <div className="transition-opacity duration-500">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        ) : showType === 'table' ? (
          <BooksTable books={books} />
        ) : (
          <BooksCard books={books} />
        )}
      </div>

      {/* Empty State Helper */}
      {!loading && books.length === 0 && (
        <div className="text-center mt-20">
          <p className="text-slate-400 text-lg italic">Your library is currently empty.</p>
        </div>
      )}
    </div>
  );
};

export default Home;