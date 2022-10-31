import { useState } from "react"
import {
	Flex,
	Heading,
	Input,
	Button,
	InputGroup,
	Stack,
	InputLeftElement,
	chakra,
	Box,
	Avatar,
	FormControl,
	FormHelperText,
	InputRightElement,
} from "@chakra-ui/react"
import { FaUserAlt, FaLock } from "react-icons/fa"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { createUserRealTimeDB } from "../functions/FirebaseRTDB"
import { auth, RealTimeDB } from "../App"
import { useNavigate, Link } from "react-router-dom"
const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)
export default function Register() {
	const navigate = useNavigate()
	const [showPassword, setShowPassword] = useState(false)
	const [formValue, setFormValue] = useState({})
	const [fields, setFields] = useState({})
	const handleShowClick = () => setShowPassword(!showPassword)
	const onType = (event) => {
		const { name, value } = event.target
		setFields({ ...fields, [name]: value })
	}
	const onSignup = (event) => {
		event.preventDefault()
		setFormValue(fields)
		createUserWithEmailAndPassword(auth, fields.email, fields.password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user
				// create record in RTDB
				createUserRealTimeDB(user.uid)

				navigate("/")
			})
			.catch((error) => {
				const errorCode = error.code
				const errorMessage = error.message
				console.log(errorCode, errorMessage)
			})
	}

	return (
		<Flex flexDirection="column" width="100wh" height="100vh" backgroundColor="gray.200" justifyContent="center" alignItems="center">
			<Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
				<Avatar bg="teal.500" />
				<Heading color="teal.400">Welcome</Heading>
				<Box minW={{ base: "90%", md: "468px" }}>
					<form onSubmit={onSignup}>
						<Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
							<FormControl>
								<InputGroup>
									<InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300" />} />
									<Input type="email" name="email" placeholder="email address" onChange={onType} />
								</InputGroup>
							</FormControl>
							<FormControl>
								<InputGroup>
									<InputLeftElement pointerEvents="none" color="gray.300" children={<CFaLock color="gray.300" />} />
									<Input type={showPassword ? "text" : "password"} name="password" placeholder="Password" onChange={onType} />
									<InputRightElement width="4.5rem">
										<Button h="1.75rem" size="sm" onClick={handleShowClick}>
											{showPassword ? "Hide" : "Show"}
										</Button>
									</InputRightElement>
								</InputGroup>
								<FormHelperText textAlign="right">
									<Link>forgot password?</Link>
								</FormHelperText>
							</FormControl>
							<Button borderRadius={0} type="submit" variant="solid" colorScheme="teal" width="full">
								Sign Up
							</Button>
						</Stack>
					</form>
				</Box>
			</Stack>
			<Box>
				Return to login?{" "}
				<Link to="/login" color="teal.500" href="#">
					Log In
				</Link>
			</Box>
		</Flex>
	)
}
