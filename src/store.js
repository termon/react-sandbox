const FIREBASE_URL = "https://movies-a1.firebaseio.com/movies.json";
const LOCAL_URL = "http://localhost:3000/movies";

export function GetMovies() {
  return fetch(FIREBASE_URL).then(response => {
    return response.json();
  });
}

export async function GetMoviesAsync() {
  const resp = await fetch(LOCAL_URL);
  return resp.json();
}

export async function PostMovieAsync(movie) {
  return fetch(LOCAL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(movie)
  })
    .then(response => response.json()) // parses response to JSON
    .catch(error => console.error(`Fetch Error =\n`, error));
}

export async function DeleteMovieAsync(id) {
  return fetch(LOCAL_URL + "/" + id, {
    method: "DELETE",
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}

export function addMovie(payload) {
  const m = {
    budget: payload.budget,
    cast: ["Anon"],
    description: payload.description,
    duration: 0,
    genres: ["THRILLER"],
    rating: 0,
    title: payload.title,
    url: payload.url,
    year: payload.year
  };
  return m;
}
