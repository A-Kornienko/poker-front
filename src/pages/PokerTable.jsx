import React, { useEffect, useState } from "react";

// Demo card back image, replace with your assets
const CARD_BACK = "/public/images/card-back.png"; // Ensure this path is correct

// Dealer chip
const DealerChip = () => (
  <span className="bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold shadow">
    D
  </span>
);

const SmallBlindChip = () => (
  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold shadow">
    SB
  </span>
);

const BigBlindChip = () => (
  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold shadow">
    BB
  </span>
);

const ChipsBlock = () => (
  <span role="img" aria-label="chips" className="relative cursor-pointer">
    <div className="absolute h-6 w-6" style={{ top: "-18px", right: "-4px" }}>
      <img src={"/public/images/icons/bet_black_100.svg"} className="w-full" />
    </div>
    <div className="absolute -top-1 h-6 w-6" style={{ left: "-12px" }}>
      <img src={"/public/images/icons/bet_red_5.svg"} className="w-full" />
    </div>
    <div className="absolute -top-1 h-6 w-6" style={{ right: "4px" }}>
      <img src={"/public/images/icons/bet_yellow_50.svg"} className="w-full" />
    </div>
  </span>
);

const data = {
  id: 6,
  name: "1Cash1 Games Texas",
  type: "cash",
  rule: "Texas Holdem",
  style: "action-blue",
  turnPlace: 1,
  lastWordPlace: 0,
  dealerPlace: 1,
  smallBlindPlace: 10,
  bigBlindPlace: 2,
  round: "preFlop",
  smallBlind: 1,
  bigBlind: 2,
  currency: "USD",
  limitPlayers: 10,
  countPlayers: 1,
  image: "",
  roundExpirationTime: 0,
  buyIn: 0,
  players: {
    4: {
      profile: {
        name: "Test_12345",
        avatar: "",
      },
      tableId: 6,
      stack: 0,
      place: 4,
      betType: null,
      betExpTime: 0,
      timeBank: [],
      bet: 0,
      status: "pending",
      cards: [],
      afk: false,
    },
  },
  banks: {
    rake: 0,
    items: [],
  },
  cards: {
    table: [],
    player: [],
  },
  countCards: 2,
  betNavigation: [],
  betRange: { min: 0, max: 0 },
  myPlace: 4,
  myPrize: { rank: 0, sum: 0 },
  spectators: 0,
  maxBet: 2,
  session: null,
  tournament: [],
  playerSetting: [],
  state: "prepare",
  suggestCombination: "",
  isAuthorized: true,
};

const players = [
  {
    id: "1",
    name: "Test_12345",
    balance: 20,
    cards: [CARD_BACK, CARD_BACK],
    isSelf: true,
    timeLeft: 15,
    maxTime: 15,
    place: 1,
  },
  {
    id: "2",
    name: "Test_222",
    balance: 20,
    cards: [CARD_BACK, CARD_BACK],
    timeLeft: 10,
    maxTime: 15,
    place: 2,
  },
  {
    id: "3",
    name: "Test_222",
    balance: 20,
    cards: [CARD_BACK, CARD_BACK],
    timeLeft: 10,
    maxTime: 15,
    place: 3,
  },
  {
    id: "4",
    name: "Test_222",
    balance: 20,
    cards: [CARD_BACK, CARD_BACK],
    timeLeft: 10,
    maxTime: 15,
    place: 4,
  },
  {
    id: "5",
    name: "Test_222",
    balance: 20,
    cards: [CARD_BACK, CARD_BACK],
    timeLeft: 10,
    maxTime: 15,
    place: 5,
  },
  {
    id: "6",
    name: "Test_222",
    balance: 20,
    cards: [CARD_BACK, CARD_BACK],
    timeLeft: 10,
    maxTime: 15,
    place: 6,
  },
  {
    id: "7",
    name: "Test_222",
    balance: 20,
    cards: [CARD_BACK, CARD_BACK],
    timeLeft: 10,
    maxTime: 15,
    place: 7,
  },
  {
    id: "8",
    name: "Test_222",
    balance: 20,
    cards: [CARD_BACK, CARD_BACK],
    timeLeft: 10,
    maxTime: 15,
    place: 8,
  },
  {
    id: "9",
    name: "Test_222",
    balance: 20,
    cards: [CARD_BACK, CARD_BACK],
    timeLeft: 10,
    maxTime: 15,
    place: 9,
  },
  {
    id: "10",
    name: "Test_222",
    balance: 20,
    cards: [CARD_BACK, CARD_BACK],
    timeLeft: 10,
    maxTime: 15,
    place: 10,
  },
];

const playerPosition = {
  1: { bottom: "0%", left: "50%" },
  2: { bottom: "0%", left: "80%" },
  3: { bottom: "30%", right: "-20%" },
  4: { bottom: "60%", right: "-20%" },
  5: { bottom: "85%", left: "80%" },
  6: { bottom: "85%", left: "50%" },
  7: { bottom: "85%", left: "20%" },
  8: { bottom: "60%", left: "0%" },
  9: { bottom: "30%", left: "0%" },
  10: { bottom: "0%", left: "20%" },
};

const blindsPosition = {
  1: { bottom: "25%", left: "50%" },
  2: { bottom: "26%", right: "18%" },
  3: { bottom: "35%", right: "12%" },
  4: { bottom: "56%", right: "9%" },
  5: { top: "21%", right: "20%" },
  6: { top: "21%", right: "52%" },
  7: { top: "22%", left: "20%" },
  8: { bottom: "62%", left: "14%" },
  9: { bottom: "44%", left: "13%" },
  10: { bottom: "26%", left: "22%" },
};

const playerChipsPosition = {
  1: { top: "-25%", left: "90%" },
  2: { top: "-25%", left: "18%" },
  3: { top: "36%", left: "-40%" },
  4: { top: "70%", left: "-40%" },
  5: { bottom: "-32%", left: "6%" },
  6: { bottom: "-38%", left: "56%" },
  7: { bottom: "-40%", right: "10%" },
  8: { bottom: "-5%", right: "-30%" },
  9: { bottom: "40%", right: "-45%" },
  10: { top: "-25%", left: "100%" },
};

// Demo table cards
const tableCards = [CARD_BACK, CARD_BACK, CARD_BACK, CARD_BACK, CARD_BACK];

export default function PokerTable() {
  const [betAmount, setBetAmount] = useState(10);
  const minBet = 0;
  const maxBet = 200;

  const handleChange = (value) => {
    let val = Number(value);
    if (val < minBet) val = minBet;
    if (val > maxBet) val = maxBet;
    setBetAmount(val);
  };

  const handlePercent = (percent) => {
    const val = Math.floor((maxBet * percent) / 100);
    setBetAmount(val);
  };

  const totalTime = 15; // total time for the timer
  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const percent = (timeLeft / totalTime) * 100;

  // Вибір кольору залежно від залишку часу
  let barColor = "bg-green-500";
  if (percent <= 60 && percent > 30) {
    barColor = "bg-yellow-500";
  } else if (percent <= 30) {
    barColor = "bg-red-500";
  }

  return (
    <div className="relative h-screen bg-zinc-900">
      {/* Header */}
      <div className="flex justify-between items-center px-8 py-4">
        <div className="bg-[#1a2539]/80 rounded-md px-6 py-2 text-lg text-gray-200 font-semibold">
          TeXaS GaMe
        </div>
        <div className="flex gap-6 items-center">
          <span role="img" aria-label="chips" className="cursor-pointer">
            <img
              src={"/public/images/icons/rebuy-chip.png"}
              className="h-10 w-10"
            />
          </span>
          <span role="img" aria-label="cards" className="cursor-pointer">
            <svg
              viewBox="0 0 24 24"
              role="presentation"
              style={{ width: "2.5rem", height: "2.5rem" }}
            >
              <path
                d="M14.7 2.2H16.2C17.3 2.2 18.2 3.1 18.2 4.2V10.6L14.7 2.2M20.1 3.8L21.4 4.4C22.4 4.8 22.9 6 22.5 7L20.1 12.9V3.8M18 15.5L13 3.5C12.7 2.7 12 2.3 11.2 2.3C10.9 2.3 10.7 2.4 10.4 2.5L3 5.5C2 5.9 1.5 7 2 8L7 20C7.3 20.8 8 21.2 8.8 21.2C9.1 21.2 9.3 21.2 9.6 21L17 18C17.8 17.7 18.2 17 18.2 16.2C18.1 16 18.1 15.7 18 15.5M11.4 15L8.2 12.6L8.6 8.6L11.8 11L11.4 15"
                style={{ fill: "#fff" }}
              ></path>
            </svg>
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="flex justify-center items-center mt-2">
        <div className="relative w-[900px] h-[550px]">
          {/* Background image: replace with your own! */}
          <img
            src="/public/images/poker-table.png"
            alt="Poker Table"
            className="absolute inset-0 w-full h-full object-contain z-0"
          />

          {/* Table cards */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[40%] flex gap-2 z-10">
            {tableCards.map((card, idx) => (
              <img
                key={idx}
                src={card}
                alt={`Card ${idx + 1}`}
                className="w-16 h-24 rounded shadow-md"
              />
            ))}
          </div>
          {/* Round name */}
          {/* <div className="absolute left-1/2 -translate-x-1/2 top-[32%] z-10">
            <div className="text-white text-2xl font-semibold drop-shadow">
              Round: flop
            </div>
          </div> */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[32%] z-10">
            <div className="text-white text-2xl font-semibold drop-shadow">
              Pot: $6.00
            </div>
          </div>
          {/* Dealer chip */}
          <div
            className="absolute -translate-x-1/2 z-10"
            style={blindsPosition[data.dealerPlace]}
          >
            <DealerChip />
          </div>

          {/* SmallBLind */}
          <div
            className="absolute -translate-x-1/2 z-10"
            style={blindsPosition[data.smallBlindPlace]}
          >
            <SmallBlindChip />
          </div>

          {/* BigBlind */}
          <div
            className="absolute -translate-x-1/2 z-10"
            style={blindsPosition[data.bigBlindPlace]}
          >
            <BigBlindChip />
          </div>

          {/* Players */}
          {players.map((player, idx) => (
            <div
              key={player.id}
              className={
                "player-" +
                player.place +
                " -translate-x-1/2 absolute flex gap-24 z-10"
              }
              style={playerPosition[player.place]}
            >
              <div className="flex flex-col items-center">
                {/* Cards */}
                <div className="flex mb-1">
                  {player.cards.map((card, i) => (
                    <img
                      key={i}
                      src={card}
                      alt="Player Card"
                      className={"w-20 h-32 rounded shadow"}
                    />
                  ))}
                </div>
                {/* Avatar + timer */}
                <div
                  aria-label="player-avatar"
                  className="absolute w-36 transform text-center transition-all duration-300 left-1/2 -translate-x-1/2 translate-y-1/3"
                >
                  <div className="relative">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-300 ring-2 ring-gray-200">
                      <svg
                        viewBox="0 0 24 24"
                        role="presentation"
                        className="text-gray-400"
                        style={{ width: "3rem", height: "3rem" }}
                      >
                        <path
                          d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"
                          style={{ fill: "#fff" }}
                        ></path>
                      </svg>
                    </div>
                  </div>

                  <div className="relative z-[2] mt-2 -translate-y-8 rounded-b-2xl rounded-t-md border border-white/10 font-bold">
                    <div className="truncate rounded-t-[inherit] border-b border-white/10 bg-[#161616] px-1 text-white/60">
                      Test_12345
                    </div>

                    {data.turnPlace === player.place && (
                      // {/* Timer bar */}
                      <div className="w-full max-w-md mx-auto z-40">
                        <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${barColor} transition-all duration-1000 ease-linear`}
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="rounded-b-2xl bg-[#1F2121] px-3 py-1">
                      <div className="text-blue-300">$20</div>
                    </div>
                  </div>
                </div>
                {/* playerChips */}
                <div
                  className={`absolute -translate-x-1/2 z-10` + `${data.turnPlace === player.place ? " my-animate-pulse" : ""}`}
                  style={playerChipsPosition[player.place]}
                >
                  <ChipsBlock />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white text-sm font-bold">
                    $1000
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute w-1/4 p-2 bottom-2 right-0 space-y-2 bg-zinc-700 rounded-lg">
        {/* Bet controls */}
        <div className="flex gap-2">
          <input
            type="number"
            value={betAmount}
            min={minBet}
            max={maxBet}
            onChange={(e) => handleChange(e.target.value)}
            className="w-20 rounded-lg border-gray-300 text-center text-black"
          />
          <button
            onClick={() => handleChange(betAmount - 1)}
            className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400"
          >
            –
          </button>
          <input
            type="range"
            min={minBet}
            max={maxBet}
            value={betAmount}
            onChange={(e) => handleChange(e.target.value)}
            className="flex-1 accent-blue-500"
          />
          <button
            onClick={() => handleChange(betAmount + 1)}
            className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400"
          >
            +
          </button>
        </div>

        {/* Buttons for 20%, 40%, 60%, All-in */}
        <div className="flex gap-2">
          {[20, 40, 60].map((percent) => (
            <button
              key={percent}
              onClick={() => handlePercent(percent)}
              className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
            >
              {percent}%
            </button>
          ))}
          <button
            onClick={() => handleChange(maxBet)}
            className="w-full px-4 py-2 rounded-lg bg-red-500 text-white font-bold hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
          >
            All-in
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          {[
            {
              label: "FOLD",
              action: "fold",
              classes:
                "bg-gray-500 text-white hover:bg-gray-400 focus:ring-gray-500",
            },
            {
              label: "CHECK / CALL",
              action: "check",
              classes:
                "bg-green-500 text-white hover:bg-gray-500 focus:ring-gray-600",
            },
            {
              label: "BET / RAISE",
              action: "bet",
              classes:
                "bg-yellow-500 text-white hover:bg-gray-500 focus:ring-gray-700",
            },
          ].map((btn) => (
            <button
              key={btn.action}
              onClick={() => onAction && onAction(btn.action)}
              className={`w-full py-3 rounded-lg font-semibold active:translate-y-0.5 transition transform focus:outline-none focus:ring-2 focus:ring-offset-2 ${btn.classes}`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat & icons (bottom left) */}
      <div className="absolute bottom-6 left-6 flex gap-4 z-30">
        <button className="rounded-full p-2">
          <svg
            viewBox="0 0 24 24"
            role="presentation"
            style={{ width: "2.5rem", height: "2.5rem" }}
          >
            <path
              d="M8,3C6.89,3 6,3.89 6,5V21H18V5C18,3.89 17.11,3 16,3H8M8,5H16V19H8V5M13,11V13H15V11H13Z"
              style={{ fill: "#fff" }}
            ></path>
          </svg>
        </button>
        <button className="rounded-full p-2">
          <svg
            viewBox="0 0 24 24"
            role="presentation"
            className="cursor-pointer"
            style={{ width: "2.5rem", height: "2.5rem" }}
          >
            <path
              d="M12,3C17.5,3 22,6.58 22,11C22,15.42 17.5,19 12,19C10.76,19 9.57,18.82 8.47,18.5C5.55,21 2,21 2,21C4.33,18.67 4.7,17.1 4.75,16.5C3.05,15.07 2,13.13 2,11C2,6.58 6.5,3 12,3M17,12V10H15V12H17M13,12V10H11V12H13M9,12V10H7V12H9Z"
              style={{ fill: "#fff" }}
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
