import React from 'react';
import "styles/Chat.scss";
import {TextField} from "@material-ui/core";
import {Avatar} from "@material-ui/core";

export default function Chat() {
   return (
      <div className="Chat">
         <ChatHeader channelName="general" description="everything basically"/>
         <TextArea channelName="general" description="everything basically."/>
         <UserInput channelName="message #general"/>
      </div>
   )
}

function TextArea({channelName, description}) {
   return (
      <div className="text__area">
         <div className="channel__content">
            <Message message="hi" username="bob" timestamp="1pm"/>
            <Message message="hi 2"/>
            <Message message="hi 3"/>
            <Message message="hi 4"/>
            <Message message="hi 5"/>
            <Message message="hi 6"/>
            <Message message="hi 7"/>
            <Message message="hi 8"/>
            <Message message="hi 9"/>
            <Message message="hi 10"/>
            <Message message="hi 11"/>
            <Message message="hi 12"/>
            <Message message="hi 13"/>
            <Message message="hi 14"/>
            <Message message="hi 15"/>
         </div>
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

function Message({message, username, timestamp}){
   return(
      <div className="message__box">
         <div className="message">
            <Avatar className="Avatar"/>
            <div className="message__info">
               <h4 className="message__user">
                  {username}
                  <span className="message__timestamp">
                     {timestamp}
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

function UserInput({channelName}){
   return (
      <div className="user__input">
         <TextField className="text__input" variant="outlined" label={channelName} fullWidth size="small"/>
      </div>
   );
}