import { Flex, Text } from "@chakra-ui/react"
import { ref, remove } from "firebase/database"
import { Link, useNavigate } from "react-router-dom"
import { auth, RealTimeDB } from "../App"
import { hangUp } from "../functions/FirebaseRTC"
import { signOut, getAuth } from "firebase/auth"

export default function Header({ user, videoOn, setUser }) {
	const navigate = useNavigate()
	const handleLogout = () => {
		remove(ref(RealTimeDB, "OnlineStatus/" + user.uid))
		setUser(null)
		signOut(auth)
		navigate("/login")
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
			<Link to="/">
				<Text _hover={{ fontWeight: "600" }}>Home</Text>
			</Link>
			{user ? (
				<>
					<Link to="/Users">
						<Text _hover={{ fontWeight: "600" }}>Contacts</Text>
					</Link>
					<Link to="/account">
						<Text _hover={{ fontWeight: "600" }}>Account</Text>
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
						_hover={{ fontWeight: "600" }}
					>
						Logout
					</Text>
				</a>
			) : (
				<Link to="/login">
					<Text _hover={{ fontWeight: "600" }}>Login</Text>
				</Link>
			)}
		</Flex>
	)
}
