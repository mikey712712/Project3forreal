# QuickChat

QuickChat is a full-stack single-page web application featuring video call and text messaging capabilities between users of the app. All friend requests, online statuses, messages, and incoming/outgoing calls are updated and displayed for all current users in real time. The messaging component also supports the sending of images/gifs and features a built in emoji picker.

Deployed Site: https://quickchat-video.netlify.app

## <br>**Technologies**

The frontend was created using React/Vite employing Chakra-UI for styling, with Firebase acting as the backend, the backend to frontend communication functionality was written in JavaScript. Real time updates were implemented using Web Real-Time Communication (WebRTC) to store peer connection info into Firebase's RealtimeDB. User authentication was implemented through FirebaseAuth. All other non-sensitive data was stored in Firebase's FireStore. The app is deployed through Netlify.
