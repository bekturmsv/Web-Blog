import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {useForm} from "react-hook-form"
import styles from "./Login.module.scss";
import {useDispatch, useSelector} from "react-redux"
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";


export const Login = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()

  const { register, handleSubmit, setError, formState : {errors, isValid} } = useForm({
    defaultValues:{
      email: "auth@auth.com",
      password: "1234567"
    },
    mode : "onChange"
  })

  const onSubmit = (values) => {
    dispatch(fetchAuth(values))
  }

  if(isAuth){
    return <Navigate to="/"/>
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
    <form action="" onSubmit={handleSubmit(onSubmit)}>
        <TextField
        className={styles.field}
        label="E-Mail"
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        {...register("email", {required: "Укажите почту"})}
        fullWidth
        type="email"
      />
      <TextField 
      className={styles.field} 
      label="Пароль" 
      error={Boolean(errors.password?.message)}
      helperText={errors.password?.message}
      fullWidth 
      {...register("password", {required: "Укажите пароль"})}
      />
      <Button type="submit" size="large" variant="contained" fullWidth>
        Войти
      </Button>
    </form>
    </Paper>
  );
};
