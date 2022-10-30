import {useState} from 'react'
import {writeChatMessage} from '../functions/FirebaseRTDB'
export default  function SubmitChatButton() {
    const [formValue,setFormValue] = useState("")
    const sendMessage = async(e)=> {
      e.preventDefault()
        writeChatMessage('Dylan',formValue,"1234")
        setFormValue('')
    }
    return (
        <form onSubmit = {sendMessage}>
            <input value = {formValue} onChange = {(e) => setFormValue(e.target.value)} />
            <button type = "submit">Chat </button>
        </form>
    )
} 