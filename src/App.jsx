import "./App.css"
// COMPONENTS
import Button from "./components/Button"
import CurrentRoom from "./components/CurrentRoom"
import Dialog from "./components/Dialog"
import Videos from "./components/Videos"

// FUNCTION/LIBRARY IMPORTS
import { createRoom } from "./functions/FirebaseRTC1"
import { openUserMedia } from "./functions/FirebaseRTC1"
import { joinRoom } from "./functions/FirebaseRTC1"
import { hangUp } from "./functions/FirebaseRTC1"
import { init } from "./functions/FirebaseRTC1"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyCHBoIUdJzDREqZYtpdv3do6YzfEJ8aJM4",
	authDomain: "project-3---the-boys.firebaseapp.com",
	projectId: "project-3---the-boys",
	storageBucket: "project-3---the-boys.appspot.com",
	messagingSenderId: "702523758220",
	appId: "1:702523758220:web:bfc9b98b6929a472be4da9",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
function App() {
	init()
	return (
		<div className="App">
			<h1>Welcome to Bruh moment!</h1>
			<Button btnId={"cameraBtn"} iElement={"perm_camera_mic"} spanText={"Open camera & microphone"} btnOnClick={openUserMedia} />
			<Button btnId={"createBtn"} iElement={"group_add"} spanText={"Create room"} btnOnClick={createRoom} />
			<Button btnId={"joinBtn"} iElement={"group"} spanText={"Join room"} btnOnClick={joinRoom} />
			<Button btnId={"hangupBtn"} iElement={"close"} spanText={"Hangup"} btnOnClick={hangUp} />
			<CurrentRoom />
			<Videos />
			<Dialog />
		</div>
	)
}

export default App
