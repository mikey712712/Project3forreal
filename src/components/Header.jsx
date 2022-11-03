import { Flex, Text } from "@chakra-ui/react"
import { ref, remove } from "firebase/database"
import { Link, useNavigate } from "react-router-dom"
import { auth, RealTimeDB } from "../App"
import { hangUp } from "../functions/FirebaseRTC"
import { signOut } from "firebase/auth"

export default function Header({ user, videoOn, setUser }) {
	const navigate = useNavigate()
	const handleLogout = async () => {
		await remove(ref(RealTimeDB, "OnlineStatus/" + user.uid))
		setUser(null)
		signOut(auth)
		navigate("/login")
		hangUp()
	}

	return (
		<Flex
			w="100%"
			justifyContent="space-between"
			alignItems="center"
			boxSizing="border-box"
			p="5px 15px"
			backgroundColor="white"
			fontWeight="400"
			h="4vh"
			position="fixed"
			top="0"
			zIndex="100"
			borderBottom="1px solid rgba(0,0,0,0.5)"
		>
			{user ? (
				<>
					<Link to="/">
						<Text transition="0.2s" _hover={{ fontWeight: "600" }}>
							Home
						</Text>
					</Link>
					<Link to="/users">
						<Text transition="0.2s" _hover={{ fontWeight: "600" }}>
							Contacts
						</Text>
					</Link>
					<Link to="/account">
						<Text transition="0.2s" _hover={{ fontWeight: "600" }}>
							Account
						</Text>
					</Link>
				</>
			) : null}
			{user ? (
				<a>
					<Text
						onClick={() => {
							if (videoOn) {
								hangUp()
							}
							handleLogout()
						}}
						transition="0.2s"
						_hover={{ fontWeight: "600" }}
					>
						Logout
					</Text>
				</a>
			) : (
				<>
					<Link to="/register">
						<Text transition="0.2s" _hover={{ fontWeight: "600" }}>
							Register
						</Text>
					</Link>
					<Link to="/login">
						<Text transition="0.2s" _hover={{ fontWeight: "600" }}>
							Login
						</Text>
					</Link>
				</>
			)}
		</Flex>
	)
}
