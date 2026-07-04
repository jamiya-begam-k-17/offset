import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Articles from "../pages/Articles/Articles";
import Category from "../pages/Category/Category";
import Article from "../pages/Article/Article";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardArticles from "../pages/Dashboard/DashboardArticles";
import ArticleEditor from "../pages/Dashboard/ArticleEditor";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/article/:slug" element={<Article />} />
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/articles" element={<ProtectedRoute><DashboardArticles /></ProtectedRoute>} />
          <Route path="/dashboard/new" element={<ProtectedRoute><ArticleEditor /></ProtectedRoute>} />
          <Route path="/dashboard/edit/:id" element={<ProtectedRoute><ArticleEditor /></ProtectedRoute>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default AppRoutes;

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "../components/Layout/Layout";
// import Home from "../pages/Home/Home";
// import Articles from "../pages/Articles/Articles";
// import Category from "../pages/Category/Category";
// import Article from "../pages/Article/Article";

// function AppRoutes() {
//   return (
//     <BrowserRouter>
//       <Layout>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/articles" element={<Articles />} />
//           <Route path="/category/:slug" element={<Category />} />
//           <Route path="/article/:slug" element={<Article />} />
//         </Routes>
//       </Layout>
//     </BrowserRouter>
//   );
// }

// export default AppRoutes;