import app, {db} from "api/base.js";

export async function handleRegister(email, username, password, confirmPass, handleError){
   var time = new Date();

   async function Register(){
      try {
         await app.auth().createUserWithEmailAndPassword(email, password).then(()=>{
            db.collection("users").doc(app.auth().currentUser.uid).set({
               email: app.auth().currentUser.email,
               username: username,
               registered: time.toLocaleDateString('en-US', { year: "numeric", month: "short", day: "2-digit" }) + " " +time.toLocaleTimeString('en-GB', { hour12: false, hour: "2-digit", minute: "2-digit" }),
            }).then(()=>{
               console.log("successfully logged into DB");
            }).catch(error =>{
               console.log(error);
            });
         }).then(()=>{
            console.log("Registration Success!");
         });
      } catch (error) {
         console.log(error);
         handleError(error.message);
      }
   }

   (email === null) ? handleError("email cannot be empty") 
      : (password, confirmPass === null) ? handleError("password cannot be empty")
      : (password !== confirmPass) ? handleError("passwords don't match") 
      : (username === null) ? handleError("username cannot be empty")
      : Register();
}

export async function handleLogin(email, password, handleError){
   try {
      await app.auth().signInWithEmailAndPassword(email, password).then(()=>{
         console.log("Login Success!");
         console.log("Welcome back, "+ app.auth().currentUser.email);
      })
      
   } catch (error) {
      console.log(error);
      handleError("email or password is incorrect");
   }
}

