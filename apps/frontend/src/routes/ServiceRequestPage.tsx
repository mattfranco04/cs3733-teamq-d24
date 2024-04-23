import RequestSummary from "@/components/services/RequestSummary";
import ServiceRequestForm, {
  FormTypes,
} from "@/components/services/ServiceRequestForm";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
// import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation.tsx";
import { motion } from "framer-motion";

export default function ServiceRequestPage() {
  const [variant, setVariant] = useState<FormTypes>("flower");

  return (
    <>
      {/*<BackgroundGradientAnimation className="overflow-hidden -z-10" />*/}
      <div className="absolute bottom-0 left-0 w-full h-full">
        <img src="/wave.svg" alt="Wave" className="absolute bottom-0 left-0 " />
      </div>
      <div className="absolute inset-0 flex flex-row h-[95%] w-[95%] gap-4 items-stretch justify-center pointer-events-auto mx-10 my-6">
        <RequestSummary />
        <div className="flex flex-col gap-4 items-stretch ">
          <Tabs
            value={variant}
            onValueChange={(v) => {
              setVariant(v as FormTypes);
            }}
            className="w-full items-center justify-center bg-transparent"
          >
            <TabsList className="flex-wrap h-full justify-around w-full bg-white/90 backdrop-blur-md shadow-inner rounded shadow-md">
              <TabsTrigger className="flex-1" value="flower">
                Flower Request
              </TabsTrigger>
              <TabsTrigger className="flex-1" value="room">
                Room Request
              </TabsTrigger>
              <TabsTrigger className="flex-1" value="security">
                Security Request
              </TabsTrigger>
              <TabsTrigger className="flex-1" value="av">
                Audio/Visual Request
              </TabsTrigger>
              <TabsTrigger className="flex-1" value="gift">
                Gift Request
              </TabsTrigger>
              <TabsTrigger className="flex-1" value="transport">
                Transport Request
              </TabsTrigger>
              <TabsTrigger className="flex-1" value="it">
                IT Request
              </TabsTrigger>
              <TabsTrigger className="flex-1" value="visitor">
                Visitor Request
              </TabsTrigger>
              <TabsTrigger className="flex-1" value="maintenance">
                Maintenance Request
              </TabsTrigger>
              <TabsTrigger className="flex-1" value="sanitation">
                Sanitation Request
              </TabsTrigger>
              <TabsTrigger className="flex-1" value="religious">
                Religious Request
              </TabsTrigger>
              <TabsTrigger className="flex-1" value="interpreter">
                Interpreter Request
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <motion.div
            key={variant}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, type: "easeOut" }}
            className="pointer-events-auto overflow-auto flex-1"
          >
            <ServiceRequestForm variant={variant} />
          </motion.div>
        </div>
      </div>
    </>
  );
}
