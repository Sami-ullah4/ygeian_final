import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../../features/news/news.action";
import NewsCard from "../../component/newsCard";
import { Link } from "react-router-dom";
import "./index.css";

const Home = () => {
  const [newsData, setNewsData] = useState([]);
  const dispatch = useDispatch();
  const { news, isNews, isNewsLoading } = useSelector((state) => state?.news);

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  useEffect(() => {
    if (isNews) {
      setNewsData(news);
    }
  }, [news, isNews]);

  return (
  <>
   {isNewsLoading ? (
  <div className="flex items-center justify-center h-screen bg-white">
    <div className="relative w-16 h-16">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border-4 border-t-[#43B3E5] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>

      {/* Inner circle */}
      <div className="absolute inset-3 rounded-full border-4 border-[#132D5E] border-t-transparent animate-spin-slow"></div>
    </div>
  </div>
) : (
  <>
    <section className="my-7 flex flex-col gap-4 min-w-[295px] max-w-[500px] mx-auto text-center">
      <h1 className="font-[600] text-[40px] leading-[130%] text-[#002A3C]">
        Stay Ahead in Medicine with Personalized News
      </h1>
      <p className="font-[400] text-[19px] leading-[130%] text-[#375E6C]">
        Get daily updates from your field of expertise, summarized and tailored
        for you.
      </p>

      {!localStorage.getItem("ygeianNewsToken") && (
        <div className="flex flex-row lg:gap-2 m-auto space-x-4">
          <Link
            to="/signup"
            className="py-2.5 px-3 text-white font-[500] text-[16px] leading-[100%] rounded-full bg-[#132D5E]"
          >
            Sign Up for Free
          </Link>
          <Link
            to="/login"
            className="py-2.5 px-3 text-[#43B3E5] font-[500] text-[16px] leading-[100%] border-[1px] border-[#43B3E5] rounded-full"
          >
            Learn More
          </Link>
        </div>
      )}
    </section>

    <NewsCard newsData={newsData} />
  </>
)}

  </>
);

};

export default Home;
