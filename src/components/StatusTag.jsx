import { useState, useEffect } from "react"
import { RealTimeDB } from "../App"
import { ref, onValue } from "firebase/database"
import { Text, Flex } from "@chakra-ui/react"
import { RiRadioButtonLine } from "react-icons/ri"
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
		<Flex alignItems="center" color={online ? "green" : "grey"}>
			<Text float="right" w="fit-content">
				{online ? "online" : "offline"}
			</Text>
			{online ? <RiRadioButtonLine /> : null}
		</Flex>
	)
}
