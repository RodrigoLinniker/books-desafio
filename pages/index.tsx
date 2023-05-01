import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { BsSearch } from "react-icons/bs";
import { GetServerSideProps } from "next";
import { Header } from "../components/Header";
import { useEffect, useState } from "react";
import { Heading } from "../components/Heading";
import { InfoBook } from "../types/book";
import { SwiperCard } from "../components/BookCard/SwiperCard";
import { BookCard } from "../components/BookCard";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/trending`);
  const json = await res.data;

  return {
    props: {
      listTrending: json.listTrending,
      listPopular: json.listPopular,
    },
  };
};

export default function Home({ listTrending, listPopular }) {
  const { data: session } = useSession();
  const [busca, setBusca] = useState("");
  const [books, setBooks] = useState<InfoBook[]>([]);

  useEffect(() => {
    const handleSearch = async () => {
      if (busca !== "") {
        const searchList2 = await axios.get(`/api/searchbook?q=${busca}`);

        const jsonSearchBook = await searchList2.data;
        setBooks(jsonSearchBook.items);
      }
    };
    handleSearch();
  }, [busca]);

  if (listTrending.length < 0 || listPopular.length < 0) {
    return <h1>Carregando</h1>;
  }

  return (
    <div>
      <Head>
        <title>DashBoard</title>
      </Head>

      <Header session={session}>
        <div className="flex grow">
          <label className="flex py-3 px-8 max-sm:px-4 ml-6 max-sm:ml-3 max-w-[400px] self-center gap-2 items-center bg-neutral-800 relative rounded-full max-sm:max-w-[225px] max-sm:mr-1 ">
            <input
              type="text"
              className=" bg-neutral-800 px-4 mr-4 outline-0 max-sm:max-w-[90px]"
              placeholder="Buscar Livro, etc..."
              value={busca}
              onChange={(event) => {
                setBusca(event.target.value);
              }}
            />

            <BsSearch size={20} />
          </label>
        </div>
      </Header>

      {busca === "" ? (
        <>
          <Heading>Categoria de Ficção</Heading>
          <SwiperCard
            swiperButtonPrev={"butotn-1-prev"}
            swiperButtonNext={"button-1-next"}
            list={listTrending}
            width={292}
            height={440}
            slidesPerView={5.5}
            slidesPerGroup={5}
          />

          <Heading>Categoria de Design</Heading>

          <SwiperCard
            swiperButtonPrev={"butotn-2-prev"}
            swiperButtonNext={"button-2-next"}
            list={listPopular}
            width={292}
            height={440}
            slidesPerView={5.3}
            slidesPerGroup={5}
          />
        </>
      ) : (
        <div className="w-full flex gap-2 max-w-[1644px] m-auto py-6 items-center max-md:justify-center ">
          <div className="grid gap-5 max-sm:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-3 mx-auto items-center">
            {books?.map((item: InfoBook) => (
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
        </div>
      )}
    </div>
  );
}
