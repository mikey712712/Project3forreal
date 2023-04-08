import { Box, Flex, Heading } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { RealTimeDB, auth } from "../App"
import { ref, onValue } from "firebase/database"
import UserHorizontalCard from "./UserHorizontalCard"
import { useNavigate } from "react-router-dom"
export default function UserList({ user }) {
	const navigate = useNavigate()
	useEffect(() => {
		if (!user) {
			navigate("/login")
		}
	}, [])
	if (user) {
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
		let renderedUserListFriends = currentUserList
			.filter((user) => {
				return currentUser.friends.includes(user.uid)
			})
			.map((user) => {
				let isAFriend = currentUser.friends.includes(user.uid) ? "yes" : "no"
				return (
					<UserHorizontalCard
						uid={user.uid}
						key={user.uid}
						photoURL={user.photoURL}
						displayName={user.displayName}
						isAFriend={isAFriend}
						myUid={currentUser.uid}
						myDisplayName={currentUser.displayName}
					/>
				)
			})
		let renderedUserListNotFriends = currentUserList
			.filter((user) => {
				return !currentUser.friends.includes(user.uid)
			})
			.map((user) => {
				let isAFriend = currentUser.friends.includes(user.uid) ? "yes" : "no"
				return (
					<UserHorizontalCard
						uid={user.uid}
						key={user.uid}
						photoURL={user.photoURL}
						displayName={user.displayName}
						isAFriend={isAFriend}
						myUid={currentUser.uid}
						myDisplayName={currentUser.displayName}
					/>
				)
			})

		return (
			<Box bgColor="unset" position="fixed" top="4vh" left="17%" w="83%" h="96vh">
				<Flex borderRadius="6px" border={"1px solid rgba(0,0,0,0.2)"} bgColor="rgba(255,255,255,0.8)" h="100%" m="10px">
					<Box w="100%" h="100%" m="0 auto" overflowY="scroll">
						<Heading fontSize={"3xl"} pl="20px" pt="20px" m="0">
							Friends
						</Heading>
						<Flex
							boxSizing="border-box"
							p="0 20px 10px 10px"
							alignItems="flex-start"
							justifyContent="space-between"
							flexFlow="row wrap"
							h="fit-content"
							m="0 auto"
						>
							{renderedUserListFriends}
						</Flex>
						<Heading fontSize={"3xl"} pl="20px" pt="20px" m="0">
							Suggested
						</Heading>
						<Flex
							boxSizing="border-box"
							p="0 20px 30px 10px"
							alignItems="flex-start"
							justifyContent="space-between"
							flexFlow="row wrap"
							h="fit-content"
							m="0 auto"
						>
							{renderedUserListNotFriends}
						</Flex>
					</Box>
				</Flex>
			</Box>
		)
	}
}
