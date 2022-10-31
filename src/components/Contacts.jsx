import { off, ref, onValue } from "firebase/database"
import { useState, useEffect } from "react"
import { auth, RealTimeDB } from "../App"

export default function Contacts({ user }) {
	// console.log("inContacts", user?.uid)
	const [currentFriendsList, setCurrentFriendsList] = useState([])
	let newFriendsList = []
	useEffect(() => {
		console.log("useEffectTriggered")
		const query = ref(RealTimeDB, "Users/" + user?.uid)
		return onValue(query, (snapshot) => {
			const data = snapshot.val()

			if (snapshot.exists()) {
				for (let prop in data) {
					let friendsArray = data[prop].friends
					newFriendsList.push(...friendsArray)
				}
				console.log("fl", newFriendsList)
				setCurrentFriendsList(newFriendsList)
			}
		})
	}, [user])

	return <div>Contacts {currentFriendsList.length}</div>
}
