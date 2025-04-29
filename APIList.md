# DevTiner APIs

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter

- POST /request/send/:status/:userId

- POST /request/review/:status/:requestId

## userRouter

- GET /user/connections
- GET /user/requests/
- GET /user/feed - Gets us the profile of other users on the platform

Status: ignore, interested, accepted, rejected
