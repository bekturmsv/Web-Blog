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
      alert("Error downloading the file");
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
      console.warn("Error in article creation!");
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
      placeholder: "Enter text...",
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
      {/* <Button
        onClick={() => inputImageRef.current.click()}
        variant="outlined"
        size="large"
      >
        {isEditing ? "Change preview" : "Download previews"}
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
            Delete
          </Button>
          <img
            className={styles.image}
            src={`${process.env.REACT_APP_API_URL}${postObj.imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}
      <br />
      <br /> */}
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Article Title..."
        value={postObj.title}
        onChange={(e) => {
          setPostObj({ ...postObj, title: e.target.value });
        }}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Tags:"
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
          {isEditing ? "Save" : "Publish"}
        </Button>
        <a href="/">
          <Button size="large">Cancel</Button>
        </a>
      </div>
    </Paper>
  );
};
