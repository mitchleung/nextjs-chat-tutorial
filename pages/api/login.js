
export default async function loginHandle(req, res) {

  // using fetch
  // const { username, secret } = JSON.parse(req.body);

  // using axios
  const { username, secret } = req.body;

  if (req.method !== "POST" || username.length === 0 || secret.length === 0) {
    return res.status(401).json({ message: "Missing username or password" });
  }

  const response = await fetch(process.env.CHAT_ENGINE_USER_API, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "PRIVATE-KEY": process.env.CHAT_ENGINE_PRIVATE_KEY,
    },
    body: JSON.stringify({
      username: username,
      secret: secret,
    }),
  });

  const json = await response.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  console.log("result", json);

  res.status(200).send({ is_authenticated: json?.is_authenticated });
}
