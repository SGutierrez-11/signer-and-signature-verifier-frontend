import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";

import { DeleteDocumentIcon } from "./DeleteDocumentIcon";
import { TagIcon } from "./TagIcon";

import { Button } from "@nextui-org/button";

import DeleteKey from "@/services/DeleteKey";
import { toast } from "react-hot-toast";

interface TableKeysProps {
  data: any[];
  onUpdateDeleteKey: (id: string) => void;
}

const TableKeys = ({ data, onUpdateDeleteKey }: TableKeysProps) => {
  const [page, setPage] = useState<number>(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

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
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader>
        <TableColumn>KEY ID</TableColumn>
        <TableColumn>TIMESTAMP</TableColumn>
        <TableColumn>PRIVATE KEY</TableColumn>
        <TableColumn>PUBLIC KEY</TableColumn>
        <TableColumn>ACTIONS</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{(item as any).timestamp}</TableCell>
            <TableCell>
              <Tooltip content="Download">
                <Button
                  className="bg-transparent"
                  onClick={() =>
                    downloadKey(
                      (item as any).id,
                      (item as any).private_key,
                      "private"
                    )
                  }
                >
                  <TagIcon className="text-3xl text-primary" />
                </Button>
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip content="Download">
                <Button
                  className="bg-transparent"
                  onClick={() =>
                    downloadKey(
                      (item as any).id,
                      (item as any).public_key,
                      "public"
                    )
                  }
                >
                  <TagIcon className="text-3xl text-secondary" />
                </Button>
              </Tooltip>
            </TableCell>
            <TableCell>
              <Tooltip content="Delete">
                <Button
                  onClick={() => deleteKey((item as any).id)}
                  className="bg-transparent"
                >
                  <DeleteDocumentIcon className="text-3xl text-red-500" />
                </Button>
              </Tooltip>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TableKeys;
