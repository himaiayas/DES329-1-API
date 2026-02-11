# DES329-1-API♠

## Setup
1. Install bun<br>
   `powershell -c "irm bun.sh/install.ps1 | iex"`
   
2. Clone this github repo and navigate to root (/app)
   
3. Install dependencies<br>
  `bun i`
  
4. Create .env file in root with the following structure<br>
   ```
    DATABASE_URL = "YOUR_DB_URL"
   ```
5. We used Drizzle ORM as a database adapters. For more info, please see https://orm.drizzle.team/docs/overview <br>
  To open database client (GUI), execute<br>
  `bun drizzle-kit studio`
   
6. Start Elysia web server<br>
  `bun dev`
<hr>

## Documentation <br>
### Custom Services

1. **authService**
   - get session id from cookie, then retrieve session and user from db
   ```ts
   // example
   export const signOutRoute = new Elysia().post(
     "/auth/signout",
     async ({ cookie }) => {
       const session = await authService.auth(cookie);
         // session is returned if client has un-expired cookie and matching session id
   );

   // methods
   authService.authUser(cookie);    // return session if client's role is "user"
   authService.authAdmin(cookie);   // return session if client's role is "admin"
   ```
2 **CustomError**
   ```ts
   // inheritance from Error, use this instead of Error, ELysia parent route will handle try_catch block
   CustomError(statusJSON: StatusJSON, message?: string);

   // each of the status is of type StatusJSON
   HTTP_STATUS = {OK, CREATED, BAD_REQUEST, ...} 

   // example
   throw new CustomError(HTTP_STATUS.UNAUTHORIZED);
   ```
