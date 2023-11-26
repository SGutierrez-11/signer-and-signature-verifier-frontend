import React, { useRef, useState } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import { Input } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import SignFile from "@/services/SignFile";

const SingFile = () => {
  const inputSignFile = useRef<HTMLInputElement>(null);
  const inputPrivateFile = useRef<HTMLInputElement>(null);
  const [selectedSignFile, setSelectedSignFile] = useState<File | null>(null);
  const [selectedPrivateFile, setSelectedPrivateFile] = useState<File | null>(
    null
  );

  const [password, setPassword] = useState<string>("");

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const openSignFile = () => {
    inputSignFile.current?.click();
  };

  const openPrivateFile = () => {
    inputPrivateFile.current?.click();
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSignFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedSignFile(file);
      toast.success("File to Sign selected");
    }
  };

  const handlePrivateFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedPrivateFile(file);
      toast.success("Private Key selected");
    }
  };

  const verifyFullFiles = (): boolean => {
    if (selectedSignFile && selectedPrivateFile && password) {
      return true;
    }
    return false;
  };

  const sendFiles = async () => {
    try {
      const signFile = await SignFile.signFile(
        selectedSignFile!,
        selectedPrivateFile!,
        password
      );
      toast.success("File signed successfully");

      if (signFile.signature) {
        const blob = new Blob([signFile.signature], {
          type: "application/octet-stream",
        });
        const url = URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.setAttribute("download", "signedFile.txt");
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      toast.error("Error signing file");
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Sign File
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"2xl"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Sign File
              </ModalHeader>
              <ModalBody>
                <p>
                  In this section you can sign the files you want, you only need
                  the file to sign, the private key and of course, a password.
                </p>
                <div className="flex flex-col justify-center items-center gap-5">
                  <div className="flex flex-row justify-center gap-10 mt-5">
                    <input
                      type="file"
                      id="signFile"
                      ref={inputSignFile}
                      accept=".txt"
                      style={{ display: "none" }}
                      onChange={handleSignFileChange}
                    />
                    <Button onClick={openSignFile} color="primary">
                      Select File
                    </Button>
                    <input
                      type="file"
                      id="privateFile"
                      ref={inputPrivateFile}
                      accept=".txt"
                      style={{ display: "none" }}
                      onChange={handlePrivateFileChange}
                    />
                    <Button onClick={openPrivateFile} color="primary">
                      Select Private Key
                    </Button>
                  </div>
                  <div className="w-[100%] text-center flex flex-row justify-center">
                    <Input
                      fullWidth
                      label="Password"
                      placeholder="Input Password"
                      className="max-w-xs"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  isDisabled={!verifyFullFiles()}
                  onClick={sendFiles}
                  onPress={onClose}
                >
                  Sign File
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SingFile;
