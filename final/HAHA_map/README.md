# Information
1. group ID 
   19

2. Team member
   B11901028 張沖和
   B11901145 吳宥瑄
   B11901158 徐立承

3. Project Name
   HAHA Map

4. deployment
   http://haha-map.vercel.app
5. function<br/>
   A website that can assist you planning your trip. Schedule, chatroom, Google Map and other things you need in your trip is included.

# Run the project (same way as HW)

1. Install dependencies
   ```bash
   yarn
   ```
2. Get Pusher credentials
   Please refer to the [Pusher Setup](#pusher-setup) section for more details.

3. Get Github OAuth credentials
   Please refer to the [NextAuth Setup](#nextauth-setup) section for more details.

4. Create `.env.local`  file (the same format as HW4) in the project root and add the following content:

   ```text
   POSTGRES_URL=

   PUSHER_ID=
   NEXT_PUBLIC_PUSHER_KEY=
   PUSHER_SECRET=
   NEXT_PUBLIC_PUSHER_CLUSTER=

   AUTH_SECRET=<this can be any random string>
   AUTH_GITHUB_ID=
   AUTH_GITHUB_SECRET=

   NEXT_PUBLIC_BASE_URL=
   ```

5. Start the database
   ```bash
   docker compose up -d
   ```
6. Run migrations
   ```bash
   yarn migrate
   ```
7. Start the development server
   ```bash
   yarn dev
   ```
8. Open http://localhost:3000 in your browser<br/>

# Collaboration

* B11901158 徐立承<br/>
1. UI Frontend design and implementation. 
2. Dealing with almost all tailwindcss properties and arrangement. 
3. Connect UI with the function provided by my teammates.
* B11901145 吳宥瑄
1. Design the structure of schema and backend type format. 
2. Implement the table editing, and HTTPS request in api and hooks.
3. Implement pusher to send messages. 
* B11901028 張沖和
1. Implement the table editing, and HTTPS request in api and hooks.
2. Connect the frontend and backend, put the UI interface to effect.
3. Implement pusher to send messages.
4. Research on google-maps api


