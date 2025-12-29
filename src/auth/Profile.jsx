import { supabase } from "../supabaseClient";

export default function Profile({ user }) {
    const logout = async () => {
        await supabase.auth.signOut();
    };

    return (
        <>
            <h2>Profile</h2>
            <p>Email: {user.email}</p>
            <p>ID: {user.id}</p>
            <button onClick={logout}>Logout</button>
        </>
    )
}