import { useState } from "react";
import "./login.css"; 
import axios from 'axios';

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const payload = {
                username: username,
                password: password
            }
            const response = await axios.post("http://localhost:3000/auth/login", payload);
        }catch(err){
            console.log("error occured");
        }
    }

  return (
    <form onSubmit={handleSubmit}>
        <label >Username</label>
        <input type="text" name="username" value={username} onChange={(e) => { setUsername(e.target.value)}}/>
        <label >Password</label>
        <input type="password" value={password} onChange={(e) => { setPassword(e.target.value)}}/>
        <button type="submit">Submit</button>
    </form>
  );
}