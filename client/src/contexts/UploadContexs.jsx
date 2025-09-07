import { useReducer } from "react";

import { UploadContext, uploadReducer } from "./UploadContextUtils";

export const UploadContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uploadReducer, {
    uploads: [],
  });

  return (
    <UploadContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UploadContext.Provider>
  );
};
