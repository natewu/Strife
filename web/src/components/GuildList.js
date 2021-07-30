import { Avatar } from "@material-ui/core"
import React from 'react'
import "styles/GuildList.scss"

export default function GuildList() {
   return (
      <div className="Guild__List">
         <Logo appName="Strife"/>
         <Guild guildName={"Strife"}/>
         <Guild guildName={"Strife"}/>
         <Guild guildName={"Strife"}/>
         <Guild guildName={"Strife"}/>
         <Guild guildName={"Strife"}/>
         <Guild guildName={"Strife"}/>
         <Guild guildName={"Strife"}/>
         <Guild guildName={"Strife"}/>
         <Guild guildName={"Strife"}/>
         <Guild guildName={"Strife"}/>
         <Guild guildName={"Strife"}/>
         <Guild guildName={"Strife"}/>
         <Guild guildName={"Strife"}/>
         <Guild guildName={"Strife"}/>
         <Guild guildName={"Strife"}/>
         <Guild guildName={"Strife"}/>
         <Guild guildName={"Strife"}/>
         <Guild guildName={"Strife"}/>
         <Guild guildName={"Strife"}/>
         <Guild guildName={"Strife"}/>
         <Guild guildName={"Strife"}/>
         <Guild guildName={"Strife"}/>
         <Guild guildName={"Strife"}/>
         <Guild guildName={"Strife"}/>
         <Guild guildName={"Strife"}/>
         <Guild guildName={"+"}/>
      </div>
   )
}

export function Guild({id, guildName, color}){
   return(
      <div className="Guild__Item">
         <Avatar className="Guild__Icon" style={{backgroundColor:color}} src={guildName.photo}>
            {guildName.charAt(0)}
         </Avatar>
      </div>
   )
}
export function Logo({appName}){
   return(
      <div className="Guild__Item Logo__DM">
         <Avatar className="Guild__Icon" style={{backgroundColor:"rgb(235, 81, 81)"}} >
            {appName.charAt(0)}
         </Avatar>
      </div>
   )
}