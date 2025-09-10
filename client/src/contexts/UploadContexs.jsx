import { useState, useReducer } from "react";

import { UploadContext, uploadReducer } from "./UploadContextUtils";

export const UploadContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uploadReducer, {
    uploads: [],
  });

  const [mode, setMode] = useState(false);

  return (
    <UploadContext.Provider value={{ ...state, dispatch, mode, setMode }}>
      {children}
    </UploadContext.Provider>
  );
};
