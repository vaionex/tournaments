import { useEffect, useState } from "react";

export default function useFile() {
  const [file, setFile] = useState();
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!file) return setUrl("");
    const url = URL.createObjectURL(file);
    setUrl(url);
  }, [file]);

  return [file, setFile, url];
}
