import axios from "axios";

const API_URL = "https://signer-verifier-server.onrender.com/api/key-pair";

const getKeys = async () => {
  return await axios.get(API_URL);
};

const GetKeys = {
  getKeys,
};

export default GetKeys;
