import app, { db } from "api/base";
import { scrollRef } from "components/Chat";
import firebase from "firebase"

export async function sendMessage(e, message, channelId, user, handleInput){

   e.preventDefault();

   if(message !== ""){
      await db.collection("channels")
      .doc(channelId)
      .collection("messages")
      .add({
         message: message,
         user: {
            username: user.username,
            photo: user.photo,
            uid: user.uid
         },
         timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).catch(err => {
         console.log(err);
      }).then(() => {
         handleInput("");
         scrollRef.current.scrollIntoView({behavior:"smooth"});
      })
   }
   else{
      console.log("empty message");
   }
}