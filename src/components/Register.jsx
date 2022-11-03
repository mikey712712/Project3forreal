import { useEffect, useState } from "react"
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
	FormControl,
	FormHelperText,
	InputRightElement,
} from "@chakra-ui/react"
import { FaUserAlt, FaLock } from "react-icons/fa"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { createUserRealTimeDB } from "../functions/FirebaseRTDB"
import { auth } from "../App"
import { useNavigate, Link } from "react-router-dom"
const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)
export default function Register({ user }) {
	const navigate = useNavigate()
	useEffect(() => {
		if (user) {
			navigate("/")
		}
	}, [user])
	const [showPassword, setShowPassword] = useState(false)
	const [formValue, setFormValue] = useState({})
	const [fields, setFields] = useState({})
	if (!user) {
		const handleShowClick = () => setShowPassword(!showPassword)
		const onType = (event) => {
			const { name, value } = event.target
			setFields({ ...fields, [name]: value })
		}
		const onSignup = async (event) => {
			event.preventDefault()
			setFormValue(fields)
			await createUserWithEmailAndPassword(auth, fields.email, fields.password)
				.then((userCredential) => {
					// Signed in

					const user = userCredential.user
					// create record in RTDB
					createUserRealTimeDB(user.uid, fields.displayName, fields.email)
				})
				.catch((error) => {
					const errorCode = error.code
					const errorMessage = error.message
					console.log(errorCode, errorMessage)
				})
			await updateProfile(auth.currentUser, {
				displayName: fields.displayName,
			})
			navigate("/account")
		}

		return (
			<Flex flexDirection="column" width="100wh" height="100vh" backgroundColor="gray.200" justifyContent="center" alignItems="center">
				<Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
					<Heading fontSize="1.7em" color="#0083a3">
						Register a QuickChat account
					</Heading>
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
										<InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300" />} />
										<Input type="text" name="displayName" placeholder="display name" onChange={onType} />
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
								<Button borderRadius={0} color="white" type="submit" variant="solid" bgColor="#0083a3" width="full">
									Sign Up
								</Button>
							</Stack>
						</form>
					</Box>
				</Stack>
				<Box>
					Already have an account?{" "}
					<Link to="/login" color="teal.500" href="#">
						Log In
					</Link>
				</Box>
			</Flex>
		)
	}
}
