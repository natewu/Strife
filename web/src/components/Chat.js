import React, {useEffect, useRef, useState} from 'react';
import "styles/Chat.scss";
import {sendMessage} from "utils/chat.js";

//Redux
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "redux/reducers/appSlice.js";

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
   const [mapped, setMapped] = useState(false);
   const autoScroll = useRef();
   scrollRef = autoScroll; 

   const [fetch, setFetch] = useState(false);
   const [moreMessages, setMoreMessages] = useState(true);

   const loadPrevious = useRef();

   let loadMore = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
   }

   function loadMessages(){
      if(fetch === true){ console.log("already fetching"); return;}
      
      if(messages.length > 10){
         setFetch(true);
         console.log("fetching " +id);
         var posts = db.collection("channels")
         .doc(id)
         .collection("messages")
         .orderBy("timestamp", "desc")
         
         if(messages.length !== 0){
            console.log(messages.length)
            const lastMessage = messages[messages.length - 1];
            posts = posts.startAfter(lastMessage);
         }

         posts.limit(5)
         .get().then((snapshot) => {
            if(snapshot.docs.length === 0){
               setMoreMessages(false);
            }
            setMessages(
               snapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data()
            })))
         }).then(setFetch(false));
      }
   }

/*    function checkScroll(e){
      console.log("hello")
      let bottom = (
         ((e.scrollHeight - e.scrollTop) === e.clientHeight) 
         && (fetch === false) 
         && (moreMessages === true)
      );
      if(bottom){
         console.log("bottom")
         loadMessages();
      } 
   }
 */
   useEffect(() => {
      if(id !== null ){
         // the return value of onSnapshot is a function that cancels the listener
         const cancel = db.collection("channels")
            .doc(id)
            .collection("messages")
            .orderBy("timestamp", "desc")
            .limit(15)
            .onSnapshot((snapshot) => 
               setMessages(
               snapshot.docs.reverse().map((doc) => ({
                  id: doc.id,
                  ...doc.data()
               }))
               )
            )
         autoScroll.current.scrollIntoView({behavior:"smooth"});
         // useEffect allows us to return a function to run when the effect is cancelled
         return () => cancel()
      }
      else{
        console.log("no messages");
      }   
   }, [id]);

   //very bad on channel load auto scroll implementation
   useEffect(() => {
      if(id){
         // autoScroll.current.scrollIntoView();
         // console.log(messages.length)

         let observer = new IntersectionObserver(() => loadMessages() , loadMore)
         // observer.observe(document.querySelector(".loadPrevious"));
         
      }
   }, [id]);
   
   return (
      <div className="text__area">
         <div ref={loadPrevious} className="loadPrevious"/>
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