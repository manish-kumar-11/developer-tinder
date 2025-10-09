- 
// auth Router
post// signup
 post // login
 post // logout


 // prfile router
 post // profile
 GET /prfile/view
 -PATCH /profile/edit
 - PATCH /profile/password

 // connection request router

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId

-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId

user Router
-GET user/connections
-GET user/request/
-GET user/feed - Gets you the profle of other users on platform

 status : ignored, interested, accepted, rejected
