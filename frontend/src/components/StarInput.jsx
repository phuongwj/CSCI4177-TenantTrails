export default function StarInput({ rating, setRating }) {
  return (
    <>
      <div className="star-input">
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            className={"star-btn" + (n <= rating ? " active" : "")}
            onClick={() => setRating(n)}
            type="button"
          >★</button>
        ))}
      </div>
      <div className="star-value">{rating ? rating + " of 5" : "Click to rate"}</div>
    </>
  );
}
