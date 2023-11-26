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

import { toast } from "react-hot-toast";
import VerifyFiles from "@/services/VerifyFiles";

const VerifyFile = () => {
  const inputOriginalFile = useRef<HTMLInputElement>(null);
  const inputSignFile = useRef<HTMLInputElement>(null);
  const inputPublicKey = useRef<HTMLInputElement>(null);
  const [selectedSignFile, setSelectedSignFile] = useState<File | null>(null);
  const [selectedPublicKey, setSelectedPublicKey] = useState<File | null>(null);
  const [selectedOriginalFile, setSelectedOriginalFile] = useState<File | null>(
    null
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const openOriginalFile = () => {
    inputOriginalFile.current?.click();
  };

  const openSignFile = () => {
    inputSignFile.current?.click();
  };

  const openPublicKey = () => {
    inputPublicKey.current?.click();
  };

  const handleSignFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedSignFile(file);
      toast.success("File to Sign selected");
    }
  };

  const handlePublicKeyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedPublicKey(file);
      toast.success("Public Key selected");
    }
  };

  const handleOriginalFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedOriginalFile(file);
      toast.success("Original File selected");
    }
  };

  const validateFullFiles = (): boolean => {
    if (selectedSignFile && selectedPublicKey && selectedOriginalFile) {
      return true;
    } else {
      return false;
    }
  };

  const sendFiles = async () => {
    try {
      const verifyFile = await VerifyFiles.verifyFiles(
        selectedOriginalFile!,
        selectedSignFile!,
        selectedPublicKey!
      );
      toast.success(verifyFile?.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response.data.error);
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Verify File
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"2xl"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                File Verification
              </ModalHeader>
              <ModalBody>
                <p>
                  This function verifies if a digital signature corresponds to
                  the original content of a file using an RSA public key.
                </p>
                <div className="flex flex-row justify-center gap-5 mt-5">
                  <input
                    type="file"
                    id="signFile"
                    ref={inputOriginalFile}
                    accept=".txt"
                    style={{ display: "none" }}
                    onChange={handleOriginalFileChange}
                  />
                  <Button color="primary" onClick={openOriginalFile}>
                    Original File
                  </Button>
                  <input
                    type="file"
                    id="signFile"
                    ref={inputSignFile}
                    accept=".txt"
                    style={{ display: "none" }}
                    onChange={handleSignFileChange}
                  />
                  <Button color="primary" onClick={openSignFile}>
                    Signature File
                  </Button>
                  <input
                    type="file"
                    id="signFile"
                    ref={inputPublicKey}
                    accept=".txt"
                    style={{ display: "none" }}
                    onChange={handlePublicKeyChange}
                  />
                  <Button color="primary" onClick={openPublicKey}>
                    Public Key
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  isDisabled={!validateFullFiles()}
                  onPress={onClose}
                  onClick={sendFiles}
                >
                  Verify Sign
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default VerifyFile;
