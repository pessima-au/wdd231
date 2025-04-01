//URLSearchParams
const paramsString = window.location.search;
const myInfo = new URLSearchParams(paramsString);
console.log(myInfo);

document.querySelector("#data-display").innerHTML = `
<p>Your Information</p>
<p><strong>Name: </strong>${myInfo.get("first")} ${myInfo.get("last")}</p>
<p><strong>Organization Title: </strong>${myInfo.get("title")}</p>
<p><strong>Email: </strong>${myInfo.get("email")}</p>
<p><strong>Phone: </strong>${myInfo.get("telephone")}</p>
<p><strong>Business Name: </strong>${myInfo.get("business_name")}</p>
<p><strong>Membership Level: </strong>${myInfo.get("membership")}</p>
<p><strong>Business Description: </strong>${myInfo.get("business_desc")}</p>
<p><strong>Organization Title: </strong>${myInfo.get("business_name")}</p>
<p><strong>Submit Date: </strong>${myInfo.get("timestamp")}</p>
`;


// Last Modified Date
const lastModified = document.querySelector("#lastModified");
lastModified.textContent = `Last Modified: ${document.lastModified}`;

// Current Year
document.querySelector("#currentYear").textContent = new Date().getFullYear();

// Mobile Menu
const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

hamButton.addEventListener("click", () => {
  navigation.classList.toggle("active");
  hamButton.classList.toggle("open");
});