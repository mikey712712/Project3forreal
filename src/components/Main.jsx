import Contacts from "./Contacts"
import { Routes, Route } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"
import UserSettings from "./UserSettings"
import Account from "./Account"
import Videos from "./Videos"
import UserList from "./UserList"
import ChatPage from "./ChatPage"
import Home from "./Home"
import Call from "./Call"
import Header from "./Header"
import { useEffect, useState } from "react"
import { Box } from "@chakra-ui/react"
import { onValue, ref } from "firebase/database"
import { auth, RealTimeDB } from "../App"

export default function Main({ user, setUser }) {
	const [videoOn, setVideoOn] = useState(null)
	const [roomNumber, setRoomNumber] = useState("")
	const [incomingCall, setIncomingCall] = useState("")
	useEffect(() => {
		return onValue(ref(RealTimeDB, "IncomingCalls/" + user?.uid), (snapshot) => {
			if (snapshot.exists()) {
				// Notify the caller they cant call
				if (incomingCall !== "joined") {
					setIncomingCall(snapshot.val())
				}
			} else {
				setIncomingCall("")
			}
		})
	}, [user])
	return (
		<>
			<Header auth={auth} user={user} setUser={setUser} videoOn={videoOn} />
			<Box w="100%" h="100%">
				{user ? <Contacts user={user} setRoomNumber={setRoomNumber} /> : null}
				<Box bgColor="unset" position="fixed" top="4vh" left="17%" w="83%" h="96vh">
					<Routes>
						{user ? (
							<>
								<Route path="/" element={<ChatPage setVideoOn={setVideoOn} roomNumber={roomNumber} />} />
								<Route path="/settings" element={<UserSettings />} />
								<Route path="/account" element={<Account />} />
								<Route path="/users" element={<UserList />} />
								<Route path="/users/:userId" element={<Account />} />
							</>
						) : (
							<>
								<Route path="/" element={<Home user={user} />} />
								<Route path="/login" element={<Login />} />
								<Route path="/register" element={<Register />} />
							</>
						)}
					</Routes>
				</Box>
				<>
					{videoOn ? (
						<Box
							position="fixed"
							w={videoOn === "full" ? "100%" : "10%"}
							h={videoOn === "full" ? "100%" : "20%"}
							bottom={videoOn === "full" ? "unset" : "6px"}
							left={videoOn === "full" ? "0" : "6px"}
							zIndex="400"
						>
							<Videos roomNumber={roomNumber} videoOn={videoOn} setVideoOn={setVideoOn} />
						</Box>
					) : null}
				</>
				<>
					{incomingCall !== "" && incomingCall !== "joined" ? (
						<Call setIncomingCall={setIncomingCall} incomingCall={incomingCall} setVideoOn={setVideoOn} />
					) : null}
				</>
			</Box>
		</>
	)
}

// : videoMode === "small" ? (
//     <Box position="fixed" w="100%" h="100%" top="36px" left="0">
//         <Videos setVideoOn={setVideoOn} />
//     </Box>
// )
