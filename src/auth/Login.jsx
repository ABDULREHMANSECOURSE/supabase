import { useState } from "react";
import { supabase } from "../supabaseClient";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const login = async () => {
        setLoading(true);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            alert(error.message);
        } else {
            alert("Login successful");
            console.log("User:", data.user);
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h3>Login</h3>

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

            <button onClick={login} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>
        </div>
    );
};

export default Login;