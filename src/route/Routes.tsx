import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import { CoursesPage } from "../pages/lecture/Lectures";
import { CoursesDetail } from "../pages/lecture/LectureDetail";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={App} />
        <Route path="/courses" Component={CoursesPage} />
        <Route path="/courses/:id" Component={CoursesDetail} />
      </Routes>
    </BrowserRouter>
  );
};
