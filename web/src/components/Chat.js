import React, {useEffect, useRef, useState} from 'react';
import firebase from "firebase"
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
// export var setInfiniteScroll = null;
export var loadAmount = 5;

export default function Chat() {
   const channelId = useSelector(selectChannelId);
   const channelName = useSelector(selectChannelName);

   useEffect(() => {
      document.title = channelName !== null ? ("Strife - " + channelName) : ("Strife");
   }, [channelName]);

   return (
      <div className="Chat">
         <ChatHeader channelName={channelName} description="everything basically"/>
         <TextArea id={channelId}/>
         <UserInput channelName={channelName} channelId={channelId}/>
      </div>
   )
}

function AutoScroll({loaded, setLoaded}){
   const autoScroll = useRef();
   // setScrolled(false);
   scrollRef = autoScroll; 
   useEffect(() => {
      if(loaded){
         autoScroll.current.scrollIntoView(/* {behavior:"smooth"} */);
         console.log("scrolled", loaded)
      }
      else{
         console.log("scrolled", loaded)
      }
   }, [loaded]);
   return <div ref={autoScroll}  className="autoscroll"/>;
}

function TextArea({id}) {
   // const [totalMessages, setTotalMessages] = useState([]);
   const [messages, setMessages] = useState([]);
   const autoScroll = useRef();
   const setInfiniteScroll = useRef();
   scrollRef = autoScroll;
   const [loaded, setLoaded] = useState(false);

   const [fetch, setFetch] = useState(false);
   const [fetchIndex, setFetchIndex] = useState(1);
   const [moreMessages, setMoreMessages] = useState(true);

   const loadPrevious = useRef();

   //fetches messages for pagination
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
               }))),
               setFetchIndex(fetchIndex+1, console.log(fetchIndex)),
               setMoreMessages(true)
            );
         
         // setTotalMessages([]);
         // autoScroll.current.scrollIntoView({behavior:"smooth"});

         // useEffect allows us to return a function to run when the effect is cancelled
         return () => {
            setMoreMessages(true);
            setMessages([]);
            setLoaded(false);
            cancel();
         }
      }
   }, [id]);

   useEffect(() => {
      let loadMore = {
         root: null,
         rootMargin: "20px",
         threshold: [0.5]
      }
      //very bad on channel load auto scroll implementation
      let observer = new IntersectionObserver((e) => {
         if(e[0].isIntersecting){
            if(moreMessages){
               // console.log("loading messages", moreMessages);
               setFetchIndex((fetchIndex) => fetchIndex+1);
               // console.log(fetchIndex)
            }
            else{
               console.log("no more messages to load." + moreMessages);
            }
         }
      } , loadMore)

      if(id){
         if(loadPrevious.current){
            observer.observe(loadPrevious.current);
         }  
      }
      return () => {
         if(loadPrevious.current){
            observer.unobserve(loadPrevious.current);
         }
      }
      
   }, [id, moreMessages]);
   
   useEffect(() => {
         if(fetch === true){ console.log("already fetching"); return;}
         
         if(moreMessages){
            if(messages.length > 10){
               setFetch(true);
               var posts = db.collection("channels")
               .doc(id)
               .collection("messages")
               .orderBy("timestamp", "desc")
               
               if(messages.length !== 0){
                  const lastMessage = messages.reverse()[messages.length - 1];
                  posts = posts.startAfter(lastMessage.timestamp);
               }
      
               posts.limit(loadAmount)
               .get().then((snapshot) => {
                  if(snapshot.docs.length === 0){
                     setMoreMessages(false);
                     
                  }
                  setMessages([
                     ...snapshot.docs.reverse().map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                     })),
                     ...messages.reverse()
                  ]);
                  
                  //for debug messages
                  /* snapshot.docs.map((doc) => console.log({
                     id: doc.id,
                     ...doc.data()
                  })) */
               }).then(setFetch(false));
               setInfiniteScroll.current?.scrollIntoView({behavior:"smooth"});
            }
         }
         else{
            console.log("done")
         }
   }, [fetchIndex])

   return (
      <div className="text__area">
         <div ref={loadPrevious} className="load__previous">{/* {totalMessages} */}</div>
         <div className="channel__content" /* onClick={()=>loadMessages()} */>
            {messages.map((message, index) => ( 
               (index === loadAmount) ? (<Message ref={setInfiniteScroll} key={message.id} {...message} message="test"/>)
               : <Message key={message.id} {...message}/>
            ))}
         </div>
         {/* <div ref={autoScroll} className="autoscroll"/> */}
         <AutoScroll loaded={loaded} setLoaded={setLoaded}/>
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