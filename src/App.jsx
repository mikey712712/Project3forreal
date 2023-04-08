import "./App.css"
// FUNCTION/LIBRARY IMPORTS
// import * as dotenv from "dotenv"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getDatabase, set, ref, onDisconnect } from "firebase/database"
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom"
import { getStorage } from "firebase/storage"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
// dotenv.config()
// console.log(typeof process.env.REACT_APP_APIKEY) // object { BASIC : 'basic' }
import Main from "./components/Main"
const firebaseApp = initializeApp({
	apiKey: import.meta.env.VITE_APIKEY,
	authDomain: import.meta.env.VITE_AUTHDOMAIN,
	projectId: import.meta.env.VITE_PROJECTID,
	storageBucket: import.meta.env.VITE_STORAGEBUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
	databaseURL: import.meta.env.VITE_DATABASEURL,
	appId: import.meta.env.VITE_APPID,
})
export const db = getFirestore(firebaseApp)
export const RealTimeDB = getDatabase(firebaseApp)
export const auth = getAuth(firebaseApp)
export const storage = getStorage(firebaseApp)

function App() {
	const [user, setUser] = useState(null)
	useEffect(() => {
		onAuthStateChanged(auth, (currUser) => {
			if (currUser) {
				set(ref(RealTimeDB, "OnlineStatus/" + currUser.uid), "I am here")
				onDisconnect(ref(RealTimeDB, "OnlineStatus/" + currUser.uid)).remove()
				onDisconnect(ref(RealTimeDB, `IncomingCalls/${currUser.uid}`)).remove()
				setUser(currUser)
			} else {
				if (user !== null) {
					setUser(null)
				}
			}
		})
	}, [])

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
