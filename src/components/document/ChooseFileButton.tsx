interface Props {
  getRootProps: any;
  getInputProps: any;
}

const ChooseFileButton: React.FC<Props> = ({ getInputProps, getRootProps }) => {
  return (
    <div className="flex flex-col items-center border-2 border-transparent p-6">
      <div {...getRootProps()}>
        <div className="flex flex-col items-center justify-center ">
          <button className="w-48 btn-accent btn text-neutral">Choose your file</button>
        </div>
        <input className="file-input w-full max-w-xs" {...getInputProps()} />
      </div>
    </div>
  );
};

export default ChooseFileButton;
