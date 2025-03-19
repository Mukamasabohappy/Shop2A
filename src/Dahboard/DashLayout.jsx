import React from "react";
import DashSidebar from './DashSidebar.jsx';
import DashNav from './DashNav.jsx';
import { Outlet } from "react-router-dom";

function DashLayout(){
    return(
      <div>
        <DashNav/>
            <DashSidebar/>
            <Outlet/>
        
      </div>    
    )
}

export default DashLayout;