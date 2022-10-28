import "./App.css"
import Button from "./components/Button"
import CurrentRoom from "./components/CurrentRoom"
import Dialog from "./components/Dialog"
import Videos from "./components/Videos"
import createRoom from "./functions/createRoom"
import openUserMedia from "./functions/openUserMedia"
import joinRoom from "./functions/joinRoom"
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore"
// import { initializeApp } from 'firebase-admin/app';
// import { db } from './initFire';
// import { getFirestore, Timestamp, FieldValue } from "firebase-admin/firestore"

// import serviceAccount from "./keys.json"
// import "firebase/firestore"
const firebaseConfig = {
  ***REMOVED***
  ***REMOVED***
  ***REMOVED***
  ***REMOVED***
  ***REMOVED***
  ***REMOVED***
}
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
function App() {
	return (
		<div className="App">
			<h1>Welcome to Bruh moment!</h1>
			<Button btnId={"cameraBtn"} iElement={"perm_camera_mic"} spanText={"Open camera & microphone"} btnOnClick={openUserMedia} />
			<Button btnId={"createBtn"} iElement={"group_add"} spanText={"Create room"} btnOnClick={createRoom} />
			<Button btnId={"joinBtn"} iElement={"group"} spanText={"Join room"} btnOnClick={joinRoom} />
			<Button btnId={"hangupBtn"} iElement={"close"} spanText={"Hangup"} />
			<CurrentRoom />
			<Videos />
			<Dialog />
			<script src="./components/app.js"></script>
		</div>
	)
}

export default App
