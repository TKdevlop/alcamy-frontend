export default async (
  input: string,
  auth?: boolean,
  settings: RequestInit = {}
) => {
  let url = input;
  const { headers, ...remainingSettings } = settings;
  const baseURL =
    process.env.NODE_ENV === "production"
      ? "https://alcamy-project.herokuapp.com"
      : "http://localhost:4000";
  if (url.includes("http")) url = input;
  else url = `${baseURL}/${input}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(auth && {
        token: JSON.parse(String(localStorage.getItem("user"))).token
      }),
      ...headers
    },
    ...remainingSettings
  });

  return response.json();
};
