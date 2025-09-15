import axios from "axios";
import { useUploadContext } from "../hooks/useUploadContext";

const ImageCatalogue = ({ upload }) => {
  const { dispatch } = useUploadContext();

  const deleteHandler = async () => {
    try {
      const res = await axios.delete(`api/uploads/${upload._id}`);
      dispatch({ type: "DELETE_UPLOAD", payload: res.data });
    } catch (error) {
      console.log("Couldn't delete image", error);
    }
  };

  return (
    <div className="flex align-center gap-4 ">
      <img
        src={upload.imageUrl}
        className="h-20 w-20 rounded-md hover:scale-75 hover:transform-500ms"
      ></img>
      <button onClick={deleteHandler} className="cursor-pointer">
        delete
      </button>
    </div>
  );
};

export default ImageCatalogue;
