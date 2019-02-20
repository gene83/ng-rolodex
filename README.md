# ng-rolodex

Angular 2+ Exercise

![homepage](.github/home.png?raw=true)

## Setup the Server

1. Generate a project using: `ng new ng-rolodex --style=scss`
1. Change into dir: `cd ng-rolodex`
1. Install project deps: `npm i`
1. Add the `express` and `body-parser` dependency
1. Add the `knex`, `bookshelf`, `pg`, and `pg-hstore` dependencies
1. Create a postgres user named `admin` with a password
1. Create a postgres database named `ng_rolodex` owned by `admin`
1. Update `knexfile.js`
1. Create a 2 models, `Users` and `Contacts` _refer to **[schemas](#schemas)**_
1. Create the appropriate Bookshelf model files.
1. Setup an express project in `server.js`
1. Set up express static middleware configured to serve content from `./public`
1. Set up express static middleware for `body-parser`
1. Add router middleware for `/api` to use the `/api/index.js` module
1. `/api/index.js` will require and use the two modules, `./contacts`, `./users`
1. Implement the routes defined in **[routes](#routes)**


### Angular App Requirements


#### Login Page

The default view for this application should be a login page that takes in a username (and a password once full authentication is setup). And a "Login" button that allows the username to login with a username. The login page itself should be on the route "/login" but the "/" route should redirect to the login page if the user is not logged in.

The login form should have full validation of all input fields. A successful login should redirect to the home page, while an unsuccessful login, should show the login error on the login page.


#### Page header

There should be a page header that's viewable on each page. This header should be dynamic based on whether the user is logged in or not.

When not logged in, the header should only display the name of the application on the top left.

When logged in, along with the name of the application, a button to create a new contact, view all contacts, to view the users profile, and a logout button should be displayed.


#### Home Page

The "/" route should display just a search bar that allows the user to search for a contact and a search button to execute the search against the backend server.

After inputting a few characters, and clicking the "Search" button, the view should be updated with a list of contacts that match the given character set.

For example,

With Input "jas", and clicking the "Search" button:

There should be a list of contacts in alphabetical order -

**Jas**on Sewell  
**Jas**on Statham  
**Jas**on Voorhees

Each one of the contacts should be a link that takes the user to the contact page for that contact. The Contact page should display all known information on that contact.


#### Authorization

For mvp, it's sufficient for a user to login with just a username, if the username exists, store the user's `user_id` in `localStorage`.

The user can logout. On logout, delete the `user_id` value from `localStorage` and redirect the user back to the home route `/`.

A user must be `loggedIn` in order to create a new `Contact`.

When the user is not logged in, the only page that should be available to them is the Login page.


#### Login Guard

Create a `login-guard.service.ts` file in `/src/app/services` and implement a `canActivate` method that checks to see if the user is logged in or not. Return true if the user is logged and return false if the user is not. This login-guard should be placed all routes that require a user to be logged in to function properly. The routes needed to be protected are: '/', '/contacts', '/profile', '/contacts/new', and '/contacts/:id'.


#### Contacts

The `/contacts` route will list all contacts for this user.

The list of all contacts has links to the `/contact/:id` route.

The `/contact/:id` route will show the contact's name at the top along with any additional contact information given when the contact was created/edited.


#### Profile

The `/profile` route should show all the user's current information and allows the user to edit their own information.


### Schemas


#### Users

| Property   | Type     | Options          |
| ---------- | -------- | ---------------- |
| id (PK)    | number   | not null, unique |
| username   | string   | not null, unique |
| created_at | TS w/ TZ | not null         |
| updated_at | TS w/ TZ | not null         |
| name       | string   | nullable         |
| email      | string   | nullable         |
| address    | string   | nullable         |


#### Contacts

| Property    | Type     | Options          |
| ----------- | -------- | ---------------- |
| id (PK)     | number   | not null, unique |
| name        | string   | not null         |
| created_at  | TS w/ TZ | not null         |
| updated_at  | TS w/ TZ | not null         |
| address     | string   | nullable         |
| mobile      | string   | nullable         |
| work        | string   | nullable         |
| home        | string   | nullable         |
| email       | string   | nullable         |
| twitter     | string   | nullable         |
| instagram   | string   | nullable         |
| github      | string   | nullable         |

**associations**

| Foreign Key | Name    | Relation         |
| ----------- | ------  | ---------------- |
| created_by  | creator | belongs to Users |


## Routes

| module source file      | route                          | action                                                                                          |
| ----------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------- |
| api/users/index.js    | GET /api/profile?user=:id      | Respond with current user's profile                                                             |
| api/users/index.js    | PUT /api/users?user=:id         | Edit current user account information                                                           |
| api/users/auth.js    | POST /api/login                | Logs a user in                                                                                  |
| api/users/auth.js    | POST /api/logout               | Logs a user out                                                                                 |
| api/users/auth.js    | POST /api/register             | Registers a new user with the application                                                       |
| api/contacts/index.js   | GET /api/contacts?user=:id     | Respond with all contacts for the logged in user                                                |
| api/contacts/index.js   | GET /api/contacts/search/:term?user=:id     | Respond with all contacts that match the search term for this user             |
| api/contacts/index.js   | POST /api/contacts             | Create and respond with a new contact                                                           |
| api/contacts/index.js   | GET /api/contacts/:id          | Respond with the contact that matches this id                                                   |
| api/contacts/index.js   | PUT /api/contacts/:id          | Update and respond with the updated contact                                                     |
| api/contacts/index.js   | DELETE /api/contacts/:id       | Delete the contact that matches the given id, respond with Status 200 OK                        |

Please note that the following routes will change once a full authentication system is in place.  
`GET /api/profile?user=:id` => `GET /api/profile`  
`PUT /api/users?user=:id` => `PUT /api/users`  
`GET /api/contacts?user=:id` => `GET /api/contacts`  
`GET /api/contacts/search/:term?user=:id` => `GET /api/contacts/search/:term`  

Additionally the body contents of the following route will need to be modified to not send the current user's id with the body. This information should be pulled off the session at this point.  
`PUT /api/users`  
`POST /api/contacts`  


## Stretch Goals

- Debounce search input
- Autofocus inputs between component reloads
- Separate `/contacts` items alphabetically
- add supertest
- enable real auth
- styles

## Super Stretch Goals

- Use observables for session handling
- Debounce search input using observables
