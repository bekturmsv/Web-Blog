import Container from "@mui/material/Container";
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAuthMe } from "./redux/slices/auth";

function App() {

  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(fetchAuthMe())
  },[])

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home/>}/> 
          <Route path="/posts/:id" element={<FullPost/>} />
          <Route path="/posts/:id/edit" element={<AddPost/>} />
          <Route path="/add" element={<AddPost/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Registration/>} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
