document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const bookKey = params.get("book");

  if (!bookKey) {
    document.getElementById("bookTitle").innerText = "No book selected.";
    return;
  }

  // Fetch book details
  const bookResponse = await fetch(`https://openlibrary.org${bookKey}.json`);
  const bookData = await bookResponse.json();

  document.getElementById("bookTitle").innerText = bookData.title;

  // Check if the book has an online readable version
  if (
    bookData.ebooks &&
    bookData.ebooks.length > 0 &&
    bookData.ebooks[0].preview_url
  ) {
    document.getElementById(
      "bookContent"
    ).innerHTML = `<iframe src="${bookData.ebooks[0].preview_url}" width="100%" height="400px"></iframe>`;
  } else {
    document.getElementById("bookContent").innerText =
      "No readable version available.";
  }

  // Load reading position from LocalStorage
  const savedPosition = localStorage.getItem(`readingPosition-${bookKey}`);
  if (savedPosition) {
    document.getElementById("reader").scrollTop = parseInt(savedPosition);
  }

  // Save reading position
  document.getElementById("savePosition").addEventListener("click", () => {
    localStorage.setItem(
      `readingPosition-${bookKey}`,
      document.getElementById("reader").scrollTop
    );
    alert("Reading position saved!");
  });
});

function goBack() {
  window.history.back();
}
