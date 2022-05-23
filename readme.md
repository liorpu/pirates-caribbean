Hello and welcome to my home assignment - UI for Admins :)
first of all it was a pleasure to work on this exercise as I learned a lot in a short period of time.

I used MySQL as the database because it can run on very modest hardware and puts very little strain on system resources, and very fast in retrieving information.

This is of course a proof of concept and not a build for production, so here are some things to improve:

In terms of security:
* Passwords and maybe even some data should be encrypted and not saved as plain text on the database.
* The admin and user pages shouldn't be accessible without Admin login and authentication of Admin and user.
* sql injection and other security attacks should be tested.

In terms of efficiency:
* After updating of the db from the client (react) it could be just added to the react frontend withot making another post request that querying the database.

Thank you :)
Lior