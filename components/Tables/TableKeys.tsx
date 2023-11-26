import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import axios from "axios";

import { Button } from "@nextui-org/button";

interface TableKeysProps {
  data: any[];
}

const TableKeys = ({ data }: TableKeysProps) => {
  const [tableData, setTableData] = useState<string[]>([]);

  const instance = axios.create({
    baseURL: "https://signer-verifier-server.onrender.com/api",
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
  });

  React.useEffect(() => {
    instance
      .get("/key-pair/", {})
      .then((res) => {
        console.log(res);
        setTableData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const downloadKey = (id: string, key: string, type: string) => {
    const blob = new Blob([key], {
      type: "application/octet-stream",
    });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.setAttribute("download", `${type}${id}.txt`);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  };

  const deleteKey = (id: string) => {
    instance.delete(`/key-pair/${id}`).then((res) => {
      console.log(res);

      setTableData((prevData) =>
        prevData.filter((key) => (key as any).id !== id)
      );
    });
  };

  useEffect(() => {}, [tableData]);

  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>KEY ID</TableColumn>
        <TableColumn>TIMESTAMP</TableColumn>
        <TableColumn>PRIVATE KEY</TableColumn>
        <TableColumn>PUBLIC KEY</TableColumn>
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>
      <TableBody>
        {tableData.map((key) => (
          <TableRow key={(key as any).id}>
            <TableCell>{(key as any).id}</TableCell>
            <TableCell>{(key as any).timestamp}</TableCell>
            <TableCell>
              <Button
                className=""
                onClick={() =>
                  downloadKey(
                    (key as any).id,
                    (key as any).private_key,
                    "private"
                  )
                }
              >
                Download
              </Button>
            </TableCell>
            <TableCell>
              <Button
                className=""
                onClick={() =>
                  downloadKey(
                    (key as any).id,
                    (key as any).public_key,
                    "public"
                  )
                }
              >
                Download
              </Button>
            </TableCell>
            <TableCell>
              <Button className="" onClick={() => deleteKey((key as any).id)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableKeys;
