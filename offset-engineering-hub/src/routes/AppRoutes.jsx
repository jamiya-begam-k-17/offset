import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home/Home";
import Articles from "../pages/Articles/Articles";
import Category from "../pages/Category/Category";
import Article from "../pages/Article/Article";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/article/:slug" element={<Article />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default AppRoutes;