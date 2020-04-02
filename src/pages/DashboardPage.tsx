import React from "react";
import { AppBar, Typography, Toolbar, Button } from "@material-ui/core";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { User } from "pages/RegisterPage";
interface Props extends RouteComponentProps {
  currentUser: User;
  setUser: (user: User | false) => void;
}
const DashboardPage: React.FC<Props> = props => {
  return (
    <div>
      <AppBar style={{ background: "#00acc1" }} position="fixed">
        <Toolbar>
          <Typography style={{ flex: 1 }} variant="h6" noWrap>
            DASHBOARD
          </Typography>
          <Button
            onClick={() => {
              localStorage.removeItem("user");
              props.setUser(false);
            }}
            color="inherit"
          >
            LOGOUT
          </Button>
        </Toolbar>
      </AppBar>
      <div style={{ marginTop: 75, textAlign: "center" }}>
        <h1>WELCOME TO DASHBOARD</h1>
      </div>
    </div>
  );
};
export default withRouter(DashboardPage);
