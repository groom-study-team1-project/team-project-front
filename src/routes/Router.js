import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyProfile from "../pages/MyPage/MyProfile/MyProfile";
import MainPage from "../pages/MainPage/MainPage";
import FreeBoard from "../pages/FreeBoard/FreeBoard";
import QuestionBoard from "../pages/QuestionBoard/QuestionBoard";
import ProjectBoard from "../pages/QuestionBoard/QuestionBoard";
import NoticeBoard from "../pages/NoticeBoard/NoticeBoard";
import EditProfile from "../pages/MyPage/EditProfile/EditProfile";
import DetailPage from "../pages/DetailPage/DetailPage";
import PostForm from "../pages/PostForm/PostForm";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/community/free" element={<FreeBoard />} />
        <Route path="/community/questions" element={<QuestionBoard />} />
        <Route path="/community/projects" element={<ProjectBoard />} />
        <Route path="/community/notices" element={<NoticeBoard />} />
        <Route path="/my-page" element={<MyProfile />} />
        <Route path="/edit" element={<EditProfile />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/boardwrite" element={<PostForm />} />
        <Route path="/editpost/:postId" element={<PostForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
