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

## Demo link: https://youtu.be/ZqfSUjmAq1I

## 心得
* 張冲和：這次的網站真的是連續五天不停歇地在博理地下室肝出來的，我覺得這次真的從頭跟隊友一起策劃一個project的架構，前後端關係，server/client的使用，以及state的控管，讓我學到比以前更深一層的觀念，讓我覺得我有動力在以後的閒暇時間再繼續研究更多的網路技術！
* 徐立承：我覺得這次的專題讓我體會到大家分工的效率。基本上，前端的風格以及排版都是我在戲k拼命地調整出來的，很慶幸隊友們有寫正常運作的API讓我可以方便地連線前後端，並且認真地讓UI更人性化且具有風格。
* 吳宥瑄：這次開工前，我很認真地把前後端的架構一次畫在紙上，好分辨server/client的關係，後端schema如何設計，以及各個table的relation。雖然剛開始的幾天實在是寫一行code就噴十行紅字，我們最後還是逐漸邁向正軌，有功能正常的API可以讓前端大師徐立承加以發揮。很高興這次決定自己設計前後端架構，而不是使用現成的模板，因為這讓我們對網頁設計有更深一層的理解，而不是侷限在語法本身。

