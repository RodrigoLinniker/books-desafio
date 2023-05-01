import axios from "axios";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { Header } from "../../components/Header";
import { BlackDrop } from "../../components/BlackDrop";
import { InfoBook } from "../../types/book";
import { useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft, AiOutlineClose } from "react-icons/ai";
import { StarVote } from "../../components/StarVote";
import * as Dialog from "@radix-ui/react-dialog";
import { CreateRating } from "../../components/CreateRating";
import ReactHtmlParser from "react-html-parser";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params;
  const response = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/book/${id}`
  );

  return {
    props: {
      info: response.data as InfoBook,
    },
  };
};

export default function BookItem({ info }: { info: InfoBook }) {
  const { data: session } = useSession();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const router = useRouter();
  const [clickedRating, setClickedRating] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = (index: number) => {
    setHoverRating(index);
    setRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleOpenFalse = () => {
    setIsOpen(false);
  };

  const handleClick = (index: number) => {
    if (session) {
      setClickedRating(index);
    } else {
      const currentUrl = router.asPath;
      router.push(`/login?redirect=${encodeURIComponent(currentUrl)}`);
    }
  };

  return (
    <div className="min-h-screen">
      <Header page={true} session={session} />

      <BlackDrop info={info} />

      <div className="w-full flex flex-col mx-auto items-center max-w-[1440px] gap-4 5 px-2">
        <div className="flex items-center space-x-1">
          <Dialog.Root
            open={isOpen}
            onOpenChange={(open) => {
              if (session) {
                setIsOpen(open);
              } else {
                setIsOpen(false);
                // Mostrar uma mensagem para o usuário informando que ele precisa estar logado para adicionar um comentário
              }
            }}
          >
            <Dialog.Trigger
              className="flex"
              type="button"
              onClick={() => handleClick}
              data-state={isOpen ? "open" : "closed"}
            >
              {[1, 2, 3, 4, 5].map((index) => (
                <StarVote
                  key={index}
                  index={index}
                  rating={hoverRating || rating}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseLeave}
                  handleClick={handleClick}
                />
              ))}
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0" />

              <Dialog.Content className="absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md max-sm:top-1/4 max-lg:top-1/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Dialog.Close className="absolute right-6 top-6 text-zinc-400 hover:text-zinc-200 focus:outline-none rounded-lg focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900">
                  <AiOutlineClose size={24} aria-label="Fechar" />
                </Dialog.Close>

                <Dialog.Title className="text-3xl leading-tight font-extrabold">
                  Criar Review
                </Dialog.Title>

                <CreateRating
                  bookId={info.id}
                  rating={clickedRating}
                  userId={session?.user?.id}
                  handleOpenFalse={handleOpenFalse()}
                />
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          <span className="text-gray-500 text-xs max-xl:hidden">
            {rating ? rating : 0} de 5
          </span>

          <span className="text-yellow-500 text-xs flex gap-1 items-center">
            <AiOutlineArrowLeft /> Vote Aqui
          </span>
        </div>
        <div>
          <span className=" text-xs hover:text-yellow-500">
            <Link href={`/bookcomments/${info.id}`}>
              Ver commentários do livro
            </Link>
          </span>
        </div>
        <strong className="font-medium max-sm:text-4xl text-5xl">
          {info.volumeInfo.title}
        </strong>

        <h1 className="text-justify">
          {info.volumeInfo.description
            ? ReactHtmlParser(info.volumeInfo.description)
            : "Não possui descrição"}
        </h1>
      </div>
    </div>
  );
}
