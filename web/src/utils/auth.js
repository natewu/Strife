import app from "api/base.js";

export async function handleRegister(email, password, confirmPass){
   async function Register(){
      try {
         await app.auth().createUserWithEmailAndPassword(email, password);
         console.log("Registration Success!")
      } catch (error) {
         console.log(error);
      }
   }
   password === confirmPass ? Register() : console.log("passwords dont match");
}

export async function handleLogin(email, password){
   try {
      await app.auth().signInWithEmailAndPassword(email, password);
      console.log("Login Success!");
   } catch (error) {
      console.log(error);
   }
}