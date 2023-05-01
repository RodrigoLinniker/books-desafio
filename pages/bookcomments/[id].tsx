import axios from "axios";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { IReview } from "../../types/IReview";
import { Header } from "../../components/Header";
import { Comments } from "../../components/Comments";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params;
  const response = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/bookcomments/${id}`
  );

  return {
    props: {
      comments: response.data as IReview[],
    },
  };
};

export default function BookComments({ comments }: { comments: IReview[] }) {
  const { data: session } = useSession();

  return (
    <div>
      <Header page={true} session={session} />

      <div className="w-full flex-col max-w-[1440px] items-center mx-auto px-4 py-8 ">
        {comments.length > 0 ? (
          <>
            <h2 className="text-center text-2xl font-bold mb-4">Comentários</h2>
            <div className="w-full flex-col gap-3 space-y-3">
              {comments?.map((item: IReview, index) => (
                <Comments
                  key={index}
                  name={item.User?.name}
                  rating={item.rating}
                  image={item.User?.image}
                  comment={item.comment}
                />
              ))}
            </div>
          </>
        ) : (
          <h2 className="text-center text-2xl font-bold mb-4">
            Não há comentários deste livro
          </h2>
        )}
      </div>
    </div>
  );
}
