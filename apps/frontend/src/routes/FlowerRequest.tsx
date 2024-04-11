"use client";
import React from "react";
import FlowerCarousel from "@/components/FlowerCarousel.tsx";
import FlowerRequestForm from "@/components/FlowerRequestForm.tsx";
import { trpc } from "@/utils/trpc.ts";
import toast from "react-hot-toast";

export interface FlowerFormFields {
  name: string;
  roomNumber: string;
  message: string;
  flowerChoice: string;
}

export default function FlowerRequest() {
  const [flowerState, setFlowerState] = React.useState<FlowerFormFields>({
    name: "",
    roomNumber: "",
    message: "",
    flowerChoice: "",
  });

  const flowerMutation = trpc.service.createFlowerRequest.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await toast.promise(
      flowerMutation.mutateAsync({
        serviceId: "CCONF001L1",
        flower: flowerState.flowerChoice,
        recipientName: "placeholder",
      }),
      {
        success: "Flower request submitted!",
        loading: "Submitting...",
        error: "Failed to submit flower request",
      },
    );
  };

  return (
    <div className="w-full h-screen flex flex-row px-60 py-64 gap-40 font-inter items-center justify-center">
      <FlowerRequestForm
        flowerState={flowerState}
        setFlowerState={setFlowerState}
        handleSubmit={handleSubmit}
      />
      <FlowerCarousel
        flowerState={flowerState}
        setFlowerState={setFlowerState}
      />
    </div>
  );
}
