import React from 'react'
import app, {db} from "api/base.js";
import "styles/App.scss";
import Sidebar, {SidebarMembers} from "components/Sidebar.js";
import Chat from "components/Chat.js";

export default function App() {
   return (
      <div className="App" style={{color:"black"}}>
         <Sidebar/>
         <Chat/>
         <SidebarMembers/>
      </div>
   )
}
