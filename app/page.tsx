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
