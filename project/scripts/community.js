
const url = "./data/community.json";

let discussionsData = [];

async function fetchDiscussions() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displayDiscussions(data);
    discussionsData = data.discussions;
    return data;
  } catch (error) {
    console.error("Failed to fetch discussions:", error);
  }
}

fetchDiscussions();

function displayDiscussions(data) {
  
  const communitySection = document.getElementById("community");
  const discussions = data.discussions;

  discussions.forEach((discussion, index) => {
    const discussionDiv = document.createElement("div");
    discussionDiv.classList.add("discussion");
    discussionDiv.setAttribute("data-discussion-id", index);

    const commentContainer = document.createElement("div");
    commentContainer.classList.add("comment-container");

    // Header
    const header = document.createElement("h3");
    header.innerHTML = `<strong>${discussion.comment_header}</strong>`;
    commentContainer.appendChild(header);

    const commentText = document.createElement("p");
    commentText.classList.add("comment-text");
    commentText.innerHTML = `<b>${discussion.username}</b> (${new Date(discussion.date).toLocaleDateString('en-US')}): ${discussion.comment}`;
    commentContainer.appendChild(commentText);

    // Details button
    const detailsButton = document.createElement("button");
    detailsButton.classList.add("details-button");
    detailsButton.textContent = "Details";
    
    commentContainer.appendChild(detailsButton);

    // Close button
    const closeButton = document.createElement("button");
    closeButton.classList.add("close-button");
    closeButton.style.display = "block";
    closeButton.textContent = "Close Details";

    const repliesContainer = document.createElement("div");
    repliesContainer.classList.add("replies");
    repliesContainer.style.display = "none";

    const repliesHTML = discussion.replies.map(reply => `
      <div class="reply">
        <p><strong>${reply.username}</strong> (${new Date(reply.date).toLocaleString()}): ${reply.reply}</p>
      </div>
    `).join("");
    repliesContainer.innerHTML = repliesHTML;

    discussionDiv.appendChild(commentContainer);
    discussionDiv.appendChild(repliesContainer);

    // Event listener for details button
    detailsButton.addEventListener("click", () => {
      commentText.innerHTML = `<b>${discussion.username}</b> (${new Date().toLocaleDateString('en-US')}): ${discussion.full_comment}`;      
      
      let addReplySection = discussionDiv.querySelector(".add-reply");      
      if (!addReplySection) {
        addReplySection = document.createElement("div");
        addReplySection.classList.add("add-reply");
        discussionDiv.appendChild(addReplySection);
        addReplySection.style.display = "block";


      const replyTextArea = document.createElement("textarea");
      replyTextArea.id = `replyText-${index}`;
      replyTextArea.placeholder = "Add your reply...";
      addReplySection.appendChild(replyTextArea);

      const replyButton = document.createElement("button");
      replyButton.textContent = "Reply";
      replyButton.addEventListener("click", () => {
        const replyText = replyTextArea.value;
        if (replyText.trim() === "") {
          alert("Reply cannot be empty.");
          return;
        }

        const newReply = {
          username: "You", // Replace with actual username if available
          date: new Date().toISOString(),
          reply: replyText,
        };

        discussion.replies.push(newReply);
        repliesContainer.innerHTML = discussion.replies
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
        replyTextArea.value = "";
      });
      addReplySection.appendChild(replyButton);
      }

      addReplySection.appendChild(closeButton);
      repliesContainer.style.display = "block";
      detailsButton.style.display = "none";
      

      // Ensure the add-reply section is visible
      addReplySection.style.display = "block";

    });
    


    // Event listener for close button
    closeButton.addEventListener("click", () => {
      commentText.innerHTML = `<b>${discussion.username}</b> (${new Date(discussion.date).toLocaleDateString('en-US')}): ${discussion.comment}`;
      repliesContainer.style.display = "none";
      detailsButton.style.display = "block";
      

      // Hide the add-reply section when closing details
      const addReplySection = discussionDiv.querySelector(".add-reply");
      if (addReplySection) addReplySection.style.display = "none";

    });
    

    communitySection.appendChild(discussionDiv);
  });

  // Add "Start a New Discussion" button
  const startNewDiscussionButton = document.createElement("button");
  startNewDiscussionButton.id = "start-new-discussion";
  startNewDiscussionButton.textContent = "Start a New Discussion";
  const communityContainer = document.getElementById("community-container");
  communityContainer.appendChild(startNewDiscussionButton);

  // Create new comment section (initially hidden)
  const newCommentSection = createNewCommentSection();
  newCommentSection.style.display = "none";
  communityContainer.appendChild(newCommentSection);

  
  // Event listener for "Start a New Discussion" button
  startNewDiscussionButton.addEventListener("click", () => {
    newCommentSection.style.display = "block";
    startNewDiscussionButton.style.display = "none";
  });

  // Event listener for submitting a new comment (inside the new comment section)
  const submitCommentButton = newCommentSection.querySelector("#submit-new-comment");
  submitCommentButton.addEventListener("click", () => {
    
    const header = document.getElementById("new-comment-header").value;
    const comment = document.getElementById("new-comment-text").value;
    const username = "You";
    const date = new Date().toISOString();

    if (!header || !comment) {
      alert("Please fill in both the header and the comment.");
      return;
    }

    // Clear the input fields
    document.getElementById("new-comment-header").value = "";
    document.getElementById("new-comment-text").value = "";

    // Hide the new comment section and show the button again
    newCommentSection.style.display = "none";
    startNewDiscussionButton.style.display = "block";



    const newDiscussion = {
      comment_header: header,
      comment: comment,
      full_comment: comment,
      username: username,
      date: date,
      replies: []
    };

    discussionsData.push(newDiscussion);
    communitySection.innerHTML = ""; // Clear existing discussions
    displayDiscussions({ discussions: discussionsData });
  });
  
}

function createNewCommentSection() {
  const newCommentSection = document.createElement("div");
  newCommentSection.classList.add("new-comment-section");

  const newCommentHeader = document.createElement("h3");
  newCommentHeader.textContent = "Start a New Discussion";
  newCommentSection.appendChild(newCommentHeader);

  const newCommentInput = document.createElement("input");
  newCommentInput.id = "new-comment-header";
  newCommentInput.type = "text";
  newCommentInput.placeholder = "Enter discussion header";
  newCommentSection.appendChild(newCommentInput);

  const newCommentTextArea = document.createElement("textarea");
  newCommentTextArea.id = "new-comment-text";
  newCommentTextArea.placeholder = "Enter your comment here";
  newCommentSection.appendChild(newCommentTextArea);

  const submitCommentButton = document.createElement("button");
  submitCommentButton.id = "submit-new-comment";
  submitCommentButton.textContent = "Submit Comment";
  newCommentSection.appendChild(submitCommentButton);

  return newCommentSection;
}
