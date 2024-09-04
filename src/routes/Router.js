import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyProfile from "../pages/MyPage/MyProfile/MyProfile";

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
        <Route path="/boardwrite" element={<BoardWrite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
