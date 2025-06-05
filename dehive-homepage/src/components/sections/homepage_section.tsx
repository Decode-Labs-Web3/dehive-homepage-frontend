import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { BsPatchCheckFill } from "react-icons/bs";
import { motion } from "framer-motion";
import Avatar3D from "../3d/Avatar3D";

interface DehiveCardProps {
  dehive: {
    id: string;
    name: string;
    subtitle?: string;
    avatar: string;
    rating: number;
    ratingCount: number;
    members: number;
    price?: string;
    badge?: string;
  };
}

const badgeGlow = {
  Gated: "from-blue-400/60 to-purple-500/60 shadow-blue-400/40",
  Free: "from-green-400/60 to-cyan-400/60 shadow-green-400/40",
};

const DehiveCard: React.FC<DehiveCardProps> = ({ dehive }) => {
  const [show3D, setShow3D] = useState(false);
  const badgeType = dehive.badge === "Gated" ? "Gated" : dehive.badge === "Free" ? "Free" : undefined;
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 60 }}
        whileHover={{ scale: 1.03, boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" }}
        className={
          `relative bg-gradient-to-br from-[#23243a]/80 to-[#18181f]/80 backdrop-blur-xl rounded-2xl px-[2vw] py-[2rem] flex items-center justify-between shadow-2xl min-w-[20rem] max-w-[40vw] w-full border border-white/10 transition-transform duration-300 group overflow-hidden
          md:px-[2.5vw] md:py-[2.5rem] md:max-w-[36vw]
          lg:px-[2vw] lg:py-[2rem] lg:max-w-[32vw]`
          + (badgeType ? ` ring-2 ring-offset-2 ring-${badgeType === "Gated" ? "blue" : "green"}-400/60` : "")
        }
        style={{ boxShadow: "0 4px 32px 0 rgba(31,38,135,0.18)" }}
      >
        {/* Soft gradient glow background */}
        <div className="absolute -inset-1 z-0 rounded-2xl pointer-events-none bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent blur-2xl opacity-60"></div>
        <div className="flex items-center gap-[1.5rem] md:gap-[2vw] z-10">
          <div
            className="bg-[#0e0e10]/80 rounded-xl w-[3.5rem] h-[3.5rem] md:w-[4vw] md:h-[4vw] flex items-center justify-center border border-[#2d2d33] shadow-inner group-hover:shadow-lg transition-all duration-300 overflow-hidden focus:outline-none"
            onMouseEnter={() => setShow3D(true)}
            onMouseLeave={() => setShow3D(false)}
            aria-label="Show 3D Avatar"
            tabIndex={0}
            role="button"
          >
            {!show3D ? (
              <span className="text-[2rem] md:text-[2.5vw] font-extrabold text-white select-none">
                {dehive.avatar}
              </span>
            ) : (
              <Avatar3D letter={dehive.avatar} />
            )}
          </div>
          <div className="flex flex-col">
            <div className="text-[1.1rem] md:text-[1.3vw] font-semibold text-white flex items-center gap-[0.3rem] md:gap-[0.5vw]">
              {dehive.name.includes(".") ? (
                <>
                  {dehive.name.split(".")[0]}.<span className="text-gray-400 font-normal">{dehive.name.split(".")[1]}</span>
                </>
              ) : (
                dehive.name
              )}
              {dehive.badge === "Gated" && (
                <BsPatchCheckFill className="text-blue-400 ml-[0.2rem] md:ml-[0.3vw] animate-pulse" title="Gated Community" />
              )}
              {dehive.badge === "Free" && (
                <span className="ml-[0.2rem] md:ml-[0.3vw] text-green-400 animate-bounce" title="Free Community">●</span>
              )}
            </div>
            {dehive.subtitle && (
              <div className="text-[0.95rem] md:text-[1vw] text-gray-400 mt-[0.2rem] italic">{dehive.subtitle}</div>
            )}
            <div className="flex items-center gap-[1rem] md:gap-[1.2vw] text-[0.95rem] md:text-[1vw] text-gray-400 mt-[0.5rem]">
              <div className="flex items-center gap-[0.2rem] md:gap-[0.3vw]">
                <AiFillStar className="text-yellow-400" />
                {dehive.rating.toFixed(1)} <span className="text-gray-500">({dehive.ratingCount})</span>
              </div>
              <div className="flex items-center gap-[0.2rem] md:gap-[0.3vw]">
                <FaUsers className="text-green-400" />
                {dehive.members}
              </div>
            </div>
          </div>
        </div>
        <div className="z-10">
          {(dehive.price || dehive.badge) && (
            <span
              className={
                `px-[1.2rem] py-[0.5rem] md:px-[1.5vw] md:py-[0.7vw] rounded-full text-[0.95rem] md:text-[1vw] font-semibold flex items-center justify-center whitespace-nowrap shadow-md transition-all duration-300 ` +
                (badgeType
                  ? ` bg-gradient-to-r ${badgeGlow[badgeType]} text-white animate-glow`
                  : "bg-[#23232a] text-[#3de1c9]")
              }
            >
              {dehive.price || dehive.badge}
            </span>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default DehiveCard;