import axios from "axios";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdCloudUpload } from "react-icons/md";
import { useUploadContext } from "../hooks/useUploadContext";
import ImageCatalogue from "./ImageCatalogue";
import Navbar from "./Navbar";

const DragDrop = () => {
  const [loading, setLoading] = useState(false);
  const { uploads, dispatch } = useUploadContext();
  const onDrop = async (acceptedfiles) => {
    setLoading(true);
    const file = acceptedfiles[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res.data);

      dispatch({ type: "CREATE_UPLOADS", payload: res.data });
    } catch (err) {
      console.error("Upload failed", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const res = await axios.get("/uploads");
        console.log(res.data);

        dispatch({ type: "SET_UPLOADS", payload: res.data });
      } catch (err) {
        console.error("Failed:", err);
      }
    };

    fetchUploads();
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif"] },
    multiple: false,
  });

  return (
    <div className="relative">
      <Navbar />
      <div className="w-full h-screen relative bg-[#f3f3f3]">
        {!loading ? (
          <div
            {...getRootProps()}
            className="w-2/4 h-1/2 bg-white absolute top-[50%] left-[50%] transform -translate-[50%] p-2 cursor-pointer flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg shadow-lg"
          >
            <div className="text-center flex flex-col items-center gap-2">
              <MdCloudUpload size={30} />
              <p className="font-bold">
                Drag & Drop a file or click to browse files
              </p>
              <span>JPEG, JPG, PNG or GIF - Max file size 2MB</span>
              <input {...getInputProps()} />
            </div>
          </div>
        ) : (
          <div className="w-2/4 h-1/2 bg-white absolute top-[50%] left-[50%] transform -translate-[50%] p-2 cursor-pointer flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg shadow-lg">
            <p className="font-bold">Loading...</p>
            <div></div>
          </div>
        )}
      </div>
      {uploads.lenght < 1 && (
        <div className="h-screen w-1/4 p-8 grid gap-4 overflow-scroll">
          <h1 className="text-3xl font-bold">Uploads</h1>
          {uploads.map((upload) => (
            <ImageCatalogue upload={upload} key={upload._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DragDrop;
