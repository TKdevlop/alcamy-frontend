import React from "react";
import RegisterPage, { User } from "pages/RegisterPage";
import DashboardPage from "pages/DashboardPage";

const App: React.FC = () => {
  const [user, setUser] = React.useState<User | false>(
    JSON.parse(String(localStorage.getItem("user")))
  );

  return (
    <div className="App">
      {user ? (
        //@ts-ignore
        <DashboardPage currentUser={user} setUser={setUser} />
      ) : (
        //@ts-ignore
        <RegisterPage setUser={setUser} />
      )}
    </div>
  );
};

export default App;
