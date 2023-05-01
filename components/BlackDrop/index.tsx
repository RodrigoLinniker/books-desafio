import Link from "next/link";
import { BsChevronLeft } from "react-icons/bs";
import { BookCard } from "../BookCard";
import { IVolumeInfo } from "../../types/book";
import { ShareBook } from "../ShareBook";

interface InfoBook {
  id: string;
  volumeInfo: IVolumeInfo;
}

interface BlackDropProps {
  info: InfoBook;
}

export function BlackDrop({ info }: BlackDropProps) {
  return (
    <div className="w-full mx-auto flex flex-col items-center">
      <div className="w-full justify-start flex max-w-[1490px]">
        <div className="flex text-center">
          <Link href="/">
            <a className="w-10 h-10">
              <BsChevronLeft
                size={40}
                className="mt-2 hover:text-gray-500 delay-[50ms]"
              />
            </a>
          </Link>
        </div>

        <BookCard
          key={info.id}
          book={info}
          width={400}
          height={500}
          bookId={info.id}
          averageRating={info.volumeInfo?.averageRating}
          title={info.volumeInfo.title}
        />
        <ShareBook />
      </div>
    </div>
  );
}
