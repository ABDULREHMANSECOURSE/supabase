import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const Profile = ({ user }) => {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);

    // 🔁 Load profile data
    useEffect(() => {
        const getProfile = async () => {
            const { data, error } = await supabase
                .from("profiles")
                .select("username")
                .eq("id", user.id)  // user.id = Supabase auth UUID
                .single();

            if (!error && data) {
                setUsername(data.username);
            }
        };

        getProfile();
    }, [user.id]);

    // ✏️ Update username
    const updateUsername = async () => {
        if (!username) {
            alert("Username empty hai");
            return;
        }

        setLoading(true);

        const { error } = await supabase
            .from("profiles")
            .update({ username })
            .eq("id", user.id);

        setLoading(false);

        if (error) {
            if (error.code === "23505") {
                alert("Username already taken ❌");
            } else {
                alert(error.message);
            }
        } else {
            alert("Username updated ✅");
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h3>👤 Profile</h3>

            <p><b>Supabase UID:</b> {user.id}</p>  {/* auth-generated UUID */}
            <p><b>Email:</b> {user.email}</p>

            <br />

            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <br /><br />

            <button onClick={updateUsername} disabled={loading}>
                {loading ? "Updating..." : "Update Username"}
            </button>

            <br /><br />

            <button onClick={() => supabase.auth.signOut()}>
                Logout
            </button>
        </div>
    );
};

export default Profile;
