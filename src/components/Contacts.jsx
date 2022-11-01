import { off, ref, onValue } from "firebase/database"
import { useState, useEffect } from "react"
import { auth, RealTimeDB } from "../App"

export default function Contacts({ user }) {
	// console.log("inContacts", user?.uid)
	const [currentFriendsList, setCurrentFriendsList] = useState([])
	const [friendRequests, setCurrentFriendRequests] = useState([])
	let newFriendsList = []
	useEffect(() => {
		// console.log("useEffectTriggered")
		const query = ref(RealTimeDB, "Users/" + user?.uid)
		let turnOff = onValue(query, (snapshot) => {
			const data = snapshot.val()

			if (snapshot.exists()) {
				for (let prop in data) {
					let friendsArray = data[prop].friends
					newFriendsList.push(...friendsArray)
				}
				// console.log("fl", newFriendsList)
				setCurrentFriendsList(newFriendsList)
			}
		})
	}, [user])

	useEffect(() => {
		const query = ref(RealTimeDB, "Requests/" + user?.uid)
		return onValue(query, (snapshot) => {
			const data = snapshot.val()
			let newRequestList = []
			if (snapshot.exists()) {
				for (let prop in data) {
					console.log(data[prop])
					let requestUid = data[prop].uid
					let requestDisplayName = data[prop].displayName
					console.log("requid", requestUid)
					newRequestList.push({ uid: requestUid, displayName: requestDisplayName })
				}
			}
			setCurrentFriendRequests(newRequestList)
		})
	}, [user])

	let renderedFriendRequests = friendRequests.map((req) => {
		return <div key={req.uid}> {req.displayName} has sent you a request to be your friend</div>
	})
	// console.log(friendRequests)
	return (
		<div>
			<div>Contacts {currentFriendsList.length}</div>
			{renderedFriendRequests}
		</div>
	)
}
