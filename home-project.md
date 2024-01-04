## Part I

0. Move not found error handling to main error handling middleware (copies router and books router)
   - make sure messages are customizable (message for books says "book" and for copies says "copy")
1. Return books
2. Search members page
3. Distinct members

## Part II

1. Build list members page (add search)
2. Build member details page (edit member)
3. Build add member page
4. List borrowed copies in member details page (allow to return copy)

- `git checkout practice_refactor` - fix errors in book-details.ts

## Part III

1. Implement login with cookies (secure, signed, httpOnly)
2. Validate that the userId actually exists in the server
3. Display username in the top of every page (except for login and register)
4. If user is not logged in, redirect the client to login (except if you are in register)
5. Implement logout
6. In login and register, redirect to index if user is logged in
