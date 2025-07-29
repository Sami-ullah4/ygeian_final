import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import facebook from "../../assets/icons/Vector.png";
import tewitter from "../../assets/icons/X_logo_2023_original 1.png";
import linkedin from "../../assets/icons/linkedin-logo (2) 1.png";
import copy from "../../assets/icons/copy (1) 1.png";
import { getNews } from "../../features/news/news.action";

const ArticleCard = () => {
  const { index } = useParams();
  const { news, isNewsLoading } = useSelector((state) => state?.news);
  const article = news?.[parseInt(index)];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);
  if (isNewsLoading)
    return <h2 className="text-center text-[20px]">Loading...</h2>;
  if (!article)
    return <h2 className="text-center py-10 ">Article not found</h2>;

  return (
    <>
      <div className="min-w-[250px] max-w-[700px] py-5">
        <h1 className="font-[600] text-[40px] leading-[130%] text-[#002A3C]  m-auto pb-5">
          {article.title}
        </h1>
       <p className="font-[400] text-[16px] leading-[150%] text-[#375E6C] py-5">
  {article.description}{" "}
  <a
    href="https://www.medpagetoday.com/popmedicine/cultureclinic/116629"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn more
  </a>
</p>

      </div>

      <div className="flex flex-col gap-[15px]">
        <div className=" flex justify-between items-center  lg:hidden ">
          <div className="flex gap-5">
            <div className="w-[40px] h-[40px] bg-white flex justify-center  rounded-[8px] border-[1px] border-[#D6E0E4]  items-center">
              <img
                src={facebook}
                alt="facebook icons "
                className=" w-[20px] h-[20px]"
              />
            </div>
            <div className="w-[40px] h-[40px] bg-white flex justify-center  rounded-[8px] border-[1px] border-[#D6E0E4]  items-center">
              <img
                src={tewitter}
                alt="facebook icons "
                className=" w-[20px] h-[20px]"
              />
            </div>
            <div className="w-[40px] h-[40px] bg-white flex justify-center  rounded-[8px] border-[1px] border-[#D6E0E4]  items-center">
              <img
                src={linkedin}
                alt="facebook icons "
                className=" w-[20px] h-[20px]"
              />
            </div>
          </div>
          <div className="">
            <button className="w-[100px] md:w-[132px] h-[48px] rounded-[8px] border border-[#D6E0E4] text-[14px] leading-[130%] font-medium flex justify-center items-center gap-2">
              <img
                src={copy}
                alt="facebook icons "
                className=" w-[20px] h-[20px]"
              />
              Copy link
            </button>
          </div>
        </div>
        <img
          src={article?.image}
          alt=""
          className="w-[95%] m-auto md:w-[100%] h-[60vh] lg:h-[76vh] object-cover rounded-[16px]"
        />

        <div className="mt-[-30px] bg-white w-[100%] lg:hidden h-[94px] flex justify-center items-center">
          <div className="flex justify-center gap-2 items-center bg-[#43B3E5] text-white w-[95%] md:w-[70%] m-auto rounded-full h-[50.18px]">
            {/* <FaLinkedin /> */}
            <span className=" text-white  md:w-[214px] h-[26px] font-[600] text-[20px] leading-[130%] ">
              AI Content Summarizer
            </span>
          </div>
        </div>
      </div>

      {/* 2nd div */}
      {/* the dive below the image  */}
      <div className="hidden lg:flex justify-between items-center py-5">
        <div className="flex gap-[60px]">
          <div className="">
            <p className="font-[600] text-[14px] leading-[150%] text-[#96A7AD]">
              Written by
            </p>
            <h1 className="font-[400] text-[16px] leading-[150%] text-[#002A3C]">
              Dr. Emily Johnson, MD, <br />
              Oncology Specialist
            </h1>
          </div>
          <div className="">
            <p className="font-[600] text-[14px] leading-[150%] text-[#96A7AD]">
              Published by
            </p>
            <h1 className="font-[400] text-[16px] leading-[150%] text-[#002A3C]">
              {article.publishedBy}
            </h1>
          </div>
          <div className="">
            <p className="font-[600] text-[14px] leading-[150%] text-[#96A7AD] ">
              Date of publication
            </p>
            <h1 className="font-[400] text-[16px] leading-[150%] text-[#002A3C]">
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </h1>
          </div>
        </div>
        <div className=" flex flex-row-reverse justify-center items-center gap-[10px] ">
          <div className="w-[40px] h-[40px] bg-white flex justify-center  rounded-[8px] border-[1px] border-[#D6E0E4]  items-center">
            {/* <FaFacebookF className="text-[#96A7AD] w-[20px] h-[20px]" /> */}
            <img
              src={facebook}
              alt="facebook icons "
              className=" w-[20px] h-[20px]"
            />
          </div>
          <div className="w-[40px] h-[40px] bg-white flex justify-center  rounded-[8px] border-[1px] border-[#D6E0E4]  items-center">
            <img
              src={tewitter}
              alt="facebook icons "
              className=" w-[20px] h-[20px]"
            />{" "}
          </div>
          <div className="w-[40px] h-[40px] bg-white flex justify-center  rounded-[8px] border-[1px] border-[#D6E0E4]  items-center">
            <img
              src={linkedin}
              alt="facebook icons "
              className=" w-[20px] h-[20px]"
            />{" "}
          </div>
          <div className="">
            <button className="w-[116px] h-[40px] rounded-[8px] border border-[#D6E0E4] text-[14px] leading-[130%] font-medium flex justify-center items-center gap-2">
              <img
                src={copy}
                alt="facebook icons "
                className=" w-[20px] h-[20px]"
              />{" "}
              Copy link
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleCard;
