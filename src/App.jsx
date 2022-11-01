import "./App.css"
// COMPONENTS
import Header from "./components/Header"
import Register from "./components/Register"
import Login from "./components/Login"
import VideoPage from "./components/VideoPage"
import Account from "./components/Account"
import Contacts from "./components/Contacts"
import UserList from "./components/UserList"
// FUNCTION/LIBRARY IMPORTS
import { init } from "./functions/FirebaseRTC"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getDatabase, ref, set, onChildAdded, onValue } from "firebase/database"
import { ButtonGroup, ChakraProvider, Heading } from "@chakra-ui/react"
import { Routes, Route, BrowserRouter } from "react-router-dom"

import { getAuth, onAuthStateChanged } from "firebase/auth"
import UserSettings from "./components/UserSettings"
import { useState } from "react"

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
	const [user, setUser] = useState(null)

	onAuthStateChanged(auth, (currUser) => {
		if (currUser) {
			// User is signed in.
			setUser(currUser)
			console.log("userSignedIN", currUser)
		} else {
			// No user is signed in.
			setUser(null)
			console.log("loggedout")
		}
	})
	init()
	return (
		<ChakraProvider>
			<BrowserRouter>
				<div className="App">
					<Header auth={auth} user={user} />
					<Contacts user={user}></Contacts>
					<Routes>
						<Route path="/" element={<VideoPage />} />
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/userSettings" element={<UserSettings />} />
						<Route path="/account" element={<Account user={user} />} />
						<Route path="/Users" element={<UserList />} />
					</Routes>
				</div>
			</BrowserRouter>
		</ChakraProvider>
	)
}

export default App
