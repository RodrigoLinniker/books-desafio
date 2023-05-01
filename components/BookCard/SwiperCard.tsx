import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { BookCard } from "./index";
import { InfoBook } from "../../types/book";

interface ListProps {
  list: Array<InfoBook>;
  width: number;
  height: number;
  slidesPerView: number;
  slidesPerGroup: number;
  swiperButtonPrev: string;
  swiperButtonNext: string;
}

export function SwiperCard({
  list,
  width,
  height,
  slidesPerView,
  slidesPerGroup,
  swiperButtonPrev,
  swiperButtonNext,
}: ListProps) {
  return (
    <div className="w-full max-w-[1644px] mx-auto">
      <div className="w-full flex max-w-[1643px] mx-auto items-center justify-center">
        <div className={`${swiperButtonPrev} cursor-pointer`}>
          <BsChevronLeft className="text-white w-10 max-lg:w-9" />
        </div>
        <Swiper
          slidesPerView={1}
          slidesPerGroup={1}
          spaceBetween={16}
          loopFillGroupWithBlank={true}
          navigation={{
            nextEl: `.${swiperButtonNext}`,
            prevEl: `.${swiperButtonPrev}`,
          }}
          breakpoints={{
            768: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            1024: {
              slidesPerView: slidesPerView,
              slidesPerGroup: slidesPerGroup,
            },
          }}
          mousewheel={true}
          modules={[Pagination, Navigation]}
          className="w-full"
        >
          {list?.map((item: InfoBook) => {
            return (
              <SwiperSlide key={item.id}>
                <BookCard
                  width={width}
                  book={item}
                  height={height}
                  bookId={item.id}
                  averageRating={item.volumeInfo?.averageRating}
                  title={item.volumeInfo.title}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className={`${swiperButtonNext} cursor-pointer`}>
          {" "}
          <BsChevronRight className="text-white w-10 max-lg:w-9" />
        </div>
      </div>
    </div>
  );
}
