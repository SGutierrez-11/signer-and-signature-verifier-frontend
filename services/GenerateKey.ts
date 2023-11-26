import axios from "axios";

const API_URL = "https://signer-verifier-server.onrender.com/api/key-pair/";

const generateKey = async (password: string) => {
  return await axios.post(API_URL, { password });
};

const GenerateKey = {
  generateKey,
};

export default GenerateKey;
