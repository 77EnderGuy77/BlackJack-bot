# Blackjack Bot

A bot to play Blackjack on your Discord server.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Plans For Bot](#plans-for-bot)

## Features

- Customizable betting rules
- Play games in Threads or Game Chats
- Card display in Direct Messages or Game Chat for a more personalized experience

## Technologies Used

- **Languages:** JavaScript, TypeScript
- **Frameworks:** Discord.js
- **Other Technologies:** dotenv for environment variable management

## Installation

To get a local copy up and running, follow these steps.

1. Clone the repository:

   ```bash
   git clone https://github.com/77EnderGuy77/BlackJack-bot.git
   ```

2. Navigate to the project directory:

   ```bash
   cd blackjack
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up your environment variables (if necessary):

   ```bash
   cp .env.example .env
   ```

   Fill in the required fields in the `.env` file, such as your Discord bot token.

## Usage

To get Guild ID and Client ID you must turn on developer mode in setings,
Enable Discord Developer Mode (Desktop, Web)

   1. Open the Discord app and click on the Settings gear icon at the bottom-left corner of the screen.

   2. Next, click on “Advanced” in the left sidebar on Discord’s settings page.

   3. Now, turn on the “Developer Mode” toggle to enable developer mode to Copy ID on Discord. You now have access to all developer-centric features that the popular chat app has to offer.

      1. Guild ID referce to Server ID that bot in or will be

      2. Client ID referce to Bots ID that you created

To build bot, run:

```bash
npm run build
```

To add commands to use for bot, run:

```bash
npm run coms
```

To start the bot, run:

```bash
npm run start
```

Once the bot is running, you can add it to your server and start playing Blackjack in designated channels! The bot supports starting games in threads or specified game chat channels, and players can choose to receive their cards in a direct message or in the game chat.

## Plans for bot

The future plan for this "bot" can be read [here](PLAN.md)

## Contributing

Contributions are welcome and appreciated! To contribute:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

## License

Distributed under the MIT License. See `LICENSE` for more information.
