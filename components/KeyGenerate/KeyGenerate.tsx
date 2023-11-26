import React from "react";
import axios from "axios";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import TableKeys from "@/components/Tables/TableKeys";

const KeyGenerate = () => {
  const [password, setPassword] = React.useState("");
  const [data, setData] = React.useState([]);

  const instance = axios.create({
    baseURL: "https://signer-verifier-server.onrender.com/api",
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
  });

  const generateKeyBtn = async () => {
    console.log(password);
    await instance
      .post("/key-pair/", {
        password: password,
      })
      .then((res: any) => {
        console.log(res);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  return (
    <div className="flex flex-col items-center gap-5">
      <Input
        value={password}
        label="Password"
        className="max-w-xs"
        onChange={({ target }: any) => setPassword(target.value)}
      />
      <Button onClick={generateKeyBtn} color="primary">
        Generate Key
      </Button>
      <TableKeys />
    </div>
  );
};

export default KeyGenerate;
