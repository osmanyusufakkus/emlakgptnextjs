"use client"

import { useState } from "react";
import Search from "./components/navbar/Search";
import ShowResult from "./components/ShowResult";


const ParentComponent = () => {
  return (
    <div>
      <ShowResult/>
    </div>
  );
};

export default ParentComponent;
