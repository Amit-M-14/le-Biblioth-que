import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/book/${id}`)
      .then((res) => {
        setAuthor(res.data.author);
        setTitle(res.data.title);
        setPublishYear(res.data.publishYear);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error fetching book details", { variant: "error" });
        console.log(error);
      });
  }, [id]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear: Number(publishYear),
    };

    if (!title || !author || !publishYear) {
      enqueueSnackbar('Please fill all fields', { variant: 'warning' });
      return;
    }

    setLoading(true);
    axios
      .put(`http://localhost:5555/book/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book updated successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error editing book", { variant: "error" });
        console.log("Axios Error Response:", error.response?.data);
      });
  };

  return (
    <div className="p-8 min-h-screen bg-slate-50">
      <BackButton />
      
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-extrabold my-8 text-slate-800 tracking-tight text-center">
          Edit <span className="text-indigo-600">Book</span>
        </h1>

        {loading && <Spinner />}

        <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-xl relative overflow-hidden">
          {/* Top indigo accent bar */}
          <div className="absolute top-0 left-0 w-full h-2 bg-indigo-500"></div>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2 block">
                Book Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Update title"
                className="w-full px-5 py-3 rounded-2xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2 block">
                Author Name
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Update author"
                className="w-full px-5 py-3 rounded-2xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-2 block">
                Publish Year
              </label>
              <input
                type="number"
                value={publishYear}
                onChange={(e) => setPublishYear(e.target.value)}
                placeholder="Update year"
                className="w-full px-5 py-3 rounded-2xl border border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              />
            </div>

            <button
              className="w-full mt-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 transition-all transform active:scale-95"
              onClick={handleEditBook}
            >
              Update Information
            </button>
          </div>
          
          <p className="mt-6 text-xs text-slate-400 text-center uppercase tracking-widest">
            Editing ID: {id}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditBooks;