import { Route, Routes } from "react-router-dom";
import MyProfile from "../pages/MyPage/MyProfile/MyProfile";
import MainPage from "../pages/MainPage/MainPage";
import FreeBoard from "../pages/Board/FreeBoard/FreeBoard";
import QuestionBoard from "../pages/Board/QuestionBoard/QuestionBoard";
import NoticeBoard from "../pages/Board/NoticeBoard/NoticeBoard";
import EditProfile from "../pages/MyPage/EditProfile/EditProfile";
import BoardDetail from "../pages/Board/BoardDetail/Board/BoardDetail";
import ProjectBoard from "../pages/Board/ProjectBoard/ProjectBoard";
import Background from "../Layout/Background/Background";
import BoardLayout from "../Layout/BoardLayout/BoardLayout";
import PostForm from "../pages/Board/BoardWrite/PostForm/postForm";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Background />}>
        <Route index element={<MainPage />} />
        <Route path="/board">
          <Route element={<BoardLayout />}>
            <Route path="free" element={<FreeBoard />} />
            <Route path="questions" element={<QuestionBoard />} />
            <Route path="projects" element={<ProjectBoard />} />
            <Route path="notices" element={<NoticeBoard />} />
            <Route path="detail/:postId" element={<BoardDetail />} />
          </Route>
          <Route path="write" element={<PostForm />} />
          <Route path="edit/:postId" element={<PostForm />} />
        </Route>
        <Route path="/my-page">
          <Route element={<BoardLayout isMyPage={true} />}>
            <Route path=":memberId" element={<MyProfile />} />
            <Route path="edit/:memberId" element={<EditProfile />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default Router;
