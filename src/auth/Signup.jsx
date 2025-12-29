import React, { useState } from 'react'
import { supabase } from '../supabaseClient';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signup = async () => {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) alert(error.message);
        else alert("Signup successful")
    }
    return (
        <>
            <h3>Signup</h3>
            <input type="email" placeholder='Email' onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder='Password' onChange={e => setPassword(e.target.value)} />
            <button onClick={signup}>Signup</button>
        </>
    )
}
export default Signup