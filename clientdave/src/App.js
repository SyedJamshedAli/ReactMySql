import RegisterUser from "./RegisterUser";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Editor from "./components/Editor";
import Admin from "./components/Admin";
import Missing from "./components/Missing";
import Lounge from "./components/Lounge";
import LinkPage from "./components/LinkPage";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/RequireAuth";
import Register from "./RegisterUser";
import Unauthorize from "./components/Unauthorize";

const roleList = {
  admin: 1,
  editor: 2,
  user: 3,
};
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorize />} />

        {/* Protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[roleList.user]} />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[roleList.editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[roleList.user]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route
            element={
              <RequireAuth
                allowedRoles={[roleList.editor, roleList.admin, roleList.user]}
              />
            }
          >
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route>
        {/* Catch all */}
        <Route path="missing" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
