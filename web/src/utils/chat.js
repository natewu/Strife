import app, { db } from "api/base";
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
      })
   }
   else{
      console.log("empty message");
   }
}