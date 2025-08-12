import React, { useEffect, useState } from "react";
import specialties from "../../component/spaceilieast_list/spaceiliest_data";
import { useDispatch, useSelector } from "react-redux";
import { preferenceUpdate } from "../../features/user/user.action";
import { resetUpdatePreferenceState } from "../../features/user/user.slice";

const Spaceiliest_add = () => {
  const [clickedBtns, setClickedBtns] = useState([]);
  const [selectedSpaceiliest, setSelectedSpaceiliest] = useState([]);

  const dispatch = useDispatch();

  const handleButtonClick = (specialtyName) => {
    setClickedBtns((prev) =>
      prev.includes(specialtyName)
        ? prev.filter((item) => item !== specialtyName)
        : [...prev, specialtyName]
    );
  };

  const handleSavePreferences = () => {
    if (clickedBtns.length === 0) {
      alert("Please select at least one specialty before saving.");
      return;
    } else {
      dispatch(resetUpdatePreferenceState());
    }
    const payload = {
      specialties: clickedBtns,
    };
    dispatch(preferenceUpdate(payload));
  };
  const saveSpecitilist = useSelector((state) => state.auth.user?.userData);
  useEffect(() => {
    setSelectedSpaceiliest(saveSpecitilist?.specialties || []);
  }, [saveSpecitilist]);

  const selectedButtons = Array.from(
    new Set([...(clickedBtns || []), ...selectedSpaceiliest])
  );
  return (
    <section className="p-6 space-y-8">
      {/* Main Heading */}
      <h1 className="font-[600] text-[32px] leading-[130%] text-[#002A3C]">
        Your Specialties
      </h1>

      {/* Selected Specialties */}
      <div className="space-y-4">
        <h2 className="font-[600] text-[24px] leading-[130%] text-[#002A3C]">
          Selected Specialties
        </h2>
        <div className="flex flex-wrap gap-2">
          {selectedButtons.length > 0 ? (
            selectedButtons.map((btn, i) => (
              <button
                key={i}
                className="rounded-full border-[1px] border-[#43B3E5] text-[#43B3E5] font-[400] text-[14px] leading-[130%] px-3 py-1 hover:bg-[#E5F5FF] transition-colors duration-200"
              >
                {btn}
              </button>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No specialties selected</p>
          )}
        </div>
      </div>

      {/* Add More Specialties */}
      <div className="space-y-4">
        <h2 className="font-[600] text-[24px] leading-[130%] text-[#002A3C]">
          Add More
        </h2>
        <div className="flex flex-wrap gap-2">
          {specialties.map((item, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(item.specialties)}
              className={`rounded-full border-[1px] px-3 py-1 font-[400] text-[14px] leading-[130%] transition-colors duration-200 
                ${
                  clickedBtns.includes(item.specialties)
                    ? "bg-[#43B3E5] text-white"
                    : "bg-[#E5F5FF] text-[#43B3E5]"
                }`}
            >
              {item.specialties}
            </button>
          ))}
        </div>
      </div>

      {/* Last Section */}
      <div className="flex justify-between">
        <button className="text-[16px] font-[600] leading-[150%] text-[#FF3535]">
          Delete All
        </button>
        <div className="flex flex-row gap-3">
          <button
            onClick={handleSavePreferences}
            className="px-3 bg-[#002A3C] rounded-full text-white text-[16px] font-[600] leading-[150%]"
          >
            Save Preferences
          </button>
          <button className="px-3 py-2 border-[1px] rounded-full text-[#43B3E5] text-[16px] font-[600] leading-[150%]">
            Reset
          </button>
        </div>
      </div>
    </section>
  );
};

export default Spaceiliest_add;
