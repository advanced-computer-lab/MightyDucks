# Welcome to MightyDucks Airlines
This project was created for the Advanced Computer Lab course offered by the German University in Cairo.
## Technologies
`Database`: MongoDB <br>
`Frontend`: React JS <br>
`Backend` : Node JS & Express JS <br> <br>
*The project utilizes the MERN stack* <br>
## Prerequisites
You need `node` and `npm` installed on your system to build and run this project.
## Installing dependancies
To install all the project dependencies run:
```bash
npm install
```
inside both frontend and backend directories
## Running the application
Run the following command inside the frontend directory:
```bash
npm start
```
Run the following command inside the backend directory:
```bash
npm run dev
```



## ***Admin Privileges:***
1. The admin can create flights by specifying the following:<br>
	- Flight Number<br>
	- Departure and Arrival Locations, Dates, and Times<br>
	- Number of Economy, Business Class, and First Class Seats<br>

2. The admin can search for existing flights by either of these factors:<br>
	- Flight number<br>
	- Departure Destination<br>
	- Arrival Destination<br>
	- Departure Date and Time<br>
	- Arrival Date and Time<br>

3. The admin can view all the flights that have been created, while viewing all the flight details.

4. The admin can edit the flights by editing any of the flight’s details.

5. The admin can delete an existing flight.

6. The admin has normal user privileges as well as the admin ones.

7. The admin user can view the following information from the drawer:
	- Username<br>
	- First Name<br>
	- Last Name<br>
	- Email<br>
	- Passport Number<br>
	- Edit Profile option<br>
	- My Trips option<br>
	- Admin controls option<br>

8. The admin can edit their profile information from the ‘Edit Profile’ option in the drawer. The admin can change the following information:
	- Username<br>
	- First Name<br>
	- Last Name<br>
	- Email<br>
	- Passport Number<br>
	- Password<br>

9. The admin can view their reserved upcoming and past trips from the ‘My Trips’ option in the drawer.

10. The admin can switch to their admin privileges from the ‘Admin Controls’ option in the drawer.

11. The admin can return to the dashboard by clicking on the logo of the website.

12. The admin can sign out using the ‘Sign Out’ in the navigation bar.

13. The admin can search for flights either from the dashboard or from the ‘Book a flight?’ option in the navigation bar by adding the following information:
	- Departure and Arrival Locations<br>
	- Departure and Return Dates<br>
	- Number of Adults and Children<br>
	- Cabin type (Economy, Business Class, or First Class) <br>
14. The admin can choose and select from the flight results for departure and return options. The user, then, gets to choose their seats for both trips, and finally the user can proceed to payment.

15. Upon payment, the admin can choose to pay either to pay with ‘Visa’ or ‘Master Card’, and then enter the following information:
	- Card Number
	- Expiration Date
	- CCV

16. After a successful payment, the admin user will receive an email with their itinerary, if they had chosen that option.


## ***Guest User Privileges:***
1. The guest user can login using the username and password.

2. The guest user can sign up from the login page as well as the navigation bar.

3. The guest user can sign up by adding the following obligatory and optional information:
	- Username (obligatory) <br>
	- First Name and Last Name (obligatory) <br>
	- Email (obligatory) <br>
	- Password (obligatory) <br>
	- Passport Number (obligatory) <br>
	- Home Address (optional) <br>
	- Country Code and Telephone Number (optional) <br>

4. The guest user can go the login page from the sign up page or from the navigation bar.

5. The guest user can search for flights either from the dashboard or from the ‘Book a flight?’ option in the navigation bar by adding the following information:
	- Departure and Arrival Locations<br>
	- Departure and Return Dates<br>
	- Number of Adults and Children<br>
	- Cabin type (Economy, Business Class, or First Class) <br>

6. The guest user can choose and select from the flight results for departure and return, however, the guest user can’t proceed to payment without logging in first.

7. The guest user can return to the dashboard by clicking on the logo of the website.


## ***Logged In User Privileges:***
1. The logged in user can sign out using the ‘Sign Out’ in the navigation bar.

2. The logged in user can search for flights either from the dashboard or from the ‘Book a flight?’ option in the navigation bar by adding the following information:
	- Departure and Arrival Locations<br>
	- Departure and Return Dates<br>
	- Number of Adults and Children<br>
	- Cabin type (Economy, Business Class, or First Class) <br>

3. The logged in user can choose and select from the flight results for departure and return options. The user, then, gets to choose their seats for both trips, and finally the user can proceed to payment.

4. Upon payment, the logged in user can choose to pay either to pay with ‘Visa’ or ‘Master Card’, and then enter the following information:
	- Card Number
	- Expiration Date
	- CCV

5. After a successful payment, the logged in user will receive an email with their itinerary, if they had chosen that option.

6. The logged in user can view the following information from the drawer:
	- Username<br>
	- First Name<br>
	- Last Name<br>
	- Email<br>
	- Passport Number<br>
	- Edit Profile option<br>
	- My Trips option<br>

7. The logged in can edit their profile information from the ‘Edit Profile’ option in the drawer. The admin can change the following information:
	- Username<br>
	- First Name<br>
	- Last Name<br>
	- Email<br>
	- Passport Number<br>
	- Password<br>

8. The logged in can view their reserved upcoming and past trips from the ‘My Trips’ option in the drawer

9. The logged in user can cancel their reservation for a trip, and get an email with their cancelled reservation and the amount to be refunded.

10. The logged in user can return to the dashboard by clicking on the logo of the website.
