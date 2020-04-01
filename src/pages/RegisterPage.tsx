import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  CssBaseline,
  FormControl,
  TextField,
  Paper,
  Link,
  Theme
} from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { useSnackbar } from "notistack";
//assets
import BG3 from "assets/full-screen-image-3.jpg";
import httpClient from "components/httpClient";
import { withStyles, WithStyles } from "@material-ui/core/styles";

const styles = (theme: Theme) => ({
  outerDiv: {
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: `url(${BG3}) no-repeat center`,
    backgroundSize: "cover",
    backgroundColor: "rgba(0,0,0)"
  },
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    },
    animation: "1s ease-in bounceInDown"
  },
  anime: {
    transform: "translateY(0vh)"
  },

  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(4)}px ${theme.spacing(5)}px ${theme.spacing(5)}px`
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2)
  },
  submit: {
    marginTop: theme.spacing(3)
  },
  wrapper: {
    margin: theme.spacing(2),
    position: "relative"
  },
  buttonProgress: {
    position: "absolute",
    top: "68%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});
export interface User {
  email: string;
  token: string;
}
interface Props extends RouteComponentProps, WithStyles {
  setUser: (user: User | false) => void;
}
const userDataSchema = {
  email: "",
  password: "",
  confirmPassword: ""
};
const userFormErrorStateSchema = {
  email: {
    error: false,
    msg: ""
  },
  password: {
    error: false,
    msg: ""
  },
  confirmPassword: {
    error: false,
    msg: ""
  }
};
const Login: React.FC<Props> = props => {
  const { classes } = props;
  const [formState, setFormState] = useState<"register" | "login">("register");
  const [formErrorState, setFormErrorState] = useState<any>(
    userFormErrorStateSchema
  );
  const [userData, setUserData] = useState(userDataSchema);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const handleChange = ({
    target: { value, name }
  }: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [name]: value });
  };
  const toggleFormState = () => {
    if (formState === "register") {
      setFormState("login");
    } else {
      setFormState("register");
    }
  };
  const validateUserInput = (): boolean | any => {
    let errorObj: any = {};
    let hasError = false;
    for (const [key, value] of Object.entries(userData)) {
      if (formState === "login" && key === "confirmPassword") continue;
      if (value.trim() === "") {
        hasError = true;
        errorObj[key] = {
          error: true,
          msg: "Field Cannot Be Empty"
        };
      } else {
        errorObj[key] = {
          error: false,
          msg: ""
        };
      }
    }
    if (hasError === true) return errorObj;

    return true;
  };
  const logOrRegisterUserIn = async () => {
    const result = validateUserInput();
    if (result !== true) {
      setFormErrorState(result);
      return;
    }
    setLoading(true);
    try {
      const res = await httpClient(
        formState === "register" ? "register" : "login",
        false,
        {
          method: "POST",
          body: JSON.stringify({
            email: userData.email,
            password: userData.password,
            ...(formState === "register" && {
              confirmPassword: userData.confirmPassword
            })
          })
        }
      );
      if (res.success) {
        setLoading(false);
        props.history.push("/dashboard");
        props.setUser({
          email: userData.email,
          token: res.token
        });
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: userData.email,
            token: res.token
          })
        );
        enqueueSnackbar(`Welcome to the Dashboard`, {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right"
          },
          action: (
            <Button style={{ color: "#fff" }} size="small">
              {"Dismiss"}
            </Button>
          )
        });
      } else {
        setLoading(false);
        enqueueSnackbar(res.msg, {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right"
          },
          action: (
            <Button style={{ color: "#fff" }} size="small">
              {"Dismiss"}
            </Button>
          )
        });
        console.log("auth failed");
      }
    } catch (e) {
      setLoading(false);
    }
  };
  return (
    <div className={classes.outerDiv}>
      <main className={classes.main}>
        <CssBaseline />
        <Paper elevation={12} className={classes.paper}>
          <h2>{formState === "register" ? "SIGN UP" : "SIGN IN"}</h2>
          <form className={classes.form}>
            <FormControl margin="normal" fullWidth>
              <TextField
                {...{
                  ...(formErrorState.email.error && {
                    error: true,
                    helperText: formErrorState.email.msg
                  })
                }}
                placeholder="Enter your email"
                label="Email*"
                name="email"
                type="email"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <TextField
                {...{
                  ...(formErrorState.password.error && {
                    error: true,
                    helperText: formErrorState.password.msg
                  })
                }}
                placeholder="Enter your password"
                type="password"
                label="Password*"
                name="password"
                onChange={handleChange}
              />
            </FormControl>
            {formState === "register" && (
              <FormControl margin="normal" fullWidth>
                <TextField
                  {...{
                    ...(formErrorState.confirmPassword.error && {
                      error: true,
                      helperText: formErrorState.confirmPassword.msg
                    })
                  }}
                  placeholder="Confrim your password"
                  type="password"
                  label="Confirm Password*"
                  name="confirmPassword"
                  onChange={handleChange}
                />
              </FormControl>
            )}
            <div style={{ textAlign: "right", cursor: "pointer" }}>
              <Link onClick={toggleFormState}>
                {formState === "register"
                  ? "Already Register Login Instead"
                  : "New User Register Here"}
              </Link>
            </div>
            <div className={classes.wrapper}>
              <Button
                onClick={logOrRegisterUserIn}
                type="button"
                variant="contained"
                color="primary"
                fullWidth
                className={classes.submit}
                disabled={loading}
              >
                {formState.toUpperCase()}
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </form>
        </Paper>
      </main>
    </div>
  );
};

//@ts-ignore
export default withRouter(withStyles(styles)(Login));
