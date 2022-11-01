import "./App.css"
// COMPONENTS
import Header from "./components/Header"
// FUNCTION/LIBRARY IMPORTS
import { init } from "./functions/FirebaseRTC"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getDatabase } from "firebase/database"
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom"

import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useState } from "react"

import Main from "./components/Main"
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
			// console.log("userSignedIN", currUser)
		} else {
			// No user is signed in.
			setUser(null)
			// console.log("loggedout")
		}
	})
	init()

	return (
		<ChakraProvider>
			<BrowserRouter>
				<div className="App">
					<Header auth={auth} user={user} />
					<Main user={user} />
				</div>
			</BrowserRouter>
		</ChakraProvider>
	)
}

export default App
