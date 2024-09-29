import { Route, Routes } from "react-router-dom";
import MyProfile from "../pages/MyPage/MyProfile/MyProfile";
import MainPage from "../pages/MainPage/MainPage";
import FreeBoard from "../pages/Board/FreeBoard/FreeBoard";
import QuestionBoard from "../pages/Board/QuestionBoard/QuestionBoard";
import NoticeBoard from "../pages/Board/NoticeBoard/NoticeBoard";
import EditProfile from "../pages/MyPage/EditProfile/EditProfile";
import BoardDetail from "../pages/Board/BoardDetail/BoardDetail";
import ProjectBoard from "../pages/Board/ProjectBoard/ProjectBoard";
import Background from "../Layout/Background/Background";
import BoardLayout from "../Layout/BoardLayout/BoardLayout";
import BoardWrite from "../pages/Board/BoardWrite/BoardWrite";

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
          </Route>
          <Route path="detail/:postId" element={<BoardDetail />} />
          <Route path="write" element={<BoardWrite />} />
          <Route path="edit/:postId" element={<BoardWrite />} />
        </Route>
        <Route path="/my-page">
          <Route element={<BoardLayout isMyPage={true} />}>
            <Route path=":memberId" element={<MyProfile />} />
            <Route path="edit" element={<EditProfile />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default Router;
