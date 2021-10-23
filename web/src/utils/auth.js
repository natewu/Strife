import app, {db} from "api/base.js";

export async function handleRegister(email, username, password, confirmPass, handleError){
   var time = new Date();

   async function Register(){
      try {
         await app.auth().createUserWithEmailAndPassword(email, password).then((user)=>{
            db.collection("users").doc(app.auth().currentUser.uid).set({
               email: app.auth().currentUser.email,
               username: username,
               registered: time.toLocaleDateString('en-US', { year: "numeric", month: "short", day: "2-digit" }) + " " +time.toLocaleTimeString('en-GB', { hour12: false, hour: "2-digit", minute: "2-digit" }),
            }).then(()=>{
               console.log("successfully logged into DB");
            }).catch(error =>{
               console.log(error);
            });

            user.user.updateProfile({
               displayName: username,
               photoURL: "https://th.bing.com/th/id/R1ffc41f79ca7a7ebfcbfa0de38799961?rik=hiDbLDUBYAxgMQ&pid=ImgRaw"
            }).then(()=>{
               console.log(user.user.displayName);
            }).catch((err)=>{
               console.log(err);
            })
            
         }).then(()=>{
            window.location.reload();
            console.log("Registration Success!");
         });
      } catch (error) {
         console.log(error);
         handleError(error.message);
      }
   }

   await db.collection("users").where("username", "==", username).get().then((snapshot)=>{
      if(snapshot.empty){
         (email === null) ? handleError("email cannot be empty") 
         : (password, confirmPass === null) ? handleError("password cannot be empty")
         : (password !== confirmPass) ? handleError("passwords don't match") 
         : (username === null) ? handleError("username cannot be empty")
         : Register();
      }
      else{
         handleError("username is taken!");
      }
   }).catch(err => {
      console.log(err);
   })
}

export async function handleLogin(email, password, handleError, e){
   e.preventDefault();
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
