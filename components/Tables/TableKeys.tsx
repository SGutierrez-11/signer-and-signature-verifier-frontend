import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

import { Button } from "@nextui-org/button";

import DeleteKey from "@/services/DeleteKey";
import { toast } from "react-hot-toast";

interface TableKeysProps {
  data: any[];
  onUpdateDeleteKey: (id: string) => void;
}

const TableKeys = ({ data, onUpdateDeleteKey }: TableKeysProps) => {
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

  const deleteKey = async (id: string) => {
    try {
      await DeleteKey.deleteKey(id);
      toast.success("Key deleted");
      onUpdateDeleteKey(id);
    } catch (error) {
      toast.error("Error deleting key");
    }
  };

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
        {data.map((key) => (
          <TableRow key={(key as any).id}>
            <TableCell>{(key as any).id}</TableCell>
            <TableCell>{(key as any).timestamp}</TableCell>
            <TableCell>
              <Button
                color="primary"
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
                color="primary"
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
              <Button color="danger" onClick={() => deleteKey((key as any).id)}>
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
