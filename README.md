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

# Project Report

## Project Overview

### Signer and Signature Verifier System

The Signer and Signature Verifier System is a project that provides a complete solution for generating RSA key pairs, signing files, and verifying digital signatures. The system is implemented using a frontend built with Next.js, and a backend developed using Django. The communication between the frontend and backend is facilitated through Axios, enabling seamless integration and data exchange.

## Frontend Implementation

The frontend is developed using Next.js, a React framework that allows for efficient component-based UI development. Axios is utilized for making HTTP requests to the Django backend, enabling the frontend to interact with the server seamlessly.

### Key Components

#### 1. Home Page (`/app/page.tsx`)

The home page serves as the main entry point for the application, displaying components for key generation, file signing, and verification.

```jsx
"use client";

import React from "react";
import MainFiles from "@/components/Files/MainFiles";
import KeyGenerate from "@/components/KeyGenerate/KeyGenerate";

export default function Home() {
  return (
    <section>
      <h1 className="text-4xl font-bold flex justify-center mb-10">
        Signer and Signature
      </h1>
      <KeyGenerate />
      <MainFiles />
    </section>
  );
}
```

#### 2. Key Generation Component (`KeyGenerate.tsx`)

This component allows users to generate RSA key pairs by providing a password.

```jsx
import React, { useState, useEffect } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import GenerateKey from "@/services/GenerateKey";
import GetKeys from "@/services/GetKeys";
import TableKeys from "@/components/Tables/TableKeys";
import { toast } from "react-hot-toast";

const KeyGenerate = () => {
  // ... (state and useEffect for fetching keys)

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
```

#### 3. File Signing and Verification Component (`MainFiles.tsx`)

This component serves as the container for the file signing and verification components.

```jsx
import React from "react";
import SingFile from "./SingFile";
import VerifyFile from "./VerifyFile";

const MainFiles = () => {
  return (
    <div>
      <div className="flex flex-row justify-center text-center mt-8 font-bold text-3xl">
        Signer Verify Files
      </div>
      <div className="flex flex-row justify-center gap-5 mt-10 mb-10">
        <SingFile />
        <VerifyFile />
      </div>
    </div>
  );
};

export default MainFiles;
```

#### 4. File Signing Component (`SingFile.tsx`)

This component allows users to sign a file by providing the file to sign, the private key, and a password.

```jsx
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
  // ... (state and useRef for handling file inputs)

  const sendFiles = async () => {
    try {
      const signFile = await SignFile.signFile(
        selectedSignFile!,
        selectedPrivateFile!,
        password
      );
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"2xl"}>
        <ModalContent>
          {/* ... (modal content) */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SingFile;
```

#### 5. File Verification Component (`VerifyFile.tsx`)

This component allows users to verify the signature of a file by providing the original file, the signature file, and the public key.

```jsx
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
  // ... (state and useRef for handling file inputs)

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
          {/* ... (modal content) */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default VerifyFile;
```

### Challenges and Solutions

The development process faced several challenges, including:

1. **Integration of Frontend and Backend:**
   - Challenge: Ensuring seamless communication between the Next.js frontend and Django backend.
   - Solution: Utilizing Axios for HTTP requests, maintaining consistency in data formats, and handling asynchronous operations.

2. **File Handling and Encryption:**
   - Challenge: Properly handling file inputs, managing file uploads, and ensuring secure encryption of private keys.
   - Solution: Implementing file input handling with useRef, utilizing FormData for multipart/form-data requests, and leveraging cryptography libraries for secure RSA key generation and file signing.

3. **User Experience and Error Handling:**
   - Challenge: Providing a smooth user experience and implementing effective error handling.
   - Solution: Utilizing React components to create an intuitive UI, incorporating toasts for user feedback, and implementing comprehensive error handling in the backend.

## Backend Implementation (Django)

### RSA Signature Operations

1. **generate_rsa_key_pair**
   - Generates an RSA key pair with a specified key size, encrypting the private key with a provided password.

2. **sign_file**
   - Signs the content of a file using an RSA private key encrypted with a password.

3. **verify_signature**
   - Verifies if a digital signature corresponds to the original content of a file using an RSA public key.

### Endpoints

#### 1. Generate RSA Key Pair

- Endpoint: `/key-pair/`
- Method: POST
- Generates an RSA key pair and stores the private key protected with a password in the database.

#### 2. Sign File

- Endpoint: `/sign-file/`
- Method: POST
- Signs a file with the private key stored in the database.

#### 3. Verify Signature

- Endpoint: `/verify-signature/`
- Method: POST
- Verifies if the digital signature corresponds to the original file and the provided public key.

#### 4. Delete RSA Key Pair (Optional)

- Endpoint: `/key-pair/{id}/`
- Method: DELETE
- Deletes an RSA key pair from the database by its ID.

### Usage Examples

#### Generate RSA Key Pairs

```bash
curl -X POST -H "Content-Type: application/json" -d '{"password": "your_password"}' http://domain.com/key-pair/
```

#### Sign File

```bash
curl -X POST -H "Content-Type: multipart/form-data" -F "password=your_password" -F "file_to_sign=@/path/to/your/file.txt" -F "private_key_file=@/path/to/your/private_key.pem" http://domain.com/sign-file/
```

#### Verify Signature

```bash
curl -X POST -H "Content-Type: multipart/form-data" -F "original_file=@/path/to/your/original_file.txt" -F "signature_file=@/path/to/your/signature.txt" -F "public_key_file=@/path/to/your/public_key.pem" http://domain.com/verify-signature/
```

#### Delete RSA Key Pair (Optional)

```bash
curl -X DELETE http://domain.com/key-pair/1/
```

Ensure to replace `your-domain.com` with your server's URL.

### Server Setup

To start the server, run the following command:

```bash
python manage.py runserver
```

Gunicorn is also supported:

```bash
gunicorn signer_and_signature_verifier_server.wsgi
```

## Conclusion

The development of the Signer and Signature Verifier System involved overcoming various challenges related to frontend-backend integration, file handling, and user experience. The use of Next.js, Axios, and Django provided a robust foundation for building a secure and efficient application.

The implementation of RSA signature operations, including key pair generation, file signing, and verification, required careful consideration of encryption and decryption processes. Utilizing cryptography libraries and adhering to best practices ensured the security and reliability of these operations.

In conclusion, the Signer and Signature Verifier System is a comprehensive solution for users seeking a secure and user-friendly way to generate RSA key pairs, sign files, and verify digital signatures. The project showcases the effective integration of frontend and backend technologies to deliver a seamless user experience.
