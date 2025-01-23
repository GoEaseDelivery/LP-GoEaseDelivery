import { Transition } from "@headlessui/react";
// import { Logo } from "./Logo";
import { Spinner } from "./Spinner";

interface LaunchScreenProps {
    isLoading: boolean;
}

export function LaunchScreen({ isLoading }: LaunchScreenProps) {
    return (
      <Transition
        show={isLoading}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className=" bg-blue-700 fixed top-0 left-0 w-full h-full grid place-items-center z-50">
          <div className="flex flex-col items-center gap-4">
            {/* <Logo className="h-10  text-white" /> */}
            <Spinner classname="text-slate-500 fill-white w-10 h-10" />
          </div>
        </div>
      </Transition>
    );
}
