import "./App.css"
// COMPONENTS
import Header from "./components/Header"
import Register from "./components/Register"
import Login from "./components/Login"
import VideoPage from "./components/VideoPage"
import Account from "./components/Account"

// FUNCTION/LIBRARY IMPORTS
import { init } from "./functions/FirebaseRTC"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getDatabase, ref, set, onChildAdded } from "firebase/database"
import { ButtonGroup, ChakraProvider, Heading } from "@chakra-ui/react"
import { Routes, Route, BrowserRouter } from "react-router-dom"

import { getAuth, onAuthStateChanged } from "firebase/auth"
import UserSettings from "./components/UserSettings"
import { useState } from "react"
const firebaseConfig = {
	apiKey: "AIzaSyCHBoIUdJzDREqZYtpdv3do6YzfEJ8aJM4",
	authDomain: "project-3---the-boys.firebaseapp.com",
	projectId: "project-3---the-boys",
	storageBucket: "project-3---the-boys.appspot.com",
	messagingSenderId: "702523758220",
	appId: "1:702523758220:web:bfc9b98b6929a472be4da9",
	databaseURL: "https://project-3---the-boys-default-rtdb.asia-southeast1.firebasedatabase.app/",
}

const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
export const RealTimeDB = getDatabase(firebaseApp)
export const auth = getAuth(firebaseApp)

function App() {
	const [user, setUser] = useState(null)
	onAuthStateChanged(auth, (currUser) => {
		if (currUser) {
			// User is signed in.
			setUser(currUser)
		} else {
			// No user is signed in.
			setUser(null)
		}
	})
	init()
	return (
		<ChakraProvider>
			<BrowserRouter>
				<div className="App">
					<Header auth={auth} user={user} />
					<Routes>
						<Route path="/" element={<VideoPage />} />
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/userSettings" element={<UserSettings />} />
						<Route path="/account" element={<Account user={user} />} />
					</Routes>
				</div>
			</BrowserRouter>
		</ChakraProvider>
	)
}

export default App
