import axios from "axios";

const API_URL = "https://signer-verifier-server.onrender.com/api/sign-file/";

const signFile = async (
  file_to_sign: File,
  private_key_file: File,
  password: string
) => {
  const formData = new FormData();
  formData.append("file_to_sign", file_to_sign);
  formData.append("private_key_file", private_key_file);
  formData.append("password", password);
  const response = await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const SignFile = {
  signFile,
};

export default SignFile;
