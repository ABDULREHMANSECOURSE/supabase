import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const Profile = ({ user }) => {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        setLoading(true);

        const { data, error } = await supabase
            .from("profiles")
            .select("username")
            .eq("id", user.id)
            .single();

        setLoading(false);

        if (error) {
            alert(error.message);
        } else {
            setUsername(data.username);
        }
    };

    const logout = async () => {
        await supabase.auth.signOut();
    };

    if (loading) {
        return <p>⏳ Loading profile...</p>;
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>👤 Profile</h2>

            <p><b>Username:</b> {username}</p>
            <p><b>Email:</b> {user.email}</p>

            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Profile;
