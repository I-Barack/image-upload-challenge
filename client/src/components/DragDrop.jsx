import axios from "axios";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useUploadContext } from "../hooks/useUploadContext";
import UploadSVG from "../assets/exit.svg";
import ImageCatalogue from "./ImageCatalogue";

const DragDrop = () => {
  const [loading, setLoading] = useState(false);
  const { uploads, dispatch } = useUploadContext();
  const { mode } = useUploadContext();

  const onDrop = async (acceptedfiles) => {
    const file = acceptedfiles[0];
    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    try {
      const res = await axios.post("/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      dispatch({ type: "CREATE_UPLOADS", payload: res.data });
    } catch (err) {
      console.error("Upload failed", err.response?.data || err.message);
    } finally {
      setLoading(false);
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
    <div className="relative flex">
      <div
        className={`w-full h-screen col-span-3 relative transition duration-700 ${
          mode ? "bg-[#212936]" : "bg-[#f9fafb]"
        } `}
      >
        {loading ? (
          <div className="w-[40%] h-1/2 bg-white absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[65%] cursor-pointer flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg shadow-lg">
            <p className="font-bold">Loading...</p>
            <div></div>
          </div>
        ) : (
          <div
            {...getRootProps()}
            className={`w-[40%] h-1/2 absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[65%] cursor-pointer flex justify-center items-center border border-dashed rounded-lg shadow-lg transition duration-700 ${
              mode ? "bg-[#4d5562] border-[#e5e7eb]" : "bg-[#ffffff]"
            }`}
          >
            <div
              className={`text-center flex flex-col items-center gap-2 transition duration-700 ${
                mode ? "text-[#ffffff]" : "text-[121826]"
              }`}
            >
              <img src={UploadSVG} alt="Upload" />
              <p className="font-bold">
                Drag & Drop a file or click to browse files
              </p>
              <span>JPEG, JPG, PNG or GIF - Max file size 2MB</span>
              <input {...getInputProps()} />
            </div>
          </div>
        )}
      </div>
      {uploads.length > 0 && (
        <div
          className={`h-screen w-1/4 pt-8 px-4 flex flex-col gap-4 overflow-scroll shadow-md transition duration-700 ${
            mode ? "bg-[#4d5562] text-[#ffffff]" : "bg-[#ffffff]"
          }`}
        >
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold">Uploads</h1>
            <i className={`cursor-pointer`}>
              <IoIosArrowForward />
            </i>
          </div>
          {uploads.map((upload) => (
            <ImageCatalogue upload={upload} key={upload._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DragDrop;
