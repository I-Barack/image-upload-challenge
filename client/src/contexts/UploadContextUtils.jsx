import { createContext } from "react";

export const UploadContext = createContext();

// export const modeReducer = (mode, action) => {
// const [turnDark, setturnDark] = useState(false);

//   switch (action.type) {
//     case "DARK":
//       let turnDark = true
//     default:
//   }
// }

export const uploadReducer = (state, action) => {
  switch (action.type) {
    case "SET_UPLOADS":
      return {
        uploads: action.payload,
      };
    case "CREATE_UPLOADS":
      return {
        uploads: [action.payload, ...state.uploads],
      };
    case "DELETE_UPLOAD":
      return {
        uploads: state.uploads.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};
