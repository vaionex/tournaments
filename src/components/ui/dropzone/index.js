import { useDropzone } from "react-dropzone";
import { twMerge } from "tailwind-merge";
import { UploadCloud01 } from "untitledui-js-base";

export default function Dropzone({
  accept = {},
  onDrop,
  files = [],
  className = "",
  icon: Icon = UploadCloud01,
}) {
  const { getInputProps, getRootProps } = useDropzone({
    accept,
    onDrop: onDrop,
  });
  return (
    <div
      className={twMerge(
        "border-input flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-neutral-700 bg-neutral-900 p-4 text-sm text-neutral-500",
        className,
      )}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded bg-neutral-800 text-white">
        <Icon />
      </div>
      <div className="text-center">
        <div>
          {files.filter(Boolean).map((file) => (
            <div className="font-semibold" key={file.name}>
              {file?.name}
            </div>
          ))}
        </div>
        <span className="text-primary">Click to upload</span> or drag and drop
      </div>
      <div className="text-neutral text-xs">
        {Object.values(accept)
          .flat()
          .map((type) => type.replace(".", "").toUpperCase())
          .join(", ")}
      </div>
    </div>
  );
}
