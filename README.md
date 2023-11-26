# Singer and Signature client documentation

## Project Description

The project aims to facilitate the generation and signing of files using RSA key pairs. It encompasses the following functionalities:

1. **RSA Key Pair Generation:**
   - Generation of public and private keys stored in separate files.
   - The private key is protected by a password.

2. **File Signing:**
   - Enables the signing of any file using an RSA private key encrypted and password-protected.

3. **Signature Verification:**
   - Verifies if a digital signature corresponds to the original content of a file using an RSA public key.

## General Architecture

- The frontend is built with Next.js, utilizing React components and state management.
- Axios is employed for HTTP requests from the frontend to the Django backend.
  
## Technologies Used

- **Next.js and Axios:**
  - Next.js for component-based UI development and React state management.
  - Axios for handling HTTP requests between the frontend and Django backend.

- **Specific Libraries:**
  - The `generar_par_clave_rsa` function is utilized to generate RSA key pairs.
  - Other functions like `firmar_archivo` and `verificar_firma` are designed for file signing and verification.

## Requests to Django Server

Example of a POST request to generate a key pair:

```javascript
const instance = axios.create({
  baseURL: "https://signer-verifier-server.onrender.com/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

const generateKeyBtn = async () => {
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
```

## File Signing and RSA Key Pairs

Example of a component allowing the user to sign a file:

```javascript
import React, { useRef, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import SignFile from "@/services/SignFile";

const SingFile = () => {
  // ... (previous code)

  const sendFiles = async () => {
    try {
      const signFile = await SignFile.signFile(selectedSignFile!, selectedPrivateFile!, password);
      toast.success("File signed successfully");

      if (signFile.signature) {
        // ... (code to download the signed file)
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
      {/* ... (modal code) */}
    </>
  );
};
```

## Verifying Signed Files

Example of a component allowing the user to verify the signature of a file:

```javascript
import React, { useRef, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import VerifyFiles from "@/services/VerifyFiles";

const VerifyFile = () => {
  // ... (previous code)

  const sendFiles = async () => {
    try {
      const verifyFile = await VerifyFiles.verifyFiles(selectedOriginalFile!, selectedSignFile!, selectedPublicKey!);
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
      {/* ... (modal code) */}
    </>
  );
};
```

# Next.js & NextUI Template

This is a template for creating applications using Next.js 13 (app directory) and NextUI (v2).

## Technologies Used

- [Next.js 13](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## How to Use


### Use the template with create-next-app

To create a new project based on this template using `create-next-app`, run the following command:

```bash
npx create-next-app -e https://github.com/nextui-org/next-app-template
```

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

## License

Licensed under the [MIT license](https://github.com/nextui-org/next-app-template/blob/main/LICENSE).
