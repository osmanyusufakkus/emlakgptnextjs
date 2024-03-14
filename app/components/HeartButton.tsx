"use client"

import { AiOutlineHeart } from "react-icons/ai"

const HeartButton = () => {
  return (
    <div className="relative hover:opacity-80 transition cursor-pointer">
        <AiOutlineHeart className="fill-white absolute -top-[2px] -right-[2px]"/>
    </div>
  )
}

export default HeartButton