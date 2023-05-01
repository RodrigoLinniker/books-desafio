import { useSession } from "next-auth/react";
import { Header } from "../components/Header";
import { useCart } from "../context/BookProvider";
import { InfoBook } from "../types/book";
import { BookCard } from "../components/BookCard";
import Link from "next/link";
import { BsChevronLeft } from "react-icons/bs";

export default function Favoritos() {
  const { data: session } = useSession();
  const { booksCard } = useCart();

  return (
    <div>
      <Header session={session} />
      <div className="w-full flex gap-2 max-w-[1644px] m-auto my-auto py-6 items-center justify-center max-md:justify-center ">
        {booksCard.length > 0 ? (
          <div className="grid gap-5 max-sm:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-3 mx-auto items-center">
            {booksCard?.map((item: InfoBook) => (
              <BookCard
                key={item.id}
                book={item}
                width={292}
                height={440}
                bookId={item.id}
                averageRating={item.volumeInfo?.averageRating}
                title={item.volumeInfo.title}
              />
            ))}
          </div>
        ) : (
          <div className="w-full max-w-[1440px] items-center text-center">
            <Link href="/">
              <a>
                <BsChevronLeft
                  size={40}
                  className="
                   hover:text-gray-500 delay-[50ms]"
                />
              </a>
            </Link>
            <h1>Não Possui livros nos favoritos</h1>
          </div>
        )}
      </div>
    </div>
  );
}
