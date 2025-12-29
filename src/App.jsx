import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Profile from "./auth/Profile";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  if (user) {
    return <Profile user={user} />;
  }

  return (
    <>
      <Login />
      <Signup />
    </>
  );
}
