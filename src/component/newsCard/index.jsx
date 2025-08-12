import React from "react";
import { Link } from "react-router-dom";
import { CiSaveDown2 } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { toggleSaveNews } from "../../features/news/news.action";

const NewsCard = ({ newsData }) => {
  const dispatch = useDispatch();

  const cardData = newsData.slice(0, 21);

  const handleSaveClick = (_id, e) => {
    e.preventDefault();
    dispatch(toggleSaveNews(_id)); 
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[85%] py-[60px] m-auto">
      {cardData.map((data, index) => {
        const articleId = data._id ;
        const imageSrc = data.image || "";
        const topicImg = data.topic || "";
        const topicText = data.topic;
        const title = data.title;
        const publishedAt = data.publishedAt;
        const message = data.message;
        const like = data.like;
        const file = data.file;
        return (
          <Link key={articleId} to={`/article/${index}`}>
            <div className="flex flex-col bg-white rounded-[16px] border-[1px] overflow-hidden border-[#DBE5E9]">
              <div className="p-2 space-y-3">
                {/* Image */}
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <img
                    src={imageSrc}
                    alt="Card"
                    className="w-full h-full object-cover absolute inset-0"
                  />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={topicImg}
                      alt="company logo"
                      className="w-5 h-5 rounded-full"
                    />
                    <span className="text-sm text-[#375E6C] font-medium">
                      {topicText}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold text-[#002A3C] leading-tight line-clamp-2">
                    {title}
                  </h2>

                  <div className="text-xs text-[#7A929E] font-medium">
                    {publishedAt}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-2">
                  {/* Like/Comment Section */}
                  <div className="flex items-center gap-4 text-[#002A3C]">
                    <div className="flex w-7 h-7 items-center gap-1 hover:text-[#006689] transition-colors">
                      <button className="w-5 h-5 text-[#002A3C]">{message}</button>
                      <span className="text-sm">0</span>
                    </div>
                    <button className="flex items-center gap-1 hover:text-[#006689] transition-colors">
                      {like}
                      <span className="text-sm">2</span>
                    </button>
                  </div>

                  {/* Save/Share/Download */}
                  <div className="flex items-center gap-3 text-[#002A3C]">
                    <button
                      onClick={(e) => handleSaveClick(articleId, e)}
                      className="p-1.5 hover:bg-[#F0F8FB] rounded-lg transition-colors"
                    >
                      <CiSaveDown2 />
                    </button>

                    <button className="p-1.5 hover:bg-[#F0F8FB] rounded-lg transition-colors">
                      {/* Share button placeholder */}
                    </button>

                    <button className="p-1.5 hover:bg-[#F0F8FB] rounded-lg transition-colors">
                      {file}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default NewsCard;
