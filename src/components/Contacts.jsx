import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react"
import { IoIosArrowDropdown } from "react-icons/io"
import { off, ref, onValue, get, child, set, remove } from "firebase/database"
import { useState, useEffect } from "react"
import { auth, RealTimeDB } from "../App"
import Contact from "./Contact"
export default function Contacts({ user, setRoomNumber }) {
	const [currentFriendsList, setCurrentFriendsList] = useState([])
	const [friendRequests, setCurrentFriendRequests] = useState([])
	let newFriendsList = []

	const handleOnClick = async (uid, me) => {
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

		const requesterQuery = ref(RealTimeDB, `Users/${uid}`)
		let requesterUserRef = ""

		const grabRequesterUserRef = new Promise((resolve, reject) => {
			onValue(
				requesterQuery,
				(snapshot) => {
					const data = snapshot.val()
					if (snapshot.exists()) {
						console.log(data)
						resolve(Object.keys(data)[0])
					}
				},
				{ onlyOnce: true }
			)
		})
		requesterUserRef = await grabRequesterUserRef
		const requesterfriendlink = `Users/${uid}/${requesterUserRef}/friends` // friends array
		console.log(requesterfriendlink)
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
				let contactList = []
				for (let prop in data) {
					let friendsArray = data[prop].friends
					if (friendsArray.length > 0) {
						newFriendsList = [...friendsArray]
						onValue(ref(RealTimeDB, "Users"), (snapshot) => {
							const data = snapshot.val()
							let dataObjects = []
							if (snapshot.exists()) {
								for (let prop in data) {
									dataObjects.push(data[prop][Object.keys(data[prop])[0]])
								}
								contactList = dataObjects.filter((user) => {
									return newFriendsList.includes(user.uid)
								})
								setCurrentFriendsList(contactList)
							}
						})
					}
				}
			}
			// console.log("fl", newFriendsList)
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

	const FriendRequest = ({ req }) => {
		return (
			<Flex
				bgColor="rgba(255,255,255,0.8)"
				filter="bri"
				alignItems="center"
				borderRadius="6px"
				border={"1px solid rgba(0,0,0,0.2)"}
				color="#266E80"
				m="4px"
				p="6px"
				boxSizing="border-box"
				fontSize="0.8em"
			>
				<Avatar marginRight="10px" />
				<Text fontWeight="500" h="fit-content">
					<strong>{req.displayName}</strong> has sent a friend request
				</Text>
				<Button alignSelf="flex-start" fontSize="0.8em" h="fit-content" marginLeft="5px" p="5px" onClick={() => handleOnClick(req.uid, user?.uid)}>
					Accept
				</Button>
			</Flex>
		)
	}
	console.log(auth.currentUser)

	let renderedFriendRequests = friendRequests.map((req, index) => {
		return <FriendRequest key={index} req={req} />
	})
	let renderedContacts = currentFriendsList.map((friend) => {
		return (
			<Contact
				key={friend.uid}
				setRoomNumber={setRoomNumber}
				uid={friend.uid}
				photoURL={friend.photoURL}
				displayName={friend.displayName}
				me={user.uid}
			/>
		)
	})
	// console.log(friendRequests)
	return (
		<Box
			boxSizing="border-box"
			m="10px 0 0 0"
			position="fixed"
			h="100%"
			top="4vh"
			left="0"
			backgroundColor="#006680"
			w="17%"
			borderRight="2px solid #1B4965"
			borderTop="2px solid #1B4965"
			borderRightRadius="10px"
		>
			<Text fontWeight="500" fontSize="1.6em" color="white" padding="4px 0 4px 10px">
				Contacts {currentFriendsList.length}
			</Text>
			{renderedFriendRequests}
			{renderedContacts}
		</Box>
	)
}
