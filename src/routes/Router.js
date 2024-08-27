import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage";
import FreeBoard from "../pages/FreeBoard";
import QuestionBoard from "../pages/QuestionBoard";
import ProjectBoard from "../pages/ProjectBoard";
import NoticeBoard from "../pages/NoticeBoard";
import MyPage from "../pages/MyPage";
import DetailPage from "../pages/DetailPage";
import AuthPage from "../pages/AuthPage";
import Login from "../components/Feature/Login";
import SignUp from "../components/Feature/SignUp";
import FindUserId from "../components/Feature/FindUserId";
import FindUserPw from "../components/Feature/FindUserPw";

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
        <Route path="/join" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/find-user-id" element={<FindUserId />} />
        <Route path="/find-user-pw" element={<FindUserPw />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
