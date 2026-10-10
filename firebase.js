import {initializeApp} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {getFirestore,collection,doc,getDocs,getDoc,setDoc,addDoc,updateDoc,deleteDoc,query,where,writeBatch,serverTimestamp} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import {getAuth,signInWithEmailAndPassword,signOut,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
// Public client config (safe to expose). Security is enforced by Firestore Rules.
const app=initializeApp({apiKey:"AIzaSyApVbuy8HobFUuB6BlGz01DEMQREi3P1ic",authDomain:"spm-shadowprojects.firebaseapp.com",projectId:"spm-shadowprojects",storageBucket:"spm-shadowprojects.firebasestorage.app",messagingSenderId:"355419557162",appId:"1:355419557162:web:5f0521ed6b5162818b2253"});
export const db=getFirestore(app),auth=getAuth(app);
export {collection,doc,getDocs,getDoc,setDoc,addDoc,updateDoc,deleteDoc,query,where,writeBatch,serverTimestamp,signInWithEmailAndPassword,signOut,onAuthStateChanged};
