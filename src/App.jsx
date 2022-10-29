import "./App.css"
// COMPONENTS
import VideoButton from "./components/VideoButton"
import CurrentRoom from "./components/CurrentRoom"
import Dialog from "./components/Dialog"
import Videos from "./components/Videos"

// FUNCTION/LIBRARY IMPORTS
import { createRoom } from "./functions/FirebaseRTC"
import { openUserMedia } from "./functions/FirebaseRTC"
import { joinRoom } from "./functions/FirebaseRTC"
import { hangUp } from "./functions/FirebaseRTC"
import { init } from "./functions/FirebaseRTC"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { ButtonGroup, ChakraProvider, Heading } from "@chakra-ui/react"

const firebaseConfig = {
	***REMOVED***
	***REMOVED***
	***REMOVED***
	***REMOVED***
	***REMOVED***
	***REMOVED***
}

const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
function App() {
	init()
	return (
		<ChakraProvider>
			<div className="App">
				<Heading m="20px auto">Welcome!</Heading>
				<ButtonGroup>
					<VideoButton btnId={"cameraBtn"} iElement={"perm_camera_mic"} spanText={"Open camera & microphone"} btnOnClick={openUserMedia} />
					<VideoButton btnId={"createBtn"} iElement={"group_add"} spanText={"Create room"} btnOnClick={createRoom} />
					<VideoButton btnId={"joinBtn"} iElement={"group"} spanText={"Join room"} btnOnClick={joinRoom} />
					<VideoButton btnId={"hangupBtn"} iElement={"close"} spanText={"Hangup"} btnOnClick={hangUp} />
				</ButtonGroup>
				<CurrentRoom />
				<Videos />
				<Dialog />
			</div>
		</ChakraProvider>
	)
}

export default App
