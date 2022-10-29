import { Button } from "@chakra-ui/react"
export default function VideoButton({ btnId, btnOnClick, spanText }) {
	return (
		<Button colorScheme="teal" onClick={btnOnClick} id={btnId}>
			{spanText}
		</Button>
	)
}
