import React /* useRef, useState */ from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
// import Avatar from "@mui/material/Avatar";
import styles from "./Login.module.scss";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
// import axiosBaseUrl from "../../axios";

export const Registration = () => {
  // const inputImageRef = useRef(null);
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  // const [avatar, setAvatar] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  //
  // const onClickRemoveImage = () => {
  //   setAvatar("");
  // };

  // const handleChangeFile = async (event) => {
  //   try {
  //     const formData = new FormData();
  //     const file = event.target.files[0];
  //     formData.append("image", file);
  //     const { data } = await axiosBaseUrl.post("/upload", formData);
  //     setAvatar(data.url);
  //   } catch (error) {
  //     console.warn(error);
  //     alert("Ошибка при загрузке файла");
  //   }
  // };

  const onSubmit = async (values) => {
    // const data = { ...values, avatarUrl: avatar };
    // console.log(data);
    const user_data = await dispatch(fetchRegister(values));
    if (!user_data.payload) {
      alert("Failed to register!");
    }

    if ("token" in user_data.payload) {
      window.localStorage.setItem("token", user_data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Creating an account
      </Typography>

      <form action="" onSubmit={handleSubmit(onSubmit)}>
        {/* <div className={styles.avatar}>
          <TextField
            type="file"
            ref={inputImageRef}
            onChange={handleChangeFile}
          />
          {avatar && (
            <div className={styles.avatarBlock}>
              <Avatar
                sx={{ width: 100, height: 100 }}
                src={`${process.env.REACT_APP_API_URL}${avatar}`}
              />
              <Button
                variant="contained"
                color="error"
                onClick={onClickRemoveImage}
              >
                Удалить
              </Button>
            </div>
          )}
        </div> */}
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register("fullName", { required: "Enter your full name" })}
          className={styles.field}
          label="Full name"
          fullWidth
        />
        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: "Specify mail" })}
          type="email"
          className={styles.field}
          label="E-Mail"
          fullWidth
        />
        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: "Enter your password" })}
          type="password"
          className={styles.field}
          label="password"
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Sign up
        </Button>
      </form>
    </Paper>
  );
};
