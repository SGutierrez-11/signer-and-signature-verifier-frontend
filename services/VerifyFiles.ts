import axios from "axios";

const API_URL =
  "https://signer-verifier-server.onrender.com/api/verify-signature/";

const verifyFiles = async (
  original_file: File,
  signature_file: File,
  public_key_file: File
) => {
  const formData = new FormData();
  formData.append("original_file", original_file);
  formData.append("signature_file", signature_file);
  formData.append("public_key_file", public_key_file);
  const response = await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const VerifyFiles = {
  verifyFiles,
};

export default VerifyFiles;
