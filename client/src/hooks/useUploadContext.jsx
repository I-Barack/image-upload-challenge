import { useContext } from "react";
import { UploadContext } from "../contexts/UploadContextUtils";

export const useUploadContext = () => {
  const context = useContext(UploadContext);

  if (!context) {
    throw Error("Out of Context");
  }

  return context;
};
