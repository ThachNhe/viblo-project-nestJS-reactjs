import axios from "../axios";

const createComment = (body) => {
  return axios.post("/comment", body);
};

// const getPostById = (id) => {
//   return axios.get("/post", {
//     params: {
//       id: id,
//     },
//   });
// };

export { createComment };
