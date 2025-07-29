import React from "react";
import { Link } from "react-router-dom";

const NewsCard = ({ newsData }) => {
  const cardData = newsData.slice(0, 21);
  return (
    <>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[85%] py-[60px] flex-col m-auto`}
      >
        {cardData.map((data, index) => (
          <Link key={data.id || index} to={`/article/${index}`}>
            <div className="flex flex-col bg-white rounded-[16px] border-[1px] overflow-hidden border-[#DBE5E9]">
              <div className="p-2 space-y-3">
                {/* Image Container */}
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <img
                    src={data.image || null}
                    alt="Card"
                    className="w-full h-full object-cover absolute inset-0"
                  />
                </div>

                {/* Content Section */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={data.topic || null}
                      alt="company logo"
                      className="w-5 h-5 rounded-full"
                    />
                    <span className="text-sm text-[#375E6C] font-medium">
                      {data.topic}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold text-[#002A3C] leading-tight line-clamp-2 overflow-hidden">
                    {data.title}
                  </h2>

                  <div className="text-xs text-[#7A929E] font-medium">
                    {data.publishedAt}{" "}
                  </div>
                </div>

                {/* Action Icons */}
                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center gap-4 text-[#002A3C]">
                    <div className="flex w-7 h-7 items-center gap-1 hover:text-[#006689] transition-colors">
                      <button className="w-5 h-5 text-[#002A3C]">
                        {data.message}
                      </button>
                      <span className="text-sm">0</span>
                    </div>
                    <button className="flex items-center gap-1 hover:text-[#006689] transition-colors">
                      {data.like}
                      <span className="text-sm">2</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-[#002A3C]">
                    <button className="p-1.5 hover:bg-[#F0F8FB] rounded-lg transition-colors">
                      {data.save}
                    </button>
                    <button className="p-1.5 hover:bg-[#F0F8FB] rounded-lg transition-colors">
                      {/* <GoShareAndroid /> */}
                    </button>
                    <button className="p-1.5 hover:bg-[#F0F8FB] rounded-lg transition-colors">
                      {data.file}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default NewsCard;
