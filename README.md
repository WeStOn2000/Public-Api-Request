This application displays a gallery of employee profiles fetched from the Random User Generator API. Each employee card can be clicked to view detailed information in a modal window. Users can also filter employees by name using a search feature.
Features:
Gallery Display:

Employees are displayed in a responsive grid layout.
Each employee card includes their profile picture, name, email, and location.
Modal Window:

Clicking on an employee card opens a modal window with detailed information, including their profile picture, name, email, address, phone number, and birthday.
The modal window includes "Prev" and "Next" buttons to navigate between employee profiles without closing the modal.
Search Functionality:

Users can search for employees by name using the search bar at the top.
The search dynamically filters the displayed employees based on the entered text.
Styling Customizations:
Color Scheme:
Adjusted text colors to improve readability.
Updated button colors for a more cohesive design.
Background Color:
Changed background colors for the search bar and modal window to enhance visibility and aesthetics.
Code Customizations:
API Request:
Modified the API request to fetch employees from the United States, Great Britain, Canada, Australia, and New Zealand (nat=us,gb,ca,au,nz) to ensure only English alphabet names are fetched.