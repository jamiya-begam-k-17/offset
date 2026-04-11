import { useParams } from "react-router-dom";

function Category() {
  const { slug } = useParams();

  return <div>Category: {slug}</div>;
}

export default Category;