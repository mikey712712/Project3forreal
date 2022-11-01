import { Flex, Stack } from "@chakra-ui/react"
import { signOut } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../App"

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
		>
			<Link to="/">Home</Link>
			<Link to="/Users">Teams</Link>
			<a href="">Contacts</a>
			<Link to="/account">Account</Link>
			{user ? <a onClick={handleLogout}>Logout</a> : <Link to="/login">Login</Link>}
		</Flex>
	)
}
