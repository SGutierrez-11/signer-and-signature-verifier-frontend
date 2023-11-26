"use client";

import TableFiles from "@/components/Tables/TableFiles";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import axios from "axios";
import React from "react";

export default function Home() {
  const [password, setPassword] = React.useState("");

  const instance = axios.create({
    baseURL: "https://signer-verifier-server.onrender.com/api",
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
  });

  const generateKeyBtn = async () => {
    console.log(password);
    await instance
      .post("/key-pair/1/", {
        password: password,
      })
      .then((res: any) => {
        console.log(res);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const importFileBtn = async () => {};

  return (
    <section className="grid gap-4 grid-rows-2">
      <div className="grid grid-cols-3 items-center">
        <div className="w-full justify-c">
          <Input
            value={password}
            label="Password"
            className="max-w-xs"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div className="w-full">
          <Button onClick={generateKeyBtn}>Generate Key</Button>
        </div>
        <div></div>
      </div>
      <div className="grid grid-cols-3 items-center">
        <div>
          <Button onClick={importFileBtn}>Import</Button>
        </div>
        <div></div>
      </div>
      <TableFiles />
    </section>
  );
}
