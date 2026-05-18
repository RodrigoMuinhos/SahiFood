"use client";

interface VirtualKeyboardProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  compact?: boolean;
}

const KEY_ROWS = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

export default function VirtualKeyboard({
  value,
  onChange,
  maxLength = 40,
  compact = false,
}: VirtualKeyboardProps) {
  const appendKey = (key: string) => {
    if (value.length >= maxLength) return;
    onChange(`${value}${key}`);
  };

  const removeLast = () => {
    onChange(value.slice(0, -1));
  };

  const addSpace = () => {
    if (!value || value.endsWith(" ") || value.length >= maxLength) return;
    onChange(`${value} `);
  };

  const clearAll = () => {
    onChange("");
  };

  const keyClass = compact
    ? "min-h-[48px] rounded-xl px-3 text-sm"
    : "min-h-[72px] rounded-2xl px-5 text-lg";

  return (
    <div className="space-y-3">
      {KEY_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-wrap justify-center gap-3">
          {row.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => appendKey(key)}
              className={`min-w-[50px] border-2 border-[#4a3b1f] bg-[#1a140f] font-black uppercase text-[#f8edd8] transition hover:bg-[#241a12] hover:border-[#d29a35] active:scale-95 ${keyClass}`}
            >
              {key}
            </button>
          ))}
        </div>
      ))}

      <div className="flex flex-wrap justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={clearAll}
          className={`border-2 border-[#4a3b1f] bg-[#1a140f] font-black uppercase text-[#d29a35] transition hover:bg-[#241a12] hover:border-[#d29a35] active:scale-95 ${keyClass}`}
        >
          Limpar
        </button>
        <button
          type="button"
          onClick={addSpace}
          className={`min-w-[200px] border-2 border-[#4a3b1f] bg-[#1a140f] font-black uppercase text-[#f8edd8] transition hover:bg-[#241a12] hover:border-[#d29a35] active:scale-95 ${keyClass}`}
        >
          Espaço
        </button>
        <button
          type="button"
          onClick={removeLast}
          className={`border-2 border-[#4a3b1f] bg-[#1a140f] font-black uppercase text-[#d29a35] transition hover:bg-[#241a12] hover:border-[#d29a35] active:scale-95 ${keyClass}`}
        >
          Apagar
        </button>
      </div>
    </div>
  );
}
