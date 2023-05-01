import { createContext, useContext, useEffect, useState } from "react";
import { InfoBook } from "../types/book";
import { toast } from "react-toastify";

interface BookProviderProps {
  children: React.ReactNode;
}

interface BookContextType {
  booksCard: InfoBook[];
  addBookToLocalStorage: (book: InfoBook) => void;
  removeBookToLocalStorage: (book: InfoBook) => void;
}

export const BookContext = createContext<BookContextType>(
  {} as BookContextType
);

export function BookProvider({ children }: BookProviderProps): JSX.Element {
  const [booksCard, setBooksCard] = useState<InfoBook[]>([]);

  useEffect(() => {
    const storedBooks = localStorage.getItem("books");

    if (storedBooks) {
      setBooksCard(JSON.parse(storedBooks));
    }
  }, []);

  const addBookToLocalStorage = (book: InfoBook) => {
    // Obtenha os livros existentes do Local Storage
    const storedBooks = JSON.parse(
      localStorage.getItem("books") || "[]"
    ) as InfoBook[];

    const alreadyExists = storedBooks.some((favBook) => favBook.id === book.id);

    if (!alreadyExists) {
      const updatedBooks = [...storedBooks, { ...book, favorito: true }];
      localStorage.setItem("books", JSON.stringify(updatedBooks));
      setBooksCard(updatedBooks);
      toast.success("Adicionada nos favoritos com sucesso", {
        autoClose: 2000,
      });
    } else {
      toast.error("Ja existe nos favoritos", {
        autoClose: 2000,
      });
    }
  };

  const removeBookToLocalStorage = (book: InfoBook) => {
    const storedBooks = JSON.parse(localStorage.getItem("books") || "[]");
    const updatedBooks = storedBooks.filter(
      (bookCard: InfoBook) => bookCard.id !== book.id
    );
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    setBooksCard(updatedBooks);

    toast.success("Removida dos favoritos com sucesso", {
      autoClose: 2000,
    });
  };

  return (
    <BookContext.Provider
      value={{
        booksCard,
        addBookToLocalStorage,
        removeBookToLocalStorage,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export function useCart(): BookContextType {
  const context = useContext(BookContext);

  return context;
}
