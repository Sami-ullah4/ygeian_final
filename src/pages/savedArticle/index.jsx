import React, { useEffect, useState } from "react";
import { getNews } from "../../features/news/news.action";
import { useDispatch, useSelector } from "react-redux";

const SavedArtical = () => {
  const [savedNews, setSavedNews] = useState([]);
  const [newsData, setNewsData] = useState([]);

  const dispatch = useDispatch();
  const savedData = useSelector((state) => state.auth.user?.userData);
  const { news, isNews, isNewsLoading } = useSelector((state) => state?.news);

  // Filter saved news articles by IDs
  const filterData = newsData.filter(article => savedNews.includes(article._id));

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  useEffect(() => {
    setSavedNews(savedData?.savedNews || []);
    if (isNews) {
      setNewsData(news || []);
    }
  }, [savedData, news, isNews]);

  if (isNewsLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      {filterData.length === 0 ? (
        <p>No saved articles found.</p>
      ) : (
        filterData.map(article => (
  <div
    key={article._id}
    style={{
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "16px",
      width: "300px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
    }}
  >
    <img
      src={article.image}
      alt={article.title}
      style={{ width: "100%", height: "auto", borderRadius: "6px", marginBottom: "12px" }}
    />
    <h3>{article.title}</h3>
    <p>{article.description}</p>
  </div>
))

      )}
    </div>
  );
};

export default SavedArtical;
