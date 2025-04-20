// Example featured books data (using Open Library API titles)
const featuredBooksTitles = [
  "Pride and Prejudice",
  "To Kill a Mockingbird",
  "1984",
];

// Function to fetch and display featured books
function displayFeaturedBooks() {
  const container = document.getElementById("featured-books-container");

  // Fetch details for each featured book by title
  Promise.all(
    featuredBooksTitles.map((title) =>
      fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`
      )
        .then((res) => res.json())
        .then((data) => {
          // Check if results exist
          if (data.docs && data.docs.length > 0) {
            return data.docs[0]; // Return the first result
          } else {
            return null; // No results found
          }
        })
    )
  )
    .then((books) => {
      container.innerHTML = books
        .map((book) => {
          if (book) {
            // Render book details if found
            return `
                            <div class="book-card">
                                <img src="https://covers.openlibrary.org/b/id/${
                                  book.cover_i ? book.cover_i : "placeholder"
                                }-M.jpg" alt="${book.title}">
                                <div class="book-info">
                                    <h3>${book.title}</h3>
                                    <p><strong>Author:</strong> ${
                                      book.author_name
                                        ? book.author_name.join(", ")
                                        : "Unknown"
                                    }</p>
                                    <p><strong>Genre:</strong> ${
                                      book.subject ? book.subject[0] : "N/A"
                                    }</p>
                                    <div class="book-actions">
                                        <button onclick="readBook('${
                                          book.key
                                        }')">Read</button>
                                        <button onclick="pinBook('${
                                          book.key
                                        }')">Pin</button>
                                    </div>
                                </div>
                            </div>
                        `;
          } else {
            // Render a placeholder if no book is found
            return `
                            <div class="book-card">
                                <div class="book-info">
                                    <h3>Book Not Found</h3>
                                    <p>We couldn't find details for this book.</p>
                                </div>
                            </div>
                        `;
          }
        })
        .join("");
    })
    .catch((err) => {
      console.error("Error fetching featured books:", err);
      container.innerHTML =
        "<p>Unable to load featured books at this time.</p>";
    });
}

// Placeholder functions for "Read" and "Pin" buttons
function readBook(bookKey) {
  window.location.href = `reader.html?book=${bookKey}`;
}

function pinBook(bookKey) {
  alert(`Book with key ${bookKey} pinned to your library!`);
}

// Display featured books on page load
displayFeaturedBooks();


// Search functionality
// Function to handle search
function handleSearch() {
    const searchInput = document.getElementById("search-input").value.trim();
    const selectedGenre = document.getElementById("genres").value;

    // Fetch books based on search input and genre
    fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(
            searchInput
        )}&subject=${encodeURIComponent(selectedGenre)}`
    )
        .then((res) => res.json())
        .then((data) => {
            const books = data.docs.slice(0, 10); // Limit to 10 results
            const container = document.getElementById("search-results-container");

            // Render search results
            container.innerHTML = books
                .map((book) => {
                    const cover = book.cover_i
                        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                        : "https://via.placeholder.com/120x180?text=No+Cover";

                    // Handle authors: show one and "et al." if there are too many
                    const authors =
                        book.author_name && book.author_name.length > 1
                            ? `${book.author_name[0]}, et al.`
                            : book.author_name
                            ? book.author_name[0]
                            : "Unknown";

                    return `
                        <div class="book-card">
                                <img src="${cover}" alt="${book.title}">
                                <div class="book-info">
                                        <h3>${book.title}</h3>
                                        <p><strong>Author:</strong> ${authors}</p>
                                        <p><strong>Genre:</strong> ${
                                            book.subject ? book.subject[0] : "N/A"
                                        }</p>
                                        <div class="book-actions">
                                                <button onclick="readBook('${book.key}')">Read</button>
                                                <button onclick="pinBook('${book.key}')">Pin</button>
                                        </div>
                                </div>
                        </div>
                    `;
                })
                .join("");
        })
        .catch((err) => {
            console.error("Error fetching search results:", err);
            document.getElementById("search-results-container").innerHTML =
                "<p>Unable to load search results at this time.</p>";
        });
}

// Event listener for search button
document.getElementById("search-button").addEventListener("click", handleSearch);