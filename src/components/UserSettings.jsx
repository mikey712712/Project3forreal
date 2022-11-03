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
	Link,
	Avatar,
	FormControl,
	FormHelperText,
	InputRightElement,
} from "@chakra-ui/react"
import { FaUserAlt, FaLock } from "react-icons/fa"
import { updateProfile } from "firebase/auth"
import { auth } from "../App"
import { useNavigate } from "react-router-dom"
import { updateProfilePicture } from "../functions/FirebaseStorage"
import { getStorage, uploadBytes, ref } from "firebase/storage"
const CFaUserAlt = chakra(FaUserAlt)
const CFaLock = chakra(FaLock)

export default function UserSettings() {
	const navigate = useNavigate()
	const [showPassword, setShowPassword] = useState(false)
	const [formValue, setFormValue] = useState({})
	const [fields, setFields] = useState({})
	const handleShowClick = () => setShowPassword(!showPassword)
	const [selectedFile, setSelectedFile] = useState()
	const [isFilePicked, setIsFilePicked] = useState(false)

	const onType = (event) => {
		const { name, value } = event.target
		setFields({ ...fields, [name]: value })
	}
	const onProfileUpdate = async (event) => {
		event.preventDefault()
		setFormValue(fields)
		if (selectedFile) {
			updateProfilePicture(auth.currentUser.uid, selectedFile)
		}
		updateProfile(auth.currentUser, {
			displayName: fields.displayName,
		})
			.then(() => {
				// Profile Updated
				console.log("profile updated")
			})
			.catch((error) => {
				const errorCode = error.code
				const errorMessage = error.message
				console.log(errorCode, errorMessage)
			})
	}

	const onChangeFileUpload = (event) => {
		console.log(event.target.files["0"])
		setSelectedFile(event.target.files["0"])
		setIsFilePicked(true)
	}

	return (
		<Box minW={{ base: "90%", md: "468px" }} position="relative" top="36px">
			<form onSubmit={onProfileUpdate}>
				<Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900" boxShadow="md">
					<FormControl>
						<InputGroup>
							<InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300" />} />
							<Input type="text" name="displayName" placeholder="Display Name" onChange={onType} />
						</InputGroup>
					</FormControl>
					<FormControl>
						<InputGroup>
							<InputLeftElement pointerEvents="none" color="gray.300" children={<CFaLock color="gray.300" />} />
							<Input type="text" name="photoURL" placeholder="Your Photo Link Here" onChange={onType} />
							<Input type="file" accept="image/*" name="photoUpload" onChange={onChangeFileUpload} />
						</InputGroup>
					</FormControl>
					<Button borderRadius={0} type="submit" variant="solid" colorScheme="teal" width="full">
						Submit
					</Button>
				</Stack>
			</form>
		</Box>
	)
}
