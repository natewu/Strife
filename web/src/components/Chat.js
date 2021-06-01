import React from 'react';
import "styles/Chat.scss";
import {TextField} from "@material-ui/core";

export default function Chat() {
   return (
      <div className="Chat">
         <TextArea channelName="general" description="everything basically."/>
         <UserInput channelName="message #general"/>
      </div>
   )
}

function TextArea({channelName, description}) {
   return (
      <div className="text__area">
         <div className="channel__info">
            <h2>{channelName}</h2>
            <p>{description}</p>
            <div className="spacer"/>
            <div className="search">search</div>
         </div>
         <div className="channel__content">
            posts
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