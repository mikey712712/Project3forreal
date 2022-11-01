import { Box } from "@chakra-ui/react"
import { off, ref, onValue, get, child, set, remove } from "firebase/database"
import { useState, useEffect } from "react"
import { auth, RealTimeDB } from "../App"

export default function Contacts({ user }) {
	// console.log("inContacts", user?.uid)
	const [currentFriendsList, setCurrentFriendsList] = useState([])
	const [friendRequests, setCurrentFriendRequests] = useState([])
	let newFriendsList = []

	const handleOnClick = (uid, me) => {
		const query = ref(RealTimeDB, "Users/" + me)
		let myUserRef = ""

		onValue(
			query,
			(snapshot) => {
				const data = snapshot.val()
				if (snapshot.exists()) {
					myUserRef = Object.keys(data)[0]
				}
			},
			{ onlyOnce: true }
		)

		const friendlink = `Users/${me}/${myUserRef}/friends` // friends array
		const friendQuery = ref(RealTimeDB, friendlink)
		let existingFriends = []
		onValue(
			friendQuery,
			(snapshot) => {
				const data = snapshot.val()
				if (snapshot.exists()) {
					existingFriends = data
				}
			},
			{ onlyOnce: true }
		)

		set(friendQuery, [...existingFriends, uid])

		// now time to add me to the requesters friends list

		const requesterQuery = ref(RealTimeDB, "Users/" + uid)
		let requesterUserRef = ""
		onValue(
			requesterQuery,
			(snapshot) => {
				const data = snapshot.val()
				if (snapshot.exists()) {
					requesterUserRef = Object.keys(data)[0]
				}
			},
			{ onlyOnce: true }
		)

		const requesterfriendlink = `Users/${uid}/${requesterUserRef}/friends` // friends array
		const requesterfriendQuery = ref(RealTimeDB, requesterfriendlink)
		let requesterExistingFriends = []
		onValue(
			requesterfriendQuery,
			(snapshot) => {
				const data = snapshot.val()
				if (snapshot.exists()) {
					requesterExistingFriends = data
				}
			},
			{ onlyOnce: true }
		)

		set(requesterfriendQuery, [...requesterExistingFriends, me])

		// now finally delete request
		const allMyRequestLink = `Requests/${me}`
		const allMyRequestRef = ref(RealTimeDB, allMyRequestLink)
		let deleteID = ""
		onValue(
			allMyRequestRef,
			(snapshot) => {
				const data = snapshot.val()
				if (snapshot.exists()) {
					for (let prop in data) {
						if (data[prop].uid === uid) {
							deleteID = prop
						}
					}
				}
			},
			{ onlyOnce: true }
		)
		remove(ref(RealTimeDB, `Requests/${me}/${deleteID}`))
	}
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
		return (
			<>
				<div key={req.uid}> {req.displayName} has sent you a request to be your friend</div>
				<button onClick={() => handleOnClick(req.uid, user?.uid)}>Accept</button>
			</>
		)
	})
	// console.log(friendRequests)
	return (
		<Box position="relative" top="36px">
			<div>Contacts {currentFriendsList.length}</div>
			{renderedFriendRequests}
		</Box>
	)
}
