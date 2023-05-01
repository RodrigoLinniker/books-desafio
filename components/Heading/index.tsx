import { BsChevronRight } from "react-icons/bs";

interface HeadingProps {
  children: React.ReactNode;
}
export function Heading({ children }: HeadingProps) {
  return (
    <div className="w-full flex gap-2 max-w-[1644px] m-auto py-6 items-center max-md:justify-center ">
      {" "}
      <h1 className="font-medium text-[18px] ml-12 ">{children}</h1>
      <div>
        <BsChevronRight size={24} />
      </div>
    </div>
  );
}
