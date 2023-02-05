import React, { useState, useEffect, useRef } from "react";
import { Avatar, Button } from "@material-ui/core";
import axiosBaseUrl from "../../axios";
import { makeStyles } from "@material-ui/core/styles";
import "./Profile.css";
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(17),
    height: theme.spacing(17),
    margin: "auto",
  },
  inp: {
    margin: "15px",
    color: "#000",
  },
}));

const Profile = () => {
  const inputImageRef = useRef(null);

  const userData = useSelector((state) => state.auth.data);
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [isEdit, setEdit] = useState(false);

  async function showProfile() {
    const { data } = await axiosBaseUrl(`/auth/profile`);
    setUser(data);
  }

  const onClickRemoveImage = () => {
    setUser({ ...user, avatarUrl: "" });
  };

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axiosBaseUrl.post("/upload", formData);
      setUser({ ...user, avatarUrl: data.url });
    } catch (error) {
      console.warn(error);
      alert("Ошибка при загрузке файла");
    }
  };

  useEffect(() => {
    showProfile();
  }, []);

  async function saveDb() {
    await axiosBaseUrl.patch(`/auth/profile/${userData._id}`, user);
    console.log(user);
    setEdit(false);
    console.log("Save db");
  }
  console.log(user);
  return (
    <div className="copy-body">
      <div className="main">
        <div className="row">
          {!isEdit ? (
            <>
              <div>
                <div className="ava">
                  <Avatar
                    alt="Remy Sharp"
                    src={`http://localhost:5000${user.avatarUrl}`}
                    className={classes.large}
                  />
                  <span className="nick">{user.name}</span>
                </div>
                <div className="info">
                  Full Name:
                  <input type="text" disabled value={user.fullName} />
                  Email:
                  <input type="text" disabled value={user.email} />
                </div>
              </div>
            </>
          ) : (
            <>
              <div container spacing={3}>
                <div className="ava">
                  <Avatar
                    alt="Remy Sharp"
                    className={classes.large}
                    src={`http://localhost:5000${user.avatarUrl}`}
                  />
                  <input
                    type="file"
                    ref={inputImageRef}
                    onChange={handleChangeFile}
                  />
                  {user.avatarUrl ? (
                    <button onClick={onClickRemoveImage}>удалить фото</button>
                  ) : (
                    ""
                  )}
                </div>
                <div className="info">
                  <input
                    type="text"
                    onChange={(e) => {
                      setUser({ ...user, fullName: e.target.value });
                    }}
                    value={user.fullName}
                  />
                  <input
                    type="text"
                    onChange={(e) => {
                      setUser({ ...user, email: e.target.value });
                    }}
                    value={user.email}
                  />
                </div>
              </div>
            </>
          )}
          {isEdit ? (
            <Button variant="contained" color="primary" onClick={saveDb}>
              SAVE
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setEdit(true)}
            >
              EDIT
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
