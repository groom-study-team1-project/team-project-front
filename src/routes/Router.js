import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import FreeBoard from "../pages/FreeBoard";
import QuestionBoard from "../pages/QuestionBoard";
import ProjectBoard from "../pages/ProjectBoard";
import NoticeBoard from "../pages/NoticeBoard";
import MyPage from "../pages/MyPage";
import DetailPage from "../pages/DetailPage";
import AuthPage from "../pages/AuthPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/community/free" element={<FreeBoard />} />
        <Route path="/community/questions" element={<QuestionBoard />} />
        <Route path="/community/projects" element={<ProjectBoard />} />
        <Route path="/community/notices" element={<NoticeBoard />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
