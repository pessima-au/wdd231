
const menuToggle = document.getElementById("menu-toggle");
const navigation = document.querySelector(".navigation ul");

menuToggle.addEventListener("click", () => {
  navigation.classList.toggle("active");
});





document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchBox").value;
  if (query) {
    fetchBooks(query);
  }
});

async function fetchBooks(query) {
  const response = await fetch(
    `https://openlibrary.org/search.json?q=${query}`
  );
  const data = await response.json();

  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  data.docs.slice(0, 10).forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    const coverId = book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : "https://via.placeholder.com/100x150?text=No+Cover";

    bookDiv.innerHTML = `
            <img src="${coverId}" alt="Book Cover">
            <h3>${book.title}</h3>
            <p>${
              book.author_name ? book.author_name.join(", ") : "Unknown Author"
            }</p>
            <button onclick="openReader('${book.key}')">Read</button>
        `;

    resultsContainer.appendChild(bookDiv);
  });
}

function openReader(bookKey) {
  window.location.href = `reader.html?book=${bookKey}`;
}
