import "./App.css"
// COMPONENTS
import Header from "./components/Header"
// FUNCTION/LIBRARY IMPORTS
import { init } from "./functions/FirebaseRTC"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getDatabase, onValue, set, ref, remove } from "firebase/database"
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom"
import { getStorage } from "firebase/storage"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"

import Main from "./components/Main"
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
export const storage = getStorage(firebaseApp)

function App() {
	const [user, setUser] = useState(null)
	useEffect(() => {
		const handleTabClose = (event) => {
			event.preventDefault()
			remove(ref(RealTimeDB, "OnlineStatus/" + user.uid))
		}

		window.addEventListener("beforeunload", handleTabClose)

		return () => {
			window.removeEventListener("beforeunload", handleTabClose)
		}
	}, [])
	onAuthStateChanged(auth, (currUser) => {
		if (currUser) {
			set(ref(RealTimeDB, "OnlineStatus/" + currUser.uid), "I am here")
			setUser(currUser)
			// console.log("userSignedIN", currUser)
		} else {
			if (user !== null) {
				setUser(null)
			}
			// console.log("loggedout")
		}
	})
	init()

	return (
		<ChakraProvider>
			<BrowserRouter>
				<div className="App">
					<Main user={user} setUser={setUser} />
				</div>
			</BrowserRouter>
		</ChakraProvider>
	)
}

export default App
