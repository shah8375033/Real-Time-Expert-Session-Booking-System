import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 3;

const ExpertsList = () => {
  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};
  const [experts, setExperts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    fetchExperts();
  }, []);

  const fetchExperts = async () => {
    try {
      const data = await api.getExperts();
      setExperts(data);
      setFiltered(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Search & Filter
  useEffect(() => {
    let result = experts;

    if (search) {
      result = result.filter((exp) =>
        exp.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      result = result.filter((exp) => exp.category === category);
    }

    setFiltered(result);
    setCurrentPage(1);
  }, [search, category, experts]);

  // Pagination
  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
  const currentExperts = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <h2>Experts</h2>
  <button onClick={handleLogout}>Logout</button>
</div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginRight: "10px", padding: "8px" }}
      />

      {/* Category Filter */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ padding: "8px" }}
      >
        <option value="">All Categories</option>
        <option value="Web Development">Web Development</option>
        <option value="Data Science">Data Science</option>
        <option value="Mobile Development">Mobile Development</option>
        <option value="UI/UX Design">UI/UX Design</option>
        <option value="DevOps">DevOps</option>
      </select>

      {/* Experts List */}
      <div style={{ marginTop: "20px" }}>
        {currentExperts.map((exp) => (
          <div
            key={exp._id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{exp.name}</h3>
            <p>Category: {exp.category}</p>
            <p>Experience: {exp.experience} years</p>
            <p>Rating: ⭐ {exp.rating}</p>

            <button
              onClick={() => navigate(`/experts/${exp._id}`)}
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                cursor: "pointer",
              }}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div style={{ marginTop: "20px" }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              marginRight: "5px",
              padding: "6px 10px",
              background: currentPage === i + 1 ? "#333" : "#eee",
              color: currentPage === i + 1 ? "#fff" : "#000",
              border: "none",
              cursor: "pointer",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Navigate to My Bookings */}
      <button
        onClick={() => navigate("/my-bookings")}
        style={{ marginTop: "20px", padding: "8px 12px" }}
      >
        View My Bookings
      </button>
    </div>
  );
};

export default ExpertsList;
