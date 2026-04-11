import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBooks = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/book/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book deleted successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error deleting book", { variant: "error" });
        console.log("Axios Error Response:", error.response?.data);
      });
  };

  return (
    // Main Wrapper: adds padding and a light background to the whole page
    <div className="p-8 min-h-screen bg-slate-50 text-slate-900">
      
      {/* Navigation Component */}
      <BackButton />
      
      <div className="max-w-xl mx-auto mt-10">
        <h1 className="text-4xl font-extrabold my-8 text-center tracking-tight">
          Delete <span className="text-rose-600">Book</span>
        </h1>

        {/* Loading Overlay */}
        {loading && <Spinner />}
        
        {/* Main Action Card */}
        <div className="flex flex-col items-center border border-slate-200 rounded-3xl p-10 bg-white shadow-2xl relative overflow-hidden">
          
          {/* Visual Danger Indicator (The Red Bar at the top of the card) */}
          <div className="absolute top-0 left-0 w-full h-2 bg-rose-500"></div>

          {/* Warning Icon Container */}
          <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mb-8 border border-rose-100">
             <span className="text-rose-600 text-5xl font-black">!</span>
          </div>

          <h3 className="text-2xl text-slate-800 mb-8 text-center font-semibold leading-snug">
            Are you sure you want to <br/>
            <span className="text-rose-600 underline decoration-2 underline-offset-4">permanently remove</span> this book?
          </h3>

          <div className="flex flex-col w-full gap-4">
            {/* Primary Action: Delete */}
            <button
              className="p-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl w-full transition-all shadow-lg shadow-rose-200 active:scale-95"
              onClick={handleDeleteBook}
            >
              Confirm Deletion
            </button>
            
            {/* Secondary Action: Cancel */}
            <button
              className="p-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl w-full transition-all active:scale-95"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
          
          <p className="mt-6 text-sm text-slate-400 text-center uppercase tracking-widest font-medium">
            This action cannot be undone
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeleteBooks;