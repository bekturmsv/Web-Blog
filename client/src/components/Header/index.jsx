import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectIsAuth } from "../../redux/slices/auth";
import { Avatar } from "@mui/material";

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.auth.data);

  const onClickLogout = () => {
    if (window.confirm("Are you sure you want to get out?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>CIFUND</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add">
                  <Button variant="contained">Write an article</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Log out
                </Button>
                <Link to={`/profile/${userData._id}`}>
                  <Avatar
                    className={styles.avatarLogo}
                    sx={{ width: 40, height: 40 }}
                    src={`${process.env.REACT_APP_API_URL}${userData.avatarUrl}`}
                  />
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Create Account</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
