interface StarRatingProps {
  rating: number;
}

export function StarRating({ rating }: StarRatingProps) {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((index) => (
        <svg
          key={index}
          className={`h-5 w-5 max-xl:w-4 max-xl:h-4 ${
            rating >= index ? "text-yellow-400" : "text-gray-300"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 1.526l2.76 5.622 6.16.894-4.45 4.336 1.052 6.104L10 15.583l-5.522 2.899 1.052-6.104L1.08 8.042l6.16-.894L10 1.526zm0 2.858L7.222 7.14l-4.43.644 3.21 3.137-.758 4.403L10 14.88l3.756 1.973-.758-4.403 3.21-3.137-4.43-.644L10 4.384z"
            clipRule="evenodd"
          />
        </svg>
      ))}

      <span className="text-gray-500 text-xs max-xl:hidden">
        {rating ? rating : 0} de 5
      </span>
    </div>
  );
}
