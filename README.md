# Toyota Sales
URL : https://toyotasales-2615d6c828ac.herokuapp.com (turned off)
Admin login: toktarwow
Admin password: toktarwow123

In search page enter:
Make: Toyota Mercedes-Benz BMW 
Model: Corolla Camry rav4 M5 


## Prerequisites

- Node.js installed
- MongoDB Atlas account

## Installation

1. Clone the repository: ```git clone https://github.com/your/repository.git```
2. Install dependencies: ```npm install``` (put dependencies in the package.json file first then write this command)
## Dependencies

- axios: ^1.6.7
- bcryptjs: ^2.4.3
- body-parser: ^1.20.2
- ejs: ^3.1.9
- express: ^4.18.2
- express-session: ^1.18.0
- mongoose: ^8.1.3

## Usage


1. Configure MongoDB Atlas connection string in `app.js`. 
2. Set up your Gmail account credentials in `email.js`. (i already have put my gmail account template and server)
3. Run the server:
`npm start`
`npx nodemon`
This will start the server, and you can access the app at [http://localhost:3000](http://localhost:3000/) in your web browser.


## APIs Used
 
- Car API (expired)
- Marketcheck API (expired)
- Cardata API (expired)

## Design Decisions

- Used MongoDB Atlas for database hosting.
- Implemented user authentication and authorization using bcrypt for password hashing and sessions for authentication.
- Implemented multilanguage support using jQuery i18n.
- Designed visually appealing and responsive UI using Bootstrap and CSS.
- Organized project folders cleanly.
- Utilized EJS for templating.

## Authentication

- Implemented user registration with password hashing using bcrypt.
- Created login functionality with bcrypt password comparison.
- Implemented authentication middleware to protect routes.
- Stored user roles in the database and implemented authorization checks.
- User will automatically log out after 30 min , because i put maxAge of session to 30 minutes. 
- Secure auth with httpOnly,ephemeral and don't let browser javascript access cookie ever

## Database

- Used MongoDB Atlas as the database.
- Defined schemas using Mongoose for user, quiz history, and item (car)  data.

## Multilanguage Support

- Supported English (en) and Russian (ru) languages.
- Used jQuery i18n for language localization.
- Provided language-specific JSON files for translation.

### Timed Quizzes

- Implemented countdown timer for quiz sessions.
- Provided feedback on completion within the time limit.
- Integrated social media sharing buttons in the quiz interface.
- Enabled users to share quiz results.
- History of taken quizez with score
