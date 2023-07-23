import { Transition } from "@headlessui/react";
import { Fragment } from "react";

interface Props {
  children: React.ReactNode;
}

const DialogTransition: React.FC<Props> = ({ children }) => {
  return (
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="ease-out duration-300"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      {children}
    </Transition.Child>
  );
};
export default DialogTransition;
