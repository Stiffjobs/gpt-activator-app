import { PlusIcon } from "@heroicons/react/24/outline";

interface Props {
  getRootProps: any;
  getInputProps: any;
}

const DragDropZone: React.FC<Props> = ({ getInputProps, getRootProps }) => {
  return (
    <div
      {...getRootProps()}
      className="flex h-72 flex-1 flex-col items-center border-2 border-transparent p-6"
    >
      <div className="flex flex-col items-center justify-center ">
        <PlusIcon className="h-8 w-8" />
        <span>Drag your file here</span>
      </div>
      <input className="file-input w-full max-w-xs" {...getInputProps()} />
    </div>
  );
};
export default DragDropZone;
