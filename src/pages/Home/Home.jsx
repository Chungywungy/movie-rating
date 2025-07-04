import React, { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import axios from 'axios';
import { db } from '../../firebase';
import { collection, addDoc, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import './Home.css';

const API_KEY = '3ae7b5b217c5389d349a90262ba52dec';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

export default function Home() {
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [movie, setMovie] = useState(null);
    const [rating, setRating] = useState(null);
    const [averageRating, setAverageRating] = useState(null);
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            if (!searchQuery.trim()) {
                setSearchResults([]);
                return;
            }

            try {
                const res = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
                    params: {
                        api_key: API_KEY,
                        query: searchQuery,
                    },
                });

                const results = res.data.results;
                setSearchResults(results || []);
            } catch (err) {
                console.error('Search failed', err);
            }
        };

        const debouncedFetch = debounce(fetchResults, 400); // delay 400ms
        debouncedFetch();

        return () => {
            debouncedFetch.cancel(); // cleanup on re-renders
        };
    }, [searchQuery]);

    const saveRating = async (movie, score) => {
        try {
            await addDoc(collection(db, 'ratings'), {
                title: movie.title,
                movieId: movie.id,
                rating: score,
                timestamp: new Date(),
            });
            fetchAverageRating(movie.id);
            fetchRatedMovies();
        } catch (e) {
            console.error('Error adding rating: ', e);
        }
    };

    const fetchTopRatedMovies = async () => {
        try {
            const q = query(collection(db, 'ratings'));
            const snapshot = await getDocs(q);

            const ratingsByMovie = {};

            snapshot.forEach((doc) => {
                const data = doc.data();
                const { movieId, title, rating } = data;

                if (!ratingsByMovie[movieId]) {
                    ratingsByMovie[movieId] = {
                        title,
                        movieId,
                        total: 0,
                        count: 0,
                    };
                }

                ratingsByMovie[movieId].total += rating;
                ratingsByMovie[movieId].count += 1;
            });

            const averageRatings = Object.values(ratingsByMovie).map(
                (movie) => ({
                    ...movie,
                    average: movie.total / movie.count,
                })
            );

            const sortedTopTen = averageRatings
                .filter((m) => m.count >= 2) // optional: only show movies with 2+ ratings
                .sort((a, b) => b.average - a.average)
                .slice(0, 10);

            setTopRatedMovies(sortedTopTen);
        } catch (error) {
            console.error('Error fetching top rated movies:', error);
        }
    };

    useEffect(() => {
        fetchTopRatedMovies();
    }, []);

    const fetchAverageRating = async (movieId) => {
        try {
            const q = query(
                collection(db, 'ratings'),
                where('movieId', '==', movieId)
            );
            const querySnapshot = await getDocs(q);

            let total = 0;
            let count = 0;

            querySnapshot.forEach((doc) => {
                total += doc.data().rating;
                count++;
            });

            if (count > 0) {
                setAverageRating((total / count).toFixed(1));
            } else {
                setAverageRating(null);
            }
        } catch (e) {
            console.error('Error fetching average rating: ', e);
        }
    };

    const handleRate = (value) => {
        setRating(value);
        if (movie) {
            saveRating(movie, value);
        }
    };

    const handleRandomMovie = async () => {
        try {
            const randomPage = Math.floor(Math.random() * 50) + 1;
            const res = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
                params: {
                    api_key: API_KEY,
                    page: randomPage,
                },
            });

            const movies = res.data.results;
            if (movies.length > 0) {
                const randomIndex = Math.floor(Math.random() * movies.length);
                const randomMovie = movies[randomIndex];

                setMovie(randomMovie);
                setSearchResults([]);
                setRating(null);
                fetchAverageRating(randomMovie.id);
            }
        } catch (err) {
            console.error('Failed to fetch random movie:', err);
        }
    };

    const addToWatchlist = async (movie) => {
        try {
            await addDoc(collection(db, "watchlist"), {
            title: movie.title,
            movieId: movie.id,
            addedAt: new Date(),
            });
            console.log(`✅ ${movie.title} added to watchlist`);
        } catch (error) {
            console.error("❌ Failed to add to watchlist:", error);
        }
    };
    const fetchWatchlist = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "watchlist"));
            const list = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            }));
            setWatchlist(list);
            console.log("📄 Watchlist:", list);
        } catch (error) {
            console.error("❌ Failed to fetch watchlist:", error);
        }
    };

    useEffect(() => {
        fetchWatchlist();
    }, []);

    const removeFromWatchlist = async (id) => {
        try {
            await deleteDoc(doc(db, "watchlist", id));
            console.log("🗑 Removed from watchlist:", id);
            fetchWatchlist(); 
        } catch (error) {
            console.error("❌ Failed to remove:", error);
        }
    };

    
    return (
        <div className='app'>
            <h1>🎬 Movies</h1>
            <div style={{ position: 'relative' }}>
                <input
                    type='text'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder='Search for a movie...'
                />

                {searchResults.length > 0 && (
                    <ul className='dropdown'>
                        {searchResults.slice(0, 5).map((movie) => (
                            <li
                                key={movie.id}
                                onClick={() => {
                                    setMovie(movie);
                                    setSearchResults([]);
                                    setRating(null);
                                    fetchAverageRating(movie.id);
                                }}
                            >
                                {movie.title} ({movie.release_date?.slice(0, 4)}
                                )
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <button
                onClick={handleRandomMovie}
                style={{ marginBottom: '10px' }}
            >
                🎰GAMBLING TIME
            </button>

            {movie && (
                <div className='movie-card'>
                    <h2>
                        {movie.title} ({movie.release_date?.slice(0, 4)})
                    </h2>
                    {movie.poster_path && (
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                    )}
                    <p>{movie.overview}</p>

                    {averageRating && (
                        <p>⭐ Average Rating: {averageRating}/10</p>
                    )}

                    <p>Rate this movie:</p>
                    <div className='rating-buttons'>
                        {[...Array(10)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => handleRate(i + 1)}
                                className={
                                    rating === i + 1
                                        ? 'selected-rating'
                                        : 'unselected-rating'
                                }
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    <div className='watch-list'>
                        <button onClick={() => addToWatchlist(movie)}>
                            ➕ Add to Watchlist
                        </button>
                    </div>
                </div>
            )}

            <div>
                <h2>📺 My Watchlist</h2>

                {watchlist.length === 0 ? (
                    <p>No movies added yet.</p>
                ) : (
                    <ul>
                    {watchlist.map((movie) => (
                        <li key={movie.id}>
                        {movie.title}
                        <button
                            onClick={() => removeFromWatchlist(movie.id)}
                        >
                            Remove
                        </button>
                        </li>
                    ))}
                    </ul>
                )}
            </div>

            {topRatedMovies.length > 0 && (
                <div className='rated-movies'>
                    <h3>🏆 Top 10 Rated Movies</h3>
                    <ul>
                        {topRatedMovies.map((movie, index) => (
                            <li key={movie.movieId}>
                                <strong>
                                    {index + 1}. {movie.title}
                                </strong>{' '}
                                — {movie.average.toFixed(1)}/10 ({movie.count}{' '}
                                rating{movie.count > 1 ? 's' : ''})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
