
// const menuToggle = document.getElementById("menu-toggle");
// const navigation = document.querySelector(".navigation ul");

// menuToggle.addEventListener("click", () => {
//   navigation.classList.toggle("active");
// });


// Fetching book data from Open Library API and displaying it on the page

const collections = [
  { name: "Web Development", query: "web+development" },
  { name: "Romance", query: "romance" },
  { name: "History", query: "history" },
  { name: "Fiction", query: "fiction" },
  { name: "Textbooks", query: "textbook" },
  { name: "Science Fiction", query: "science+fiction" },
  { name: "Mystery", query: "mystery" },
  { name: "Thriller", query: "thriller" },
  { name: "Cookbooks", query: "cookbook" },
  { name: "Self-Help", query: "self-help" },
  { name: "Biography", query: "biography" },
  { name: "Travel", query: "travel" },
  { name: "Poetry", query: "poetry" },
  { name: "Business", query: "business" },
  { name: "Technology", query: "technology" },
  { name: "Children's Books", query: "children's+books" },
  { name: "Fantasy", query: "fantasy" }
];

let displayedCollections = 0;
const maxPerLoad = 2;

function displayCollections() {
  const container = document.getElementById("collections-container");
  const collectionsToShow = collections.slice(displayedCollections, displayedCollections + maxPerLoad);

  collectionsToShow.forEach(col => {
    const section = document.createElement('section');
    section.classList.add("collection-section");

    fetch(`https://openlibrary.org/search.json?q=${col.query}`)
      .then(res => res.json())
      .then(data => {
        const books = data.docs.slice(0, 5);
        let bookHTML = books.map(book => {
          const cover = book.cover_i 
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : 'https://via.placeholder.com/120x180?text=No+Cover';
          return `<img src="${cover}" alt="${book.title}" title="${book.title}" />`;
        }).join('');

        section.innerHTML = `
          <h3>${col.name}</h3>
          <div class="book-thumbs">${bookHTML}</div>
          <button onclick="browseCollection('${col.query}', '${col.name}')">Browse</button>
        `;

        container.appendChild(section);
      });
  });

  displayedCollections += maxPerLoad;
}

document.getElementById('load-more').addEventListener('click', displayCollections);

// Initially load some collections
displayCollections();

function browseCollection(query, name) {
  const container = document.getElementById('collections-container');
  container.innerHTML = `<h2>${name}</h2><input id="searchInput" placeholder="Search ${name}..." /><div id="book-results"></div>`;
  
  const fetchBooks = (search = "") => {
    fetch(`https://openlibrary.org/search.json?q=${search || query}`)
      .then(res => res.json())
      .then(data => {
        const books = data.docs.slice(0, 12);
        const bookDiv = document.getElementById("book-results");
        bookDiv.innerHTML = books.map(book => {
          const cover = book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : 'https://via.placeholder.com/120x180?text=No+Cover';
          return `
            <div class="book-card">
              <img src="${cover}" alt="${book.title}" />
              <h4>${book.title}</h4>
              <p>${
                book.author_name
                  ? book.author_name.join(", ")
                  : "Unknown Author"
              }</p>
               <button onclick="openReader('${book.key}')">Read</button>
            </div>`;
        }).join('');
      });
  };

  fetchBooks();

  document.getElementById('searchInput').addEventListener('input', (e) => {
    const searchVal = e.target.value.trim();
    fetchBooks(searchVal ? `${query}+${searchVal}` : query);
  });
}

function openReader(bookKey) {
  window.location.href = `reader.html?book=${bookKey}`;
}


// document.getElementById("searchBtn").addEventListener("click", () => {
//   const query = document.getElementById("searchBox").value;
//   if (query) {
//     fetchBooks(query);
//   }
// });

// async function fetchBooks(query) {
//   const response = await fetch(
//     `https://openlibrary.org/search.json?q=${query}`
//   );
//   const data = await response.json();

//   const resultsContainer = document.getElementById("results");
//   resultsContainer.innerHTML = "";

//   data.docs.slice(0, 10).forEach((book) => {
//     const bookDiv = document.createElement("div");
//     bookDiv.classList.add("book");

//     const coverId = book.cover_i
//       ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
//       : "https://via.placeholder.com/100x150?text=No+Cover";

//     bookDiv.innerHTML = `
//             <img src="${coverId}" alt="Book Cover">
//             <h3>${book.title}</h3>
//             <p>${
//               book.author_name ? book.author_name.join(", ") : "Unknown Author"
//             }</p>
//             <button onclick="openReader('${book.key}')">Read</button>
//         `;

//     resultsContainer.appendChild(bookDiv);
//   });
// }

// function openReader(bookKey) {
//   window.location.href = `reader.html?book=${bookKey}`;
// }
