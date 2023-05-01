import { useCart } from "../../context/BookProvider";
import { InfoBook } from "../../types/book";

interface FavoritosProps {
  booksCard: InfoBook[];
  book: InfoBook;
}

export function Favoritos({ booksCard, book }: FavoritosProps) {
  const { addBookToLocalStorage, removeBookToLocalStorage } = useCart();

  return (
    <div className="text-center px-0">
      {booksCard.includes(book) ? (
        <button onClick={() => removeBookToLocalStorage(book)}>
          <h1 className="text-gray-500 text-xs  hover:text-yellow-500">
            Remover dos favoritos
          </h1>
        </button>
      ) : (
        <button onClick={() => addBookToLocalStorage(book)}>
          <h1 className="text-gray-500 text-xs  hover:text-yellow-500">
            Adicionar nos favoritos
          </h1>
        </button>
      )}
    </div>
  );
}
