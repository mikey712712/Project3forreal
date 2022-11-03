import { storage } from "../App"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

export function updateProfilePicture(uid, file) {
	const storageRef = ref(storage, "profilePictures/" + uid) // create a new ref / path for the image
	const metadata = {
		contentType: "image/jpeg",
	}

	const uploadTask = uploadBytesResumable(storageRef, file, metadata)

	uploadTask.on(
		"state_changed",
		(snapshot) => {
			// Observe state change events such as progress, pause, and resume
			// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
			console.log("Upload is " + progress + "% done")
			switch (snapshot.state) {
				case "paused":
					console.log("Upload is paused")
					break
				case "running":
					console.log("Upload is running")
					break
			}
		},
		(error) => {
			// Handle unsuccessful uploads
		},
		() => {
			// Handle successful uploads on complete
			// For instance, get the download URL: https://firebasestorage.googleapis.com/...
			getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
				console.log("File available at", downloadURL)
			})
		}
	)
}
