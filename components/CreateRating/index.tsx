import { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import api from "../../services/httpService";
import { toast } from "react-toastify";
import { StarRating } from "../StarRating";

interface CreateRating {
  bookId: string;
  userId: string;
  rating: string;
}
export function CreateRating({ bookId, userId, rating }) {
  const [comment, setComment] = useState("");

  const createNewHabit = async () => {
    try {
      if (userId) {
        await api.post("/api/createreview", {
          bookId: bookId,
          userId: userId,
          rating: rating,
          comment: comment,
        });
        toast.success("Review salva com sucesso", { autoClose: 2000 });
      } else {
        toast.error("Error user unexist", { autoClose: 2000 });
      }
    } catch (error) {
      toast.error("Não pode criar 2 reviews do mesmo livro", {
        autoClose: 2000,
      });
      console.error(error);
    }
  };
  return (
    <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6">
      <div className="flex items-center gap-2">
        <h1 className="">Sua nota: </h1>
        <StarRating rating={rating} />
      </div>
      <label htmlFor="title" className="mt-2 font-semibold leading-tight">
        Qual seu comentário sobre o livro? só pode enviar 1 vez
      </label>

      <input
        type="text"
        id="title"
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
        autoFocus
        value={comment}
        onChange={(event) => setComment(event.target.value)}
      />

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        <AiOutlineCheck size={20} />
        Confirmar
      </button>
    </form>
  );
}
