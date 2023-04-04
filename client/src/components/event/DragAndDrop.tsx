import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "./styleDragDrop.scss";

const fileTypes = ["JPG", "PNG", "GIF"];

function DragDrop({setFile}: any) {
  //const [file, setFile] = useState<File>();
  const handleChange = (file: React.SetStateAction<File | undefined>) => {
    setFile(file);
  };
  return (
    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
  );
}

export default DragDrop;
