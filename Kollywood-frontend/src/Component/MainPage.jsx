import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchMatches, FetchMovie } from "../Slices/MovieSlice";

export default function MovieGameCanvas() {
  const dispatch = useDispatch();

  // Redux state
  const { movie, matches } = useSelector((state) => state.movie);

  // UI state
  const [guess, setGuess] = useState("");
  const [clue, setClue] = useState(null);
  const [castIndex, setCastIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  // 🎲 Random movie ID
  const generateRandomId = () => Math.floor(Math.random() * 789) + 1;

  // 🔁 Fetch first movie on mount
  useEffect(() => {
    dispatch(FetchMovie(generateRandomId()));
  }, [dispatch]);

  // 🎭 Cast cycling
  const handleCastClick = () => {
    if (!movie?.cast?.length) return;
    setClue("cast");
    setCastIndex((prev) => (prev + 1) % movie.cast.length);
  };

  // ✅ Check answer
  const checkAnswer = (value) => {
    if (!movie?.title) return;

    if (value.trim().toLowerCase() === movie.title.toLowerCase()) {
      setResult("correct");
    } else {
      setResult("wrong");
    }
  };

  // ▶ Next movie
  const nextMovie = () => {
    setGuess("");
    setClue(null);
    setCastIndex(0);
    setResult(null);
    setShowDropdown(false);
    dispatch(FetchMovie(generateRandomId()));
  };

  // 🔍 Fetch matches on SPACE
  const handleInputChange = (e) => {
    const value = e.target.value;
    setGuess(value);

    if (!value) {
      setShowDropdown(false);
      setResult(null);
      return;
    }

    if (value.endsWith(" ")) {
      const query = value.trim();
      if (query.length > 0) {
        dispatch(FetchMatches(query));
        setShowDropdown(true);
      }
    }

    checkAnswer(value);
  };

  // ❌ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-700 to-pink-600 p-6">
      {!movie && (
        <div className="text-white text-xl font-semibold">Loading movie...</div>
      )}

      {movie && (
        <>
          {/* Clue Buttons */}
          <button
            onClick={() => setClue("director")}
            className="absolute top-6 px-5 py-2 rounded-full bg-yellow-400 text-black font-semibold shadow-lg"
          >
            🎬 Director
          </button>

          <button
            onClick={handleCastClick}
            className="absolute left-6 flex items-center gap-2 px-5 py-2 rounded-full bg-rose-400 text-black font-semibold shadow-lg"
          >
            🎭 Cast
            <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
              {movie.cast?.length || 0}
            </span>
          </button>

          <button
            onClick={() => setClue("genre")}
            className="absolute right-6 px-5 py-2 rounded-full bg-green-400 text-black font-semibold shadow-lg"
          >
            🎞 Genre
          </button>

          <button
            onClick={() => setClue("overview")}
            className="absolute bottom-6 px-5 py-2 rounded-full bg-blue-400 text-black font-semibold shadow-lg"
          >
            📖 Overview
          </button>

          {/* Center Box */}
          <div className="w-full max-w-sm bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-6 text-center text-white relative">
            <h1 className="text-2xl font-bold mb-4">🎥 Guess the Movie</h1>

            <input
              type="text"
              value={guess}
              onChange={handleInputChange}
              placeholder="Type movie name and press space..."
              className="w-full p-3 rounded-lg text-black outline-none mb-2"
            />

            {/* Matches Dropdown */}
            {showDropdown && matches?.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute z-20 w-[85%] bg-white rounded-lg shadow-lg max-h-40 overflow-y-auto text-black"
              >
                {matches.map((m, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setGuess(m);
                      setShowDropdown(false);
                      checkAnswer(m);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-indigo-100"
                  >
                    {m}
                  </div>
                ))}
              </div>
            )}

            {/* Clues */}
            <div className="min-h-[60px] flex items-center justify-center text-sm mt-4">
              {clue === "director" && <p>🎬 {movie.director}</p>}
              {clue === "genre" && (
                <p>
                  🎞{" "}
                  {Array.isArray(movie.genre)
                    ? movie.genre.join(", ")
                    : movie.genre}
                </p>
              )}
              {clue === "overview" && <p>{movie.overview}</p>}
              {clue === "cast" && movie.cast && (
                <p>🎭 {movie.cast[castIndex]}</p>
              )}
            </div>

            {/* Result */}
            {guess && (
              <>
                {result === "correct" && (
                  <div className="mt-4 text-green-300 font-bold">
                    ✅ Correct! 🎉
                  </div>
                )}

                {result === "wrong" && (
                  <div className="mt-4 text-red-300 font-bold">
                    ❌ Wrong guess, try again!
                  </div>
                )}

                <p className="mt-2">
                  Your Guess:{" "}
                  <span className="text-yellow-300">{guess}</span>
                </p>

                {result === "correct" && (
                  <button
                    onClick={nextMovie}
                    className="mt-4 px-5 py-2 bg-emerald-400 text-black font-semibold rounded-full shadow-lg hover:scale-105 transition"
                  >
                    ▶ Next Movie
                  </button>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
