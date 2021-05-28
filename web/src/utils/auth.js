import app from "api/base.js";

export async function handleSignup(email, password){
   try {
      await app.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
}

export async function handleLogin(email, password){
   try {
     await app.auth().signInWithEmailAndPassword(email, password);
   } catch (error) {
     console.log(error);
   }
}