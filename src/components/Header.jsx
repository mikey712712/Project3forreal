import { Flex, Stack } from "@chakra-ui/react"
import { signOut } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../App"
import { hangUp } from "../functions/FirebaseRTC"

export default function Header({ user }) {
	const navigate = useNavigate()
	const handleLogout = () => {
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
			backgroundColor="#CAE9FF"
			fontWeight="bold"
			h="36px"
			position="fixed"
			top="0"
			zIndex="100"
		>
			<Link to="/">Home</Link>
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
