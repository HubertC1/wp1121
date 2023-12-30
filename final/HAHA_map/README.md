# Information
1. group ID <br/>
   19<br/>
2. Team member<br/>
   B11901028 張沖和<br/>
   B11901145 吳宥瑄<br/>
   B11901158 徐立承<br/>
3. Project Name<br/>
   HAHA Map
4. deployment<br/>
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

4. Create `.env.local` file in the project root and add the following content:

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
<li>B11901158 徐立承<br/>
UI Frontend design and implementation. Dealing with almost all tailwindcss properties and arrangement. Connect UI with the function provided by my teammates.
<li>B11901145 吳宥瑄<br/>
<li>B11901028 張沖和<br/>

