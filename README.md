# DES329-1-API

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
