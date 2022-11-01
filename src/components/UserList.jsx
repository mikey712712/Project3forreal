import { Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { RealTimeDB, auth } from "../App"
import { ref, onValue } from "firebase/database"
import UserHorizontalCard from "./UserHorizontalCard"
export default function UserList() {
	// console.log("inContacts", user?.uid)
	const [currentUserList, setCurrentUserList] = useState([])
	const [currentUser, setCurrentUser] = useState()
	useEffect(() => {
		const query = ref(RealTimeDB, "Users")
		return onValue(query, (snapshot) => {
			const data = snapshot.val()

			if (snapshot.exists()) {
				let newUserList = []
				for (let prop in data) {
					let displayName = data[prop][Object.keys(data[prop])[0]].displayName
					let uid = prop
					let photoURL = data[prop][Object.keys(data[prop])[0]].photoURL
					let friends = data[prop][Object.keys(data[prop])[0]].friends
					if (uid !== auth.currentUser.uid) {
						newUserList.push({ uid: uid, displayName: displayName, photoURL: photoURL, friends: friends })
					} else {
						setCurrentUser({ uid: uid, displayName: displayName, friends: friends })
					}
				}

				setCurrentUserList(newUserList)
			}
		})
	}, [])
	let renderedUserList = currentUserList.map((user) => {
		let isAFriend = currentUser.friends.includes(user.uid) ? "yes" : "no"
		console.log(user, "is a friend?", isAFriend)
		return (
			<UserHorizontalCard
				uid={user.uid}
				key={user.uid}
				profileURL={user.profileURL}
				displayName={user.displayName}
				isAFriend={isAFriend}
				myUid={currentUser.uid}
				myDisplayName={currentUser.displayName}
			/>
		)
	})
	return <>{renderedUserList}</>
}
