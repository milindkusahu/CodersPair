Tech Stack: React, Tailwind CSS, daisyUI, React Router, Axios, Redux Toolkit

## Component Design

~
Body
NavBar
Route=/ => Feed
Route=/login => Login
Route=/connections => Connections
Route=/profile => Profile

## Routing Best Practice

~
-> Create BrowserRouter > Routes > Route=/ Body > RouteChildren
-> Create an Outlet in the Body component

## CORS and Troubleshooting

For security reasons browser don't allow the cross origin requests.

-> CORS Erros must be handled from Backend API level.
-> Add Express cors middleware with configuration: origin, credentials: true.
https://expressjs.com/en/resources/middleware/cors.html

-> Whenever we make an API call, we need to pass axios { withCredentials: true }. 

If we don't pass withCredentials, it will not sent the token back for other API Calls.

```
  const handleLogin = async (e) => {
    try {
      (e) => e.preventDefault();
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
    } catch (err) {
      console.err(err);
    }
  };
```
## Redux Tool Kit

1. Install react-redux + @reduxjs/toolkit
2. Configure store.
3. Provide the store to the application using <Provider>.
4. Create Slice and export
5. Add reducer to the store.
6. Add data to redux store through dispatch