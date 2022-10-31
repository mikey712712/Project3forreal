import "./App.css"
// COMPONENTS
import Header from "./components/Header"
import Register from "./components/Register"
import Login from "./components/Login"
import VideoPage from "./components/VideoPage"

// FUNCTION/LIBRARY IMPORTS
import { init } from "./functions/FirebaseRTC"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getDatabase, ref, set, onChildAdded } from "firebase/database"
import { ButtonGroup, ChakraProvider, Heading } from "@chakra-ui/react"
import { Routes, Route, BrowserRouter } from "react-router-dom"

import { getAuth } from "firebase/auth"
import UserSettings from "./components/UserSettings"
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
export const auth = getAuth(firebaseApp)

function App() {
	init()
	return (
		<ChakraProvider>
			<BrowserRouter>
				<div className="App">
					<Header />
					<Routes>
						<Route path="/" element={<VideoPage />} />
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/userSettings" element={<UserSettings />} />
					</Routes>
				</div>
			</BrowserRouter>
		</ChakraProvider>
	)
}

export default App
