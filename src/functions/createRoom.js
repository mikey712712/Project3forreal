import registerPeerConnectionListeners from "./registerPeerConnectionListeners"
// import firebase from "firebase/compat/app"
import { db } from "../App"
import { collection, doc, setDoc, addDoc } from "firebase/firestore"
// export const db = getFirestore()

const configuration = {
	iceServers: [
		{
			urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
		},
	],
	iceCandidatePoolSize: 10,
}

let peerConnection = null
let localStream = null
let remoteStream = null
let roomDialog = null
let roomId = null

async function createRoom(event) {
	event.preventDefault()
	document.querySelector("#createBtn").disabled = true
	document.querySelector("#joinBtn").disabled = true
	// const db = getFirestore()
	// const db = firebase.firestore()
	// CREATES AN ID FOR THE DOCUMENT INSIDE ROOMS BUT DOES NOT ADD DATA TO FIRESTORE
	const roomRef = doc(collection(db, "rooms"))
	// const romawodom = await setDoc(doc(db, "cities", "LA"), {
	// 	name: "Los Angeles",
	// 	state: "CA",
	// 	country: "USA",
	// })
	// console.log(romawodom)

	console.log(roomRef.id)
	// const roomRef = await db.collection("rooms").doc()

	console.log("Create PeerConnection with configuration: ", configuration)
	peerConnection = new RTCPeerConnection(configuration)

	registerPeerConnectionListeners()

	localStream.getTracks().forEach((track) => {
		peerConnection.addTrack(track, localStream)
	})

	// Code for collecting ICE candidates below
	const callerCandidatesCollection = collection(db, "rooms", roomRef, "callerCandidates")
	const bob = await setDoc(doc(db, callerCandidatesCollection), { name: "m" })
	peerConnection.addEventListener("icecandidate", (event) => {
		if (!event.candidate) {
			console.log("Got final candidate!")
			return
		}
		console.log("Got candidate: ", event.candidate)
		doc(db, "rooms", roomRef, callerCandidatesCollection), event.candidate.toJSON()
	})
	// Code for collecting ICE candidates above

	// Code for creating a room below
	const offer = await peerConnection.createOffer()
	await peerConnection.setLocalDescription(offer)
	console.log("Created offer:", offer)

	const roomWithOffer = {
		offer: {
			type: offer.type,
			sdp: offer.sdp,
		},
	}
	await roomRef.set(roomWithOffer)
	roomId = roomRef.id
	console.log(`New room created with SDP offer. Room ID: ${roomRef.id}`)
	document.querySelector("#currentRoom").innerText = `Current room is ${roomRef.id} - You are the caller!`
	// Code for creating a room above

	peerConnection.addEventListener("track", (event) => {
		console.log("Got remote track:", event.streams[0])
		event.streams[0].getTracks().forEach((track) => {
			console.log("Add a track to the remoteStream:", track)
			remoteStream.addTrack(track)
		})
	})

	// Listening for remote session description below
	roomRef.onSnapshot(async (snapshot) => {
		const data = snapshot.data()
		if (!peerConnection.currentRemoteDescription && data && data.answer) {
			console.log("Got remote description: ", data.answer)
			const rtcSessionDescription = new RTCSessionDescription(data.answer)
			await peerConnection.setRemoteDescription(rtcSessionDescription)
		}
	})
	// Listening for remote session description above

	// Listen for remote ICE candidates below
	roomRef.collection("calleeCandidates").onSnapshot((snapshot) => {
		snapshot.docChanges().forEach(async (change) => {
			if (change.type === "added") {
				let data = change.doc.data()
				console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`)
				await peerConnection.addIceCandidate(new RTCIceCandidate(data))
			}
		})
	})
	// Listen for remote ICE candidates above
}

export default createRoom
