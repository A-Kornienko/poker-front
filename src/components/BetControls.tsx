import React, { memo } from "react";
import { TableData } from "../types/poker";

interface BetNavigationItem {
  label: string;
  action: string;
  classes: string;
}

interface BetControlsProps {
  data: TableData;
  betAmount: number;
  minBet: number;
  maxBet: number;
  onAction: (action: string) => void;
  onChangeBet: (value: number | string) => void;
  onPercentBet: (percent: number) => void;
}

/**
 * BetControls displays betting controls for the current player
 * @returns {JSX.Element} Betting controls
 */
const BetControls = memo(
  ({
    data,
    betAmount,
    minBet,
    maxBet,
    onAction,
    onChangeBet,
    onPercentBet,
  }: BetControlsProps) => {
    // Configuration of betting navigation buttons
    const betNavigation: BetNavigationItem[] = [
      {
        label: "FOLD",
        action: "fold",
        classes: "bg-gray-500 text-white hover:bg-gray-400 focus:ring-gray-500",
      },
      {
        label: "CHECK",
        action: "check",
        classes:
          "bg-green-500 text-white hover:bg-gray-500 focus:ring-gray-600",
      },
      {
        label: "CALL",
        action: "call",
        classes:
          "bg-green-500 text-white hover:bg-gray-500 focus:ring-gray-600",
      },
      {
        label: "BET / RAISE",
        action: "raise",
        classes:
          "bg-yellow-500 text-white hover:bg-gray-500 focus:ring-gray-700",
      },
    ];

    // Filter navigation buttons based on available actions
    const betNavigationFiltered = betNavigation.filter((btn) =>
      data.betNavigation.includes(btn.action)
    );

    return (
      <div className="fixed bottom-4 right-4 w-full max-w-xs p-4 bg-zinc-700 rounded-lg shadow-lg space-y-3 md:max-w-sm">
        {/* Controls for entering the bet amount */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={betAmount}
            min={minBet}
            max={maxBet}
            onChange={(e) => onChangeBet(e.target.value)}
            className="w-16 rounded-lg border-gray-300 text-center text-black"
            aria-label="Bet amount"
          />
          <button
            onClick={() => onChangeBet(betAmount - 1)}
            className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400"
            aria-label="Decrease bet"
          >
            –
          </button>
          <input
            type="range"
            min={minBet}
            max={maxBet}
            value={betAmount}
            onChange={(e) => onChangeBet(e.target.value)}
            className="flex-1 accent-blue-500"
            aria-label="Bet range slider"
          />
          <button
            onClick={() => onChangeBet(betAmount + 1)}
            className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400"
            aria-label="Increase bet"
          >
            +
          </button>
        </div>

        {/* Buttons for selecting the percentage rate and All-in */}
        <div className="flex gap-2">
          {[20, 40, 60].map((percent) => (
            <button
              key={percent}
              onClick={() => onPercentBet(percent)}
              className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
              aria-label={`Set bet to ${percent}% of max`}
            >
              {percent}%
            </button>
          ))}
          <button
            onClick={() => onChangeBet(maxBet)}
            className="flex-1 px-4 py-2 rounded-lg bg-red-500 text-white font-bold hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
            aria-label="Go all-in"
          >
            All-in
          </button>
        </div>

        {/* Action buttons (Fold, Check/Call, Raise) */}
        <div className="flex gap-2">
          {betNavigationFiltered.map((btn) => (
            <button
              key={btn.action}
              onClick={() => onAction(btn.action)}
              className={`flex-1 py-3 rounded-lg font-semibold active:translate-y-0.5 transition transform focus:outline-none focus:ring-2 focus:ring-offset-2 ${btn.classes}`}
              aria-label={btn.label}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    );
  }
);

export default BetControls;
