//variable for the Api
const url = "https://randomuser.me/api/?results=12";

// Function to append cards to the gallery
function displayUsers(users){
    const gallery = document.getElementById('gallery');
    users.forEach(user => {
        const cardHTML = createCardHTML(user);
        gallery.insertAdjacentHTML("beforeend",cardHTML);
        
    });

}
//Fetch users from the Random User Generator API
fetch(url)
   .then(response => response.json())
   .then(data => {
    displayUsers(data.results);
   })
   .catch(() => {
      console.error('Error fetching users:');
   });
   