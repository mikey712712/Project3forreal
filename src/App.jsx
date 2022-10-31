import "./App.css"
// COMPONENTS
import VideoButton from "./components/VideoButton"
import CurrentRoom from "./components/CurrentRoom"
import Dialog from "./components/Dialog"
import Videos from "./components/Videos"
import ChatRoom from "./components/ChatRoom"
import Header from "./components/Header"
import VideoPage from "./components/VideoPage"
// FUNCTION/LIBRARY IMPORTS
import { init } from "./functions/FirebaseRTC"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getDatabase, ref, set, onChildAdded } from "firebase/database"
import { ButtonGroup, ChakraProvider, Heading } from "@chakra-ui/react"
import { Routes, Route, BrowserRouter } from "react-router-dom"

const firebaseConfig = {
	***REMOVED***
	***REMOVED***
	***REMOVED***
	***REMOVED***
	***REMOVED***
	***REMOVED***
	***REMOVED***
}

const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
export const RealTimeDB = getDatabase(firebaseApp)

function App() {
	init()
	return (
		<ChakraProvider>
			<BrowserRouter>
				<div className="App">
					<Header />
					<Routes>
						<Route path="/" element={<VideoPage />} />
					</Routes>
				</div>
			</BrowserRouter>
		</ChakraProvider>
	)
}

export default App
