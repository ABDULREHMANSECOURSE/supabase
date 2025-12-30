import { useState } from "react";
import { supabase } from "../supabaseClient";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);

    const signup = async () => {
        setLoading(true);

        // 1️⃣ Auth user create
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setLoading(false);
            alert(error.message);
            return;
        }

        // 2️⃣ Profile table me username insert
        const { error: profileError } = await supabase
            .from("profiles")
            .insert({
                id: data.user.id, // auth user ka id
                username: username,
            });

        setLoading(false);

        if (profileError) {
            // unique username error
            if (profileError.code === "23505") {
                alert("Username already taken");
            } else {
                alert(profileError.message);
            }
        } else {
            alert("Signup successful 🎉");
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h3>Signup</h3>

            <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br /><br />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br /><br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br /><br />

            <button onClick={signup} disabled={loading}>
                {loading ? "Signing up..." : "Signup"}
            </button>
        </div>
    );
};

export default Signup;
