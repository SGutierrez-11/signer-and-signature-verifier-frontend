"use client";

import TableFiles from "@/components/Tables/TableFiles";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import axios from "axios";
import React from "react";
import { title, subtitle } from '@/components/primitives'
import TableKeys from "@/components/Tables/TableKeys";

export default function Home() {
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

  const importFileBtn = async () => {};

  return (
    <section className="grid gap-4 grid-rows-2">
		<h1 className={title()}>Signer and Signature</h1>
      <div className="grid grid-cols-2 gap-8 items-center justify-content">
        <div className="w-full grid-rows-2">
          <Input
            value={password}
            label="Password"
            className="max-w-xs"
            onChange={({ target }) => setPassword(target.value)}
          />
		  <Button onClick={generateKeyBtn}>Generate Key</Button>
        </div>
               
        <TableKeys data={ data }/>
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
