import React, {useEffect, useRef, useState} from 'react';
import "styles/Chat.scss";
import {sendMessage} from "utils/chat.js";

//Redux
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName, setScrollRef } from "redux/reducers/appSlice.js";

//Material UI
import {TextField} from "@material-ui/core";
import {Avatar} from "@material-ui/core";
import { db } from "api/base";
import { selectUser } from "redux/reducers/userSlice";

export var scrollRef = null;

export default function Chat() {

   const channelId = useSelector(selectChannelId);
   const channelName = useSelector(selectChannelName);

   useEffect(() => {
      document.title = "Strife - " + channelName;
   }, [channelName]);

   return (
      <div className="Chat">
         <ChatHeader channelName={channelName} description="everything basically"/>
         <TextArea id={channelId}/>
         <UserInput channelName={channelName} channelId={channelId}/>
      </div>
   )
}

function TextArea({id}) {

   const [messages, setMessages] = useState([]);
   const autoScroll = useRef();
   scrollRef = autoScroll; 

   useEffect(() => {
      if(id !== null ){
         db.collection("channels")
         .doc(id)
         .collection("messages")
         .orderBy("timestamp", "asc")
         .onSnapshot((snapshot) => 
            setMessages(
               snapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data()
               }))
            )
         );
      }
      else{
         console.log("no messages");
      }   
      
   }, [id]);

   return (
      <div className="text__area">
         <div className="channel__content">
            {messages.map(message => ( 
               <Message key={message.id} {...message}/>
            ))}
         </div>
         <div ref={autoScroll} className="autoscroll"/>
      </div>
   );
}

function ChatHeader({channelName, description}){
   return (
      <div className="chat__header">
         <div className="channel__info">
            <h3 className="channel__name">
               <span className="channel__hash">#</span>
               {channelName}
            </h3>
            <p className="channel__description">{description}</p>
         </div>
         <div className="spacer"/>
         <div className="channel__tools">
            <div className="search">
               <input placeholder="search"/>
            </div>
         </div>
      </div>
   );  
}

function Message({message, user, timestamp}){
   return(
      <div className="message__box">
         <div className="message">
            <Avatar className="Avatar" src={user.photo}/>
            <div className="message__info">
               <h4 className="message__user">
                  {user.username}
                  <span className="message__timestamp">
                     {new Date(timestamp?.toDate()).toLocaleString()}
                  </span>
               </h4>
               <p className="message__content">
                  {message}
               </p>
            </div>
         </div>
         <div className="message__options">
            options
         </div>
      </div>
   );
}

function UserInput({channelName, channelId}){

   const [input, setInput] = useState("");
   const user = useSelector(selectUser);

   return (
      <form className="user__input">
         <TextField className="text__input" variant="outlined" size="small" fullWidth  
            value={input}
            label={channelName !== null ? (`message #${channelName}`) : "Select a channel"}  
            disabled={channelName !== null ? false : true}
            onChange={(e) => setInput(e.target.value)}
         />
         <button className="text__sendMessage" style={{display:"none"}} type="submit"
            disabled={channelName !== null ? false : true}
            onClick={(e) => sendMessage(e, input, channelId, user, setInput)}
         />
      </form>
   );
}