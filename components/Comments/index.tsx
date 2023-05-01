import Image from "next/image";
import { StarRating } from "../StarRating";

interface CommentsProps {
  name: string;
  image: string;
  comment: string;
  rating: number;
}
export function Comments({ name, image, comment, rating }: CommentsProps) {
  return (
    <div className="w-full flex items-center space-x-4 py-4 bg-gray-900/50 rounded-3xl px-4 ">
      <Image
        src={image}
        alt={name}
        className=" rounded-full ring-2 ring-[#111111] "
        width="50px"
        height="50px"
        priority
      />

      <div className="w-full flex-col whitespace-normal break-words text-sm ">
        <div className="flex gap-2">
          <p className="text-lg font-medium">{name}</p>
          <StarRating rating={rating} />
        </div>

        <p>{comment}</p>
      </div>
    </div>
  );
}
