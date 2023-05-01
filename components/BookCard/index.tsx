import Image from "next/image";
import Link from "next/link";
import LogoPoster from "../../assets/thesis-animate.svg";
import { StarRating } from "../StarRating";
import { InfoBook } from "../../types/book";
import { useCart } from "../../context/BookProvider";
import { Favoritos } from "../Favoritos";

interface MovieCardProps {
  bookId: string;
  book: InfoBook;
  title: string;
  averageRating: number | undefined;
  width: number;
  height: number;
}

export function BookCard({
  book,
  bookId,
  title,
  width,
  height,
  averageRating,
}: MovieCardProps) {
  const { booksCard } = useCart();

  return (
    <>
      <div className="w-full relative">
        <Link href={`/book/${bookId}`}>
          <div className="text-center cursor-pointer">
            {bookId === null || bookId === undefined ? (
              <Image
                src={LogoPoster}
                width={width}
                height={height}
                alt="Logo"
                priority
              />
            ) : (
              <Image
                src={`https://books.google.com/books/content?id=${bookId}&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api`}
                width={width}
                height={height}
                alt="Book"
                priority
              />
            )}
          </div>
        </Link>
        {width === 292 ? (
          <div className="w-full max-sm:max-w-[292px] sm:max-w-[292px] m-auto pt-16 pb-4 px-4 bg-game-gradient absolute bottom-[6px] left-0 right-0">
            <Link href={`/book/${bookId}`}>
              <div className="cursor-pointer">
                <strong className="font-medium lg:text-2xl">{title}</strong>

                <StarRating rating={averageRating} />
              </div>
            </Link>
            <Favoritos booksCard={booksCard} book={book} />
          </div>
        ) : (
          <div className="w-full max-sm:max-w-[400px] sm:max-w-[400px] m-auto pt-16 pb-4 px-4 bg-game-gradient absolute bottom-[6px] left-0 right-0">
            <Link href={`/book/${bookId}`}>
              <div className="cursor-pointer">
                <strong className="font-medium lg:text-2xl">{title}</strong>

                <StarRating rating={averageRating} />
              </div>
            </Link>
            <Favoritos booksCard={booksCard} book={book} />
          </div>
        )}
      </div>
    </>
  );
}
