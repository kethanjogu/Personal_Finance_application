import React from 'react'

import { BarLoader } from "react-spinners";
import Dashboardpage from "./page";
import { Suspense } from "react";

export default function Dashboardlayout (){
  return (

     <div className="px-5">
        <h1 className="text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-purple-600">
  Dashboard
</h1>

      <Suspense
       fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}

      >
        <Dashboardpage />
      </Suspense>
    </div>
   


  );
}

//export default Dashboardlayout ;