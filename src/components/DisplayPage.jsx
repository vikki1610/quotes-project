import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../services/api";
import Hero from "./Hero";
import QuoteCard from "./QuoteCard";
import "../styles/Display.css";

const DisplayPage = () => {
  const location = useLocation();
  const latest = location.state;

  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = async () => {
    const res = await API.get("/quotes");
    setQuotes(res.data);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleDelete = async (id) => {
    await API.delete(`/delete/${id}`);
    fetchQuotes();
  };

  return (
    <div>

      {/* Hero Section */}
      {latest && <Hero name={latest.name} quote={latest.quote} />}

      {/* Custom Section */}
      <div className="custom">
        <h2>Inspiration Vault</h2>

        <div className="quote-grid">
  {quotes.map((q) => (
    <QuoteCard key={q.id} data={q} onDelete={handleDelete} />
  ))}
</div>

      </div>

    </div>
  );
};

export default DisplayPage;
