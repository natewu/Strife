import React from 'react';
import app from "api/base.js";
import "styles/Sidebar.scss";
import GuildList from "components/GuildList.js";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

export default function Sidebar() {
   return (
      <div className="sidebar">
         <GuildList/>
         <div className="info">
            <GuildInfo/>
            <UserInfo/>
         </div>
      </div>
   )
}

export function GuildInfo(){
   return(
      <div className="guild__info">
         <GuildOptions guildName="Guild"/>
      </div>
   );
}

export function GuildOptions({guildName}){
   return(
      <div className="guild__options">
         <header className="guild__header">
            <h1 className="guild__name">{guildName}</h1>
            <ArrowDropDownIcon/>
         </header>
      </div>
   );
}

export function UserInfo(){
   return(
      <div className="user__info">
         {app.auth().currentUser.email}
      </div>
   )
}

export function SidebarMembers(){
   return(
      <div className="sidebar__members">
         members
      </div>
   );
}

