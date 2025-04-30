// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// const VideoUpload = ({ name, label, register, errors, setValue ,modalData}) => {
//   const [video, setVideo] = useState(null);
//   const { editCourse, course } = useSelector((state) => state.course);

//   const handleOnChange = (e) => {
//     const file = e.target.files[0];
//     setValue(name, file);
//     if (file) {
//       const videoURL = URL.createObjectURL(file);
//       setVideo(videoURL);
//     } else {
//       console.log("No file selected");
//     }
//   };
//   // const handleOnChange = (e) => {
//   //   const file = e.target.files[0];
//   //   console.log("video file  ",file);
//   //   if (file) {
//   //     setValue(name, file); // Store file in useForm
//   //     setVideo(file); // Store file as an object
     
//   //   }
//   // };
  

//   useEffect((e) => {
//     if (editCourse) {
//       setVideo(URL.createObjectURL(e.target.files[0]));
//     }
//   }, []); 

//   return (
//     <div>
//       {video ? (
//         <div className="flex flex-col space-y-2">
//           <video
//             src={video}
//             controls
//             className="h-full w-full rounded-md object-cover"
//           />
//           <button
//             type="button"
//             onClick={() => {
//               setVideo(null);
//               setValue(name, null);
//             }}
//             className="text-sm text-richblack-5"
//           >
//             Remove
//           </button>
//         </div>
//       ) :  (
//         <div className="flex flex-col space-y-2">
//           <label className="text-sm text-richblack-5" htmlFor={label}>
//             <div className="mb-2">
//               Course Video <sup className="text-pink-200">*</sup>
//             </div>
//             <div className="bg-richblack-700 flex min-h-[250px] cursor-pointer items-center 
//             justify-center rounded-md border-2 border-dotted border-richblack-500">
//               <div
//                 className="flex w-full flex-col items-center p-6"
//                 role="presentation"
//                 tabIndex={0}
//               >
//                 <input
//                   id={label}
//                   name={name}
//                   type="file"
//                   accept="video/mp4,video/webm,video/ogg"
//                   {...register('name', { required: true })}
//                   onChange={handleOnChange}
//                   className="hidden"
//                 />
//                 <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
//                   <svg
//                     stroke="currentColor"
//                     fill="none"
//                     strokeWidth="2"
//                     viewBox="0 0 24 24"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="text-2xl text-yellow-50"
//                     height="1em"
//                     width="1em"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <polyline points="16 16 12 12 8 16"></polyline>
//                     <line x1="12" y1="12" x2="12" y2="21"></line>
//                     <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
//                     <polyline points="16 16 12 12 8 16"></polyline>
//                   </svg>
//                 </div>
//                 <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
//                   Drag and drop a video, or click to{" "}
//                   <span className="font-semibold text-yellow-50">Browse</span>{" "}
//                   a file
//                 </p>
//                 <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
//                   <li>Supported formats: MP4, WebM, Ogg</li>
//                   <li>Max size: 100MB</li>
//                 </ul>
//               </div>
//             </div>
//           </label>
//           {
//             errors[name] && (
//             <span className="ml-2 text-xs tracking-wide text-pink-200">
//               Course Video is required**
//             </span>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoUpload;


import { useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"
import { useSelector } from "react-redux"

import "video-react/dist/video-react.css"
import { Player } from "video-react"

export default function VideoUpload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const { course } = useSelector((state) => state.course)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  )
  const inputRef = useRef(null)

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      previewFile(file)
      setSelectedFile(file)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
  })

  const previewFile = (file) => {
    console.log(file)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  useEffect(() => {
    register(name, { required: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register])

  useEffect(() => {
    setValue(name, selectedFile)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile, setValue])

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>
      <div
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
      >
        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <Player aspectRatio="16:9" playsInline src={previewSource} />
            )}
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("")
                  setSelectedFile(null)
                  setValue(name, null)
                }}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div
            className="flex w-full flex-col items-center p-6"
            {...getRootProps()}
          >
            <input {...getInputProps()} ref={inputRef} />
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a
              file
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}