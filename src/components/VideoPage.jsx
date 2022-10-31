import Videos from "./Videos"
import ChatRoom from "./ChatRoom"
import CurrentRoom from "./CurrentRoom"
import { useState } from "react"

export default function VideoPage() {
	const [videoOn, setVideoOn] = useState(false)

	return (
		<div className="video-container">
			<CurrentRoom />
			{videoOn ? <Videos /> : null}
			<ChatRoom videoOn={videoOn} setVideoOn={setVideoOn} roomNumber="1234" />
		</div>
	)
}
