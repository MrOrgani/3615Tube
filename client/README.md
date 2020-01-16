## If errors on Database

### like :

`ERROR CONNECTING TO DB QueryFailedError: column "id" contains null values server_container | at new QueryFailedError (/usr/app/src/error/QueryFailedError.ts:9:9) [...]`

docker -it exec postgres_container bash
docker exec -it postgres_container bash
---> psql -U postgres
---> DELETE FROM users;

## How the Front-End Works

src
├── apollo.ts
├── common -> ../../common/
├── components
│ ├── ChangePassword
│ ├── FiledInput
│ ├── ForgotPassword
│ ├── avatar
│ ├── button
│ ├── footer
│ ├── header
│ ├── login
│ ├── movie-item
│ ├── movie-list
│ ├── movie-list-skeleton
│ ├── movie-skeleton
│ ├── register
│ │ ├── RegisterConnector `(3)`
│ │ └── RegisterView
│ ├── skeleton-item
│ ├── user-activity
│ └── user-profile
├── controller
│ ├── ChangePasswordController
│ ├── ForgotPasswordController
│ ├── LoginController
│ ├── RegisterController `(4)`
│ └── UserProfileController
├── pages
│ ├── change-password/
│ ├── forgot-password/
│ ├── homepage/
│ ├── login/
│ ├── profile/
│ ├── register/
│ └── index.tsx `(2)`
├── utils
│ └── normalizeErrors.ts
└── index.tsx `(1)`

index.tsx (1) is called :
it will compile the Apollo Provider params (from src/apollo.ts)
it will also call the Router from pages (so you navigate on the website) /src/pages/index.tsx (2)

When you go on a page, for example Register (127.0.0.1:3000/register) :
the Router (/src/pages/index.tsx) you call the Register Page (/src/pages/register) which calls the Register Connector from components (src/components/`Register`connector) (3)

A Connector will link a Controller to a View, for example with `Register`:
in the `RegisterConnector`, the `RegisterController` is called (4)
A `Controller` will collect values from a `View` and send them to the Back, here through `GraphQL`, wich will respond with other data.
These ones will be used the `View` depending on the device used (`React` for Desktop / `React-Native` for mobile (not implemented here))
