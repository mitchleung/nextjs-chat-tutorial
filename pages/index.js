import React, { useContext } from "react";
import { Context } from "../context";

import { useRouter } from "next/router";
import axios from "axios";

export default function Auth() {
  const { username, secret, setUsername, setSecret } = useContext(Context);
  const chatEnginePrivateKey = "ad7b9024-51ef-4669-a172-88c444d93e3c";
  const router = useRouter();
  const api = "/api/login";

  const onSubmit = async function onSubmit(e) {
    e.preventDefault();

    if (username.length === 0 || secret.length === 0) return;
    const formData = {
      username: username,
      secret: secret,
    };

    // using fetch
    // const res = await fetch(api, {
    //   method: "POST",
    //   body: JSON.stringify(formData),
    // }).catch((error) => console.log(error));
    // const data = await res.json();
    
    // using axios
    const res = await axios.post(api, formData);
    const data = await res.data;
   
    
    if (data.is_authenticated) {
      router.push("/chats");
    } else {
      console.error(data);
      throw new Error("Failed to login API");
    }
  };

  return (
    <div className="background">
      <div className="auth-container">
        <form className="auth-form" onSubmit={onSubmit}>
          <div className="auth-title">NextJS Chat</div>
          <div className="input-container">
            <input
              placeholder="Email"
              className="text-input"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              className="text-input"
              onChange={(e) => setSecret(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-button">
            Login / Sign-up
          </button>
        </form>
      </div>
    </div>
  );
}
