import axios from "axios";
import { useState } from "react";

const AddBook = () => {
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === ""
      ) {
        alert("All the fields are required");
        return;
      }

      const response = await axios.post(
        "http://localhost:8000/api/v1/add-book",
        Data,
        { headers }
      );

      alert(response.data.message);

      
      setData({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: "",
      });
    } catch (error) {
      console.error("Error adding book:", error);
      alert(error.response?.data?.message || "Failed to add book. Please try again.");
    }
  };

  return (
    <>
      <div className="h-[100%] p-0 md:p-4">
        <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">Add Book</h1>
        <div className="p-4 bg-zinc-800 rounded">
          <div>
            <label className="text-zinc-400">Image</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Enter book image URL"
              name="url"
              required
              value={Data.url}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label className="text-zinc-400">Title of book</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Title of book"
              name="title"
              required
              value={Data.title}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label className="text-zinc-400">Author of book</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Enter the author of the book"
              name="author"
              required
              value={Data.author}
              onChange={change}
            />
          </div>
          <div className="mt-4 flex gap-4">
            <div className="w-3/6">
              <label className="text-zinc-400">Language</label>
              <input
                type="text"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                placeholder="Enter the language"
                name="language"
                required
                value={Data.language}
                onChange={change}
              />
            </div>
            <div className="w-3/6">
              <label className="text-zinc-400">Price of book</label>
              <input
                type="number"
                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                placeholder="Enter the price of the book"
                name="price"
                required
                value={Data.price}
                onChange={change}
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="text-zinc-400">Description of book</label>
            <textarea
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              rows="5"
              placeholder="Description of the book"
              name="desc"
              required
              value={Data.desc}
              onChange={change}
            />
          </div>
          <button
            className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-600"
            onClick={submit}
          >
            Add Book
          </button>
        </div>
      </div>
    </>
  );
};

export default AddBook;
