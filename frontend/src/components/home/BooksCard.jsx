import BookSingleCard from './BookSingleCard';

const BooksCard = ({ books }) => {
  return (
    // Added gap-6 for spacing between cards and p-4 for container padding
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4'>
      {books.map((item) => (
        <BookSingleCard key={item._id} book={item} />
      ))}
    </div>
  );
};

export default BooksCard;