import { Route, Routes } from "react-router-dom";
import MyProfile from "../pages/MyPage/MyProfile/MyProfile";
import MainPage from "../pages/MainPage/MainPage";
import FreeBoard from "../pages/FreeBoard/FreeBoard";
import QuestionBoard from "../pages/QuestionBoard/QuestionBoard";
import NoticeBoard from "../pages/NoticeBoard/NoticeBoard";
import EditProfile from "../pages/MyPage/EditProfile/EditProfile";
import DetailPage from "../pages/DetailPage/DetailPage";
import PostForm from "../pages/PostForm/PostForm";
import ProjectBoard from "../pages/ProjectBoard/ProjectBoard";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/community">
        <Route path="free" element={<FreeBoard />} />
        <Route path="questions" element={<QuestionBoard />} />
        <Route path="projects" element={<ProjectBoard />} />
        <Route path="notices" element={<NoticeBoard />} />
      </Route>
      <Route path="/my-page/:id" element={<MyProfile />} />
      <Route path="/edit" element={<EditProfile />} />
      <Route path="/detail" element={<DetailPage />} />
      <Route path="/boardwrite" element={<PostForm />} />
      <Route path="/editpost/:postId" element={<PostForm />} />
    </Routes>
  );
}

export default Router;
