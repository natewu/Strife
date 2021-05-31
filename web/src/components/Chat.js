import React from 'react';
import "styles/Chat.scss";
import {TextField} from "@material-ui/core";

export default function Chat() {
   return (
      <div className="Chat">
         <TextArea/>
         <UserInput channelName="message #general"/>
      </div>
   )
}

function TextArea() {
   return (
      <div className="text__area">
         text area
      </div>
   );
}

function UserInput({channelName}){
   return (
      <div className="user__input">
         <TextField className="text__input" variant="outlined" label={channelName} fullWidth/>
      </div>
   );
}