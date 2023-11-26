import axios from "axios";

const API_URL = "https://signer-verifier-server.onrender.com/api/key-pair/";

const deleteKey = async (id: string) => {
  return axios.delete(`${API_URL}${id}/`);
};

const DeleteKey = {
  deleteKey,
};

export default DeleteKey;
