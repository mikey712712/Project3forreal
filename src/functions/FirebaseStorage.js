import { auth, RealTimeDB, storage } from "../App"
import { uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { updateProfile } from "firebase/auth"
import { onValue, set, ref } from "firebase/database"
import { ref as storeRef } from "firebase/storage"

export function updateProfilePicture(uid, file) {
	const storageRef = storeRef(storage, "profilePictures/" + uid) // create a new ref / path for the image
	const metadata = {
		contentType: "image/jpeg",
	}
	// console.log(file)
	const uploadTask = uploadBytesResumable(storageRef, file, metadata)

	uploadTask.on(
		"state_changed",
		(snapshot) => {
			// console.log(snapshot)
			// Observe state change events such as progress, pause, and resume
			// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
			// console.log("Upload is " + progress + "% done")
			switch (snapshot.state) {
				case "paused":
					// console.log("Upload is paused")
					break
				case "running":
					// console.log("Upload is running")
					break
			}
		},
		(error) => {
			// Handle unsuccessful uploads
			// console.log(error.message)
		},
		() => {
			// Handle successful uploads on complete
			// For instance, get the download URL: https://firebasestorage.googleapis.com/...
			getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
				await updateProfile(auth.currentUser, {
					photoURL: downloadURL,
				})
				const userRef = ref(RealTimeDB, `Users/${auth.currentUser.uid}`)
				onValue(
					userRef,
					async (snapshot) => {
						const data = snapshot.val()
						await set(ref(RealTimeDB, `Users/${auth.currentUser.uid}/${Object.keys(data)[0]}/photoURL`), downloadURL)
					},
					{ onlyOnce: true }
				)
			})
		}
	)
}

export function uploadPhotoURL(photoURL) {
	const userRef = ref(RealTimeDB, `Users/${auth.currentUser.uid}`)
	onValue(
		userRef,
		async (snapshot) => {
			const data = snapshot.val()
			await set(ref(RealTimeDB, `Users/${auth.currentUser.uid}/${Object.keys(data)[0]}/photoURL`), photoURL)
		},
		{ onlyOnce: true }
	)
}
