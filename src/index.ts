import { emitKeypressEvents, Interface } from "readline";
const readline = require("node:readline");

const suits = ["♥", "♦", "♠", "♣"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let deck: string[] = [];

function createDeck(): string[] {
  let newDeck: string[] = [];
  suits.forEach((suit) => {
    ranks.forEach((rank) => {
      newDeck.push(`${rank} - ${suit}`);
    });
  });
  return newDeck;
}

function shuffleCards(deck: string[]): string[] {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [deck[j], deck[i]] = [deck[i], deck[j]];
  }
  return deck;
}

function cardValue(card: string): number {
  let rank: string = card.split("-")[0].trim();

  if (rank == "J" || rank == "Q" || rank == "K") {
    return 10;
  } else if (rank == "A") {
    return 11;
  }
  return parseInt(rank);
}

function calcHandValue(hand: string[]): number {
  let value = 0;
  let aces = 0;

  for (let card of hand) {
    value += cardValue(card);
    if (card.split("-")[0].trim() === "A") {
      aces++;
    }
  }

  while (value > 21 && aces > 0) {
    value -= 10;
    aces -= 1;
  }
  return value;
}

async function playerTurn(
  playerHand: string[],
  playerValue: number,
  dealerHand: string[],
  dealerValue: number,
  playerNum: number
): Promise<number> {
  console.log(`Player ${playerNum} turn:`);

  if (playerValue === 21) {
    console.log(`Blackjack! Player ${playerNum} wins!`);
    return playerValue;
  }

  const _choice = (await prompt(`Player ${playerNum}: Hit or Stand?`)).toLowerCase();

  if (_choice === "hit") {
    const newCard = deck.pop();
    if (newCard) {
      playerHand.push(newCard);
      playerValue = calcHandValue(playerHand);

      console.log(`Player ${playerNum} Hand: ${playerHand.join(", ")} (Value: ${playerValue})`);
      console.log(`Dealer Hand: ${dealerHand[0]}, Unknown`);

      if (playerValue > 21) {
        console.log(`Player ${playerNum} busted!`);
        return playerValue;
      } else {
        return await playerTurn(playerHand, playerValue, dealerHand, dealerValue, playerNum);
      }
    } else {
      console.log("No more cards in the deck");
      endGame();
      return playerValue;
    }
  } else if (_choice === "stand") {
    return playerValue;
  } else {
    console.log("Invalid action. Please choose Hit or Stand.");
    return await playerTurn(playerHand, playerValue, dealerHand, dealerValue, playerNum);
  }
}

async function dealerTurn(
  players: { hand: string[]; value: number; busted: boolean }[],
  dealerHand: string[],
  dealerValue: number
) {
  console.log(`Dealer reveals: ${dealerHand.join(", ")}`);

  while (dealerValue < 17) {
    const newCard = deck.pop();
    if (newCard) {
      dealerHand.push(newCard);
      dealerValue = calcHandValue(dealerHand);
      console.log(`Dealer draws ${newCard}. Dealer's hand: ${dealerHand.join(", ")} (Value: ${dealerValue})`);
    } else {
      console.log("No more cards in deck. Restart the game");
      endGame();
    }
  }

  console.log(`Final Dealer Hand: ${dealerHand.join(", ")} (Value: ${dealerValue})`);

  if (dealerValue > 21) {
    console.log("Dealer busts! All remaining players win!");
  } else {
    players.forEach((player, index) => {
      if (!player.busted) {
        if (player.value > dealerValue) {
          console.log(`Player ${index + 1} wins!`);
        } else if (dealerValue > player.value) {
          console.log(`Dealer beats Player ${index + 1}.`);
        } else {
          console.log(`Player ${index + 1} ties with Dealer.`);
        }
      }
    });
  }

  endGame();
}

async function endGame() {
  const endGameChoice = (await prompt("Do you want to play another game? (yes or no)")).toLowerCase();

  if (endGameChoice === "yes") {
    const deckChoice = (await prompt("Do you want to reuse the remaining deck or reshuffle? (reuse/reshuffle)")).toLowerCase();
    if (deckChoice === "reshuffle") {
      deck = shuffleCards(createDeck());
    }
    start();
  } else {
    console.log("Thanks for playing!");
    rl.close();
  }
}

const rl: Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt(text: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(`${text} > `, (input: string) => {
      resolve(input);
    });
  });
}

async function start() {
  if (deck.length < 10) {
    deck = shuffleCards(createDeck());
  }

  const playerCount = parseInt(await prompt("How many players?"));

  let players: { hand: string[]; value: number; busted: boolean }[] = [];
  for (let i = 0; i < playerCount; i++) {
    let playerHand: string[] = [];
    for (let j = 0; j < 2; j++) {
      const card = deck.pop();
      if (card !== undefined) {
        playerHand.push(card);
      }
    }
    const playerValue = calcHandValue(playerHand);
    players.push({ hand: playerHand, value: playerValue, busted: false });
    console.log(`Player ${i + 1} Hand: ${playerHand.join(", ")} (Value: ${playerValue})`);
  }

  let dealerHand: string[] = [];
  for (let j = 0; j < 2; j++) {
    const card = deck.pop();
    if (card !== undefined) {
      dealerHand.push(card);
    }
  }
  let dealerValue = calcHandValue(dealerHand);
  console.log(`Dealer Hand: ${dealerHand[0]}, Unknown`);

  for (let i = 0; i < players.length; i++) {
    players[i].value = await playerTurn(players[i].hand, players[i].value, dealerHand, dealerValue, i + 1);
    players[i].busted = players[i].value > 21;
  }

  dealerTurn(players, dealerHand, dealerValue);
}

start();
