let localStream = null
let remoteStream = null

export default async function openUserMedia(e) {
	const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
	document.querySelector("#localVideo").srcObject = stream
	localStream = stream
	remoteStream = new MediaStream()
	document.querySelector("#remoteVideo").srcObject = remoteStream

	console.log("Stream:", document.querySelector("#localVideo").srcObject)
	document.querySelector("#cameraBtn").disabled = true
	document.querySelector("#joinBtn").disabled = false
	document.querySelector("#createBtn").disabled = false
	document.querySelector("#hangupBtn").disabled = false
}
