# CodersPair APIs

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

Status: ignore, interested, accepted, rejected

## userRouter

- GET /user/requests/received
- GET /user/connections
- GET /user/feed - Gets us the profile of other users on the platform
