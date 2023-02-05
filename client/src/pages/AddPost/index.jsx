import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import axiosBaseUrl from "../../axios";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export const AddPost = () => {
  const { id } = useParams();
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const isEditing = Boolean(id);
  const [postObj, setPostObj] = React.useState({
    title: "",
    tags: "",
    imageUrl: "",
  });

  const inputImageRef = useRef(null);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axiosBaseUrl.post("/upload", formData);
      setPostObj({ ...postObj, imageUrl: data.url });
    } catch (error) {
      console.warn(error);
      alert("Ошибка при загрузке файла");
    }
  };

  const onClickRemoveImage = () => {
    setPostObj({ ...postObj, imageUrl: "" });
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const obj = { ...postObj, text };
      console.log(obj);
      const { data } = isEditing
        ? await axiosBaseUrl.patch(`/posts/${id}`, obj)
        : await axiosBaseUrl.post("/posts", obj);

      const _id = isEditing ? id : data._id;
      navigate(`/posts/${_id}`);
    } catch (error) {
      console.warn("Ошибка при создании статьи!");
    }
  };

  useEffect(() => {
    if (id) {
      axiosBaseUrl
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setPostObj({
            title: data.title,
            tags: data.tags,
            imageUrl: data.imageUrl,
          });
          setText(data.text);
        })
        .catch((err) => {
          console.warn(err);
          alert(err);
        });
    }
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputImageRef.current.click()}
        variant="outlined"
        size="large"
      >
        {isEditing ? "Изменить превью" : "Загрузить превью"}
      </Button>
      <input
        ref={inputImageRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {postObj.imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:5000${postObj.imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={postObj.title}
        onChange={(e) => {
          setPostObj({ ...postObj, title: e.target.value });
        }}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        value={postObj.tags}
        onChange={(e) => {
          setPostObj({ ...postObj, tags: e.target.value });
        }}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? "Сохранить" : "Опубликовать"}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
