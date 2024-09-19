import { Route, Routes } from "react-router-dom";
import MyProfile from "../pages/MyPage/MyProfile/MyProfile";
import MainPage from "../pages/MainPage/MainPage";
import FreeBoard from "../pages/Board/FreeBoard/FreeBoard";
import QuestionBoard from "../pages/Board/QuestionBoard/QuestionBoard";
import NoticeBoard from "../pages/Board/NoticeBoard/NoticeBoard";
import EditProfile from "../pages/MyPage/EditProfile/EditProfile";
import DetailPage from "../pages/DetailPage/DetailPage";
import ProjectBoard from "../pages/Board/ProjectBoard/ProjectBoard";
import Background from "../Layout/Background/Background";
import BoardLayout from "../Layout/BoardLayout/BoardLayout";
import WriteBoard from "../pages/WriteBoard/WriteBoard";

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
          <Route path="detail" element={<DetailPage />} />
          <Route path="write" element={<WriteBoard />} />
          <Route path="edit/:postId" element={<WriteBoard />} />
        </Route>
        <Route path="/my-page">
          <Route path=":id" element={<MyProfile />} />
          <Route path="edit" element={<EditProfile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default Router;
