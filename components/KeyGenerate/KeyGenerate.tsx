import React, { useState, useEffect } from "react";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import GenerateKey from "@/services/GenerateKey";
import GetKeys from "@/services/GetKeys";
import TableKeys from "@/components/Tables/TableKeys";

import { toast } from "react-hot-toast";

const KeyGenerate = () => {
  const [password, setPassword] = useState("");

  const [data, setData] = useState<any[]>([]);

  const fetchKeys = async () => {
    try {
      const response = await GetKeys.getKeys();
      setData(response.data);
    } catch (error) {
      toast.error("Error fetching keys");
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const generateKeyBtn = async () => {
    try {
      const newKey = await GenerateKey.generateKey(password);

      setData((prevData: any) => [...prevData, newKey.data]);
      toast.success("Key generated");
    } catch (error) {
      toast.error("Error generating key");
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <Input
        value={password}
        label="Password"
        className="max-w-xs"
        onChange={handlePasswordChange}
      />
      <Button onClick={generateKeyBtn} color="primary">
        Generate Key
      </Button>
      <TableKeys data={data} />
    </div>
  );
};

export default KeyGenerate;
