//variable for the Api 
const url = "https://randomuser.me/api/?results=12&nat=us,gb,ca,au,nz";
//variables for current users
let currentUsers = [];
let currentIndex = 0;

// Function to append cards to the gallery
function displayUsers(users){
    const gallery = document.getElementById('gallery');
    gallery.innerHTML='';
    users.forEach(user => {
        const cardHTML = createCardHTML(user);
        gallery.insertAdjacentHTML("beforeend",cardHTML);
        
    
    //Eventlistener that listens to the click event of each card
    const card = gallery.lastElementChild;
                card.addEventListener('click', () => {
                    currentIndex = currentUsers.indexOf(user);
                    displayModal(user);
                });
            });

}
//Fetch users from the Random User Generator API
fetch(url)
   .then(response => response.json())
   .then(data => {
    currentUsers = data.results
    displayUsers(data.results);
   })
   .catch(() => {
      console.error('Error fetching users:');
   });
    // Function to create a card HTML string
    function createCardHTML(user) {
        return `
            <div class="card" data-index="${currentUsers.indexOf(user)}">
                <div class="card-img-container">
                    <img class="card-img" src="${user.picture.large}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                    <p class="card-text">${user.email}</p>
                    <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
                </div>
            </div>
        `;
    }
       // Function to create modal content HTML string
       function createModalContentHTML(user) {
        const birthday = new Date(user.dob.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        return `
         <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                    <p class="modal-text">${user.email}</p>
                    <p class="modal-text cap">${user.location.city}, ${user.location.state}</p>
                    <hr>
                    <p class="modal-text">${user.cell}</p>
                    <p class="modal-text">${user.location.street.number} ${user.location.street.name}, 
                    ${user.location.city}, ${user.location.state}, ${user.location.postcode}</p>
                    <p class="modal-text">Birthday: ${birthday}</p>
                </div>
                  <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
          `;
    }
      // Function to display the modal with user details
      function displayModal(user) {
        let modalContainer = document.querySelector('.modal-container');

        if (!modalContainer) {
            modalContainer = document.createElement('div');
            modalContainer.classList.add('modal-container');
            document.body.appendChild(modalContainer);
        }

        const modalContent = createModalContentHTML(user);
        modalContainer.innerHTML = `<div class="modal">${modalContent}</div>`;
        modalContainer.style.display = 'flex';

// AN Eventlistener for closing the modal
        document.getElementById('modal-close-btn').addEventListener('click', closeModal);

        //An eventlistener when clicking outside the modal
        modalContainer.addEventListener('click', (event) => {
            if (event.target === modalContainer) {
                closeModal();
            }
        });
         // event listeners for Prev and Next buttons
         document.getElementById('modal-prev').addEventListener('click', showPrevUser);
         document.getElementById('modal-next').addEventListener('click', showNextUser);
     }
    

    // Function to close the modal
    function closeModal() {
        const modalContainer = document.querySelector('.modal-container');
        if (modalContainer) {
            modalContainer.style.display = 'none';
        }
    }
    
      // Function to show the previous user in the modal
      function showPrevUser() {
        if (currentIndex > 0) {
            currentIndex--;
            displayModal(currentUsers[currentIndex]);
        }
    }
       // Function to show the next user in the modal
       function showNextUser() {
        if (currentIndex < currentUsers.length - 1) {
            currentIndex++;
            displayModal(currentUsers[currentIndex]);
        }
    }

    // Function to filter users based on search input
    function filterUsers(searchTerm) {
        const filteredUsers = currentUsers.filter(user => {
            const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
            return fullName.includes(searchTerm.toLowerCase());
        });
        displayUsers(filteredUsers);
    }

    // Eventlistener for search form submission
    document.getElementById('search-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const searchInput = document.getElementById('search-input').value;
        filterUsers(searchInput);
    });
