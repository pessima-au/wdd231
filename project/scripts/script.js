
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


//Recommended Books Section
function displayRecommendedBooks() {
  const recommendedContainer = document.getElementById("recommended-books");

  if (!recommendedContainer) {
    console.error("Element with ID 'recommended-books' not found.");
    return;
  }

  // Example query for recommended books
  const recommendedQuery = "bestsellers";

  fetch(`https://openlibrary.org/search.json?q=${recommendedQuery}`)
    .then((res) => res.json())
    .then((data) => {
      const books = data.docs.slice(0, 3); 
      const bookHTML = books
        .map((book) => {
          const cover = book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : "https://via.placeholder.com/120x180?text=No+Cover";
          return `
                    <div class="book-card">
                        <img src="${cover}" alt="${book.title}" />
                        <h4>${book.title}</h4>
                        <p>${
                          book.author_name
                            ? book.author_name.join(", ")
                            : "Unknown Author"
                        }</p>
                        <button onclick="openReader('${
                          book.key
                        }')">Read</button>
                    </div>`;
        })
        .join("");

      recommendedContainer.innerHTML = bookHTML;
    })
    .catch((err) => {
      console.error("Error fetching recommended books:", err);
      recommendedContainer.innerHTML = `<p>Unable to load recommended books at this time.</p>`;
    });
}

// Call the function to display recommended books
displayRecommendedBooks();


// Community Discussions Section
// Fetching community discussions from a local JSON file
// Fetching community discussions from a local JSON file
fetch("./data/community_discussions.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    const communitySection = document.getElementById("community");
    const discussions = data.discussions
      .map((discussion) => {
        const repliesHTML = discussion.replies
          .map(
            (reply) => `
      <div class="reply">
        <p><strong>${reply.username}</strong> (${new Date(
              reply.date
            ).toLocaleString()}): ${reply.reply}</p>
      </div>
    `
          )
          .join("");

        return `
      <div class="discussion" data-id="${discussion.id}">
        <p class="comment-header"><strong>${
          discussion.comment_header
        }:</strong></p>
        <div class="collapsed-content">
          <p class="truncated-comment">${discussion.comment.substring(
            0,
            50
          )}...</p>
          <button class="read-more-btn" onclick="showFullComment(${
            discussion.id
          })">Read More</button>
        </div>
        <div class="full-content" style="display: none;">
          <p class="full-comment">${discussion.comment}</p>
          <div class="replies">
            ${repliesHTML}
          </div>
          
          <div class="add-reply" style="display:none;">
            <textarea id="replyText-${
              discussion.id
            }" placeholder="Add your reply..."></textarea>
            <button onclick="addReply(${discussion.id})">Reply</button>
          </div>
          <button class="show-less-btn" onclick="hideFullComment(${
            discussion.id
          })">Show Less</button>
        </div>
      </div>
    `;
      })
      .join("");

    communitySection.innerHTML += discussions;
  })
  .catch((error) => {
    console.error("Error fetching community discussions:", error);
    document.getElementById("community").innerHTML =
      "<p>Unable to load community discussions at this time.</p>";
  });

function showFullComment(id) {
  const discussionElement = document.querySelector(
    `.discussion[data-id="${id}"]`
  );
  const collapsedContent = discussionElement.querySelector(".collapsed-content");
  const fullContent = discussionElement.querySelector(".full-content");
  const addReplySection = fullContent.querySelector(".add-reply");

  collapsedContent.style.display = "none";
  fullContent.style.display = "block";
  addReplySection.style.display = "block"; // Show the reply section
}

function hideFullComment(id) {
  const discussionElement = document.querySelector(
    `.discussion[data-id="${id}"]`
  );
  const collapsedContent = discussionElement.querySelector(".collapsed-content");
  const fullContent = discussionElement.querySelector(".full-content");
    const addReplySection = fullContent.querySelector(".add-reply");


  collapsedContent.style.display = "block";
  fullContent.style.display = "none";
    addReplySection.style.display = "none"; // Hide the reply section

}

function addReply(discussionId) {
  const replyText = document.getElementById(`replyText-${discussionId}`).value;
  if (replyText.trim() === "") {
    alert("Reply cannot be empty.");
    return;
  }

  const discussionElement = document.querySelector(`.discussion[data-id="${discussionId}"]`);
  const repliesContainer = discussionElement.querySelector(".replies");

  const newReplyHTML = `
    <div class="reply">
      <p><strong>You</strong> (Just now): ${replyText}</p>
    </div>
  `;

  repliesContainer.innerHTML += newReplyHTML;

  document.getElementById(`replyText-${discussionId}`).value = "";
}

  // Updated mapping for discussions
  // fetch("./data/community_discussions.json")
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     const communitySection = document.getElementById("community");
  //     const discussions = data.discussions
  //       .map((discussion) => {
  //         const repliesHTML = discussion.replies
  //           .map(
  //             (reply) => `
  //       <div class="reply">
  //         <p><strong>${reply.username}</strong> (${new Date(
  //               reply.date
  //             ).toLocaleString()}): ${reply.reply}</p>
  //       </div>
  //     `
  //           )
  //           .join("");

  //         return `
  //       <div class="discussion" data-id="${discussion.id}">
  //         <p class="truncated-comment">${discussion.comment}</p>
  //         <p class="full-comment" style="display: none;">${
  //           discussion.full_comment
  //         }</p>
  //         ${
  //           discussion.truncated
  //             ? `<button class="read-more-btn" onclick="showFullComment(${discussion.id})">Read More</button>`
  //             : ""
  //         }
  //         <div class="replies">
  //           ${repliesHTML}
  //         </div>
  //       </div>
  //     `;
  //       })
  //       .join("");

  //     communitySection.innerHTML += discussions;
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching community discussions:", error);
  //     document.getElementById("community").innerHTML =
  //       "<p>Unable to load community discussions at this time.</p>";
  //   });