import { useState, useEffect } from "react"
import { RealTimeDB } from "../App"
import { ref, onValue } from "firebase/database"
import { Text, Flex } from "@chakra-ui/react"
import { RiUserFollowLine, RiUserLine, RiRadioButtonLine } from "react-icons/ri"
import { FiCircle } from "react-icons/fi"
export function StatusTag({ uid }) {
	const [online, setOnline] = useState(false)
	console.log("theuid", uid)
	useEffect(() => {
		return onValue(ref(RealTimeDB, "OnlineStatus/" + uid), (snapshot) => {
			const data = snapshot.val()

			if (snapshot.exists()) {
				setOnline(true)
			} else {
				setOnline(false)
			}
		})
	}, [online])
	return (
		<Flex alignItems="center" color={online ? "#1CA32E" : "#6B6B6B"}>
			<Text float="right" w="fit-content" marginRight="3px">
				{online ? "online" : "offline"}
			</Text>
			{online ? <RiUserFollowLine /> : <RiRadioButtonLine />}
		</Flex>
	)
}
