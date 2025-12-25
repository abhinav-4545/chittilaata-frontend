                                                🎮 ChittiLaata – Online Multiplayer Web Game
   <img width="830" height="617" alt="Image" src="https://github.com/user-attachments/assets/4afdfccb-0bb4-4478-bb0b-882dfbce39d0" />

ChittiLaata is a fun, turn-based online multiplayer web game inspired by the traditional Telugu game ChittiLaata.
I built this project mainly as a timepass / learning project to experiment with frontend–backend integration, game logic, and deployment.

The game supports multiple players joining via a shared link, role-based guessing, scoring, and round progression.

🚀 Live Demo

🔗 Frontend (Netlify): <your-netlify-link>

🎥 Demo Video: Screen-recorded gameplay showing multiple players joining and playing together
https://github.com/user-attachments/assets/bc91f3a9-e1e9-49a5-9b6f-b3eac2cafbab

📸 Screenshots: Included for invalid cases and edge scenarios

⚠️ Note: Since the backend is hosted on a free Railway domain, the game works best on desktop or Wi-Fi networks.
Some mobile networks may face DNS resolution issues (documented in screenshots).

🧠 Game Concept (High Level)

One player creates a game and shares a join link

Other players join using the same link

Each round:

Players are assigned roles

A specific role becomes the current guesser

The guesser selects another player and makes a guess

Based on correctness:

Points are awarded

Roles may swap

Game continues for the selected number of rounds

Final standings are shown at the end

🎭 Roles Used in the Game

Depending on the number of players, roles are assigned dynamically:

->Raju

->Rani (for higher player counts)

->Manthri

->Senapathi

->Police

->Donga

Each role: Has predefined points

Knows which role it needs to guess next

Determines turn order

🔁 Game Flow (Step by Step)
1️⃣ Create Game

Player selects number of rounds

Backend generates a unique gameId

A shareable link is created

2️⃣ Join Game (Lobby Phase)

Multiple players join using the same link

Lobby auto-refreshes and shows joined players

Game starts once required players are present

3️⃣ Round Start

A Round Start screen shows:

Current round number

Which role/player is going to guess

Small delay before gameplay starts (for clarity)

4️⃣ Gameplay Phase

Current guesser:

Sees other players as paper chits

Selects one and unfolds it (guess)

Backend validates the guess:

Correct → points awarded

Wrong → roles swapped as per rules

Turn moves to the next role

5️⃣ Standings

At any time, players can view:

Current scores

Player rankings

At the end of all rounds:

Final Results page shows winner and leaderboard

❌ Invalid & Edge Cases Handled
<img width="1440" height="854" alt="Image" src="https://github.com/user-attachments/assets/9e72be53-8e87-4536-8bf6-175295ccec74" />
<img width="1303" height="954" alt="Image" src="https://github.com/user-attachments/assets/02c92bb9-3af4-41ad-b1f4-f7e830fd117e" />
I intentionally tested and documented invalid scenarios:

Joining after game has already started

Guess attempt by a non-turn player

Guessing an already revealed player

Invalid gameId

Refreshing browser during game

Direct API misuse

Screenshots of these cases are included for clarity.

🛠️ Tech Stack
Frontend

React (Vite)

React Router (SPA routing)

Custom CSS animations (paper chits, lobby, transitions)

Auto-refresh polling for game state

Deployed on Netlify

Backend

Spring Boot

RESTful APIs

In-memory game state management

Turn-based game logic

CORS configuration for frontend access

Deployed on Railway
