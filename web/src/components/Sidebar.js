import React, {useState, useEffect} from 'react';
import "styles/Sidebar.scss";
import {db} from "api/base.js";
import {createChannel} from "utils/channels.js";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "redux/reducers/userSlice.js";
import { setChannelInfo } from "redux/reducers/appSlice.js";
//Material UI
import GuildList from "components/GuildList.js";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';
import HeadsetIcon from '@material-ui/icons/Headset';
import MicIcon from '@material-ui/icons/Mic';
import {Avatar} from "@material-ui/core";



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
            <Category categoryName="Text Channels"/>
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

   const dispatch = useDispatch();
   // console.log(id)
   return(
      <div className="channel" 
         onClick={() => {
            dispatch(
               setChannelInfo({
                  channelId: id,
                  channelName: channelName,
               })
            )
         }}>
         <h4 className="channel__name">
            <span className="channel__hash">#</span>
            {channelName}
         </h4>
      </div>
   );
}

export function Category({id, categoryName}){

   const [channels, setChannels] = useState([]);

   useEffect(() => {
      db.collection("channels").onSnapshot((snapshot) => 
         setChannels(
            snapshot.docs.map((doc) => ({
               id: doc.id,
               details: doc.data()
            }))
         )
      )
   }, []);

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
               <AddIcon onClick={() => createChannel()} fontSize="small"/>
            </div>
         </div>
      <div className="category__channels">
         {channels.map(channel => (
            <Channel key={channel.id} id={channel.id} channelName={channel.details.channelName}/>
         ))}
      </div>
   </div>
   );
}

export function UserInfo(){
   const user = useSelector(selectUser);
   return(
      <div className="user__info">
         <Avatar className="user__avatar" src={user.photo}/>
         <div className="user__details">
            <h4 className="username">{user.username}</h4>
            <p className="user__tag">#0001</p>
         </div>
         <div className="user__controlIcons">
            <MicIcon fontSize="small"/>
            <HeadsetIcon fontSize="small"/>
            <SettingsIcon fontSize="small"/>
         </div>
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

