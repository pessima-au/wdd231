

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


const url = "./data/membership_levels.json";
async function getMembershipLevels() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        const data = await response.json()
        membershipCards(data.memberships);
    } catch (error) {
        console.log(error);
    }

}
getMembershipLevels()

function membershipCards(memberships) {
    const cardContainer = document.querySelector("#membership-cards");
    
    memberships.forEach(membership => {
        const membershipCard = document.createElement('div');
        membershipCard.classList.add('membership-card');

            if (membership.level.includes("NP")) {
              membershipCard.classList.add("np");
            } else if (membership.level.includes("Bronze")) {
              membershipCard.classList.add("bronze");
            } else if (membership.level.includes("Silver")) {
              membershipCard.classList.add("silver");
            } else if (membership.level.includes("Gold")) {
              membershipCard.classList.add("gold");
            }


        const heading = document.createElement("h2");
        heading.textContent = membership.level;
        membershipCard.appendChild(heading)

        const details = document.createElement("button")
        details.className = "details-btn";
        details.textContent = "See details";
        membershipCard.appendChild(details)

        cardContainer.appendChild(membershipCard);

        details.addEventListener('click', () => {
            const dialog = document.createElement("dialog");
            dialog.className = "membership-dialog";

            dialog.innerHTML = `
            <button class="close-dialog">❌</button>
            <h2>${membership.level}</h2>
            <p>Membership fee: ${membership.cost}</p>
            <ul>
                ${membership.benefits.map(benefit => ` <li>${benefit}</li>`).join("")}
            </ul>
            `;
            document.body.appendChild(dialog);
               dialog.showModal();
           
            
            const closeDialog = dialog.querySelector(".close-dialog");
            closeDialog.addEventListener('click', () => {
                dialog.close();
                dialog.remove();
            })
            
        })

        
    })
}

