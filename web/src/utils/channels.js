import {db} from "api/base.js";

export async function createChannel(){
   const channelName = prompt("Channel Name: ");
   if(channelName){
      await db.collection("channels").add({
         channelName: channelName,
      }).catch(err =>{
         console.log(err);
      });
   }
}