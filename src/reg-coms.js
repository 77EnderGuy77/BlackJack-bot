require("dotenv").config();
const { ApplicationCommandOptionType, REST, Routes } = require("discord.js");

const commands = [
  {
    name: "start21",
    description: "Starts a game of Blackjack",
    options: [
      {
        name: "min_bet",
        description: "A minimal bet that can be placed",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
      {
        name: "max_bet",
        description: "A maximal bet that can be placed",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
      {
        name: "total_chips",
        description: "How many chips each player must put to enter",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Fetching current commands...");

    // Fetch existing commands
    const currentCommands = await rest.get(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID)
    );

    // Map existing commands by name for easy lookup
    const currentCommandMap = new Map(currentCommands.map(cmd => [cmd.name, cmd.id]));

    for (const command of commands) {
      if (currentCommandMap.has(command.name)) {
        // If the command exists, update it
        const commandId = currentCommandMap.get(command.name);
        await rest.patch(
          Routes.applicationGuildCommand(process.env.CLIENT_ID, process.env.GUILD_ID, commandId),
          { body: command }
        );
        console.log(`Updated command: ${command.name}`);
      } else {
        // If the command does not exist, create it
        await rest.put(
          Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
          { body: command }
        );
        console.log(`Created command: ${command.name}`);
      }
    }

    console.log("Slash commands were registered/updated successfully!");
  } catch (error) {
    console.error(`There was an error: ${error}`);
  }
})();
