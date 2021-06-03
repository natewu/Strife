import React from 'react';
import app from "api/base.js";
import "styles/Sidebar.scss";
import GuildList from "components/GuildList.js";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
         <div className="guild__channels">
            <Category categoryName="Text Channels" channels={<Channel channelName="General"/>}/>
         </div>
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

export function Channel({id, channelName}){
   return(
      <div className="channel">
         <h4 className="channel__name">
            <span className="channel__hash">#</span>
            {channelName}
         </h4>
      </div>
   );
}

export function Category({id, categoryName}){
   return(
      <div className={"category__container"}>
         <div className="category">
            <div className="category__header">
               <div className="category__expand">
                  <ExpandMoreIcon fontSize="small" height="24px" width="24px"/>
               </div>
               <h5 className="category__name">{categoryName}</h5>
            </div>
            <div className="category__add">
               <AddIcon fontSize="small"/>
            </div>
         </div>
      <div className="category__channels">
         <Channel channelName="general"/>
         <Channel channelName="general2"/>
         <Channel channelName="general3"/>
      </div>
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

