import { Flex } from "@chakra-ui/react"
import { ref, remove } from "firebase/database"
import { Link, useNavigate } from "react-router-dom"
import { auth, RealTimeDB } from "../App"
import { hangUp } from "../functions/FirebaseRTC"

export default function Header({ user }) {
	const navigate = useNavigate()
	const handleLogout = () => {
		remove(ref(RealTimeDB, "OnlineStatus/" + user.uid))
		auth.signOut()
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
			fontWeight="bold"
			h="4vh"
			position="fixed"
			top="0"
			zIndex="100"
			borderBottom="2px solid black"
		>
			<Link to="/">Home</Link>
			<Link to="/Users">Teams</Link>
			<a href="">Contacts</a>
			<Link to="/account">Account</Link>
			{user ? (
				<a
					onClick={() => {
						hangUp()
						handleLogout()
					}}
				>
					Logout
				</a>
			) : (
				<Link to="/login">Login</Link>
			)}
		</Flex>
	)
}
