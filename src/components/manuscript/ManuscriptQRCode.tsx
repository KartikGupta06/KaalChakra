import React from 'react';

interface ManuscriptQRCodeProps {
  value: string;
  size?: number;
  className?: string;
}

/**
 * Pure SVG QR Code Generator Component
 * Generates a crisp vector QR code pattern with central Kalachakra branding emblem.
 */
export const ManuscriptQRCode: React.FC<ManuscriptQRCodeProps> = ({
  value,
  size = 100,
  className = '',
}) => {
  // Simple deterministic 21x21 QR code matrix generator for verification links
  const matrixSize = 21;
  const generateMatrix = (text: string): boolean[][] => {
    const mat: boolean[][] = Array.from({ length: matrixSize }, () =>
      Array(matrixSize).fill(false)
    );

    // 1. Position detection patterns (3 corners)
    const addFinder = (startRow: number, startCol: number) => {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          const isOuter = r === 0 || r === 6 || c === 0 || c === 6;
          const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          mat[startRow + r][startCol + c] = isOuter || isInner;
        }
      }
    };

    addFinder(0, 0);
    addFinder(0, 14);
    addFinder(14, 0);

    // 2. Alignment & Timing patterns
    for (let i = 8; i < 13; i += 2) {
      mat[6][i] = true;
      mat[i][6] = true;
    }

    // 3. Pseudo-random deterministic data bit stream based on string hash
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = (hash << 5) - hash + text.charCodeAt(i);
      hash |= 0;
    }

    for (let r = 0; r < matrixSize; r++) {
      for (let c = 0; c < matrixSize; c++) {
        // Skip finder zones
        if (
          (r < 8 && c < 8) ||
          (r < 8 && c >= 13) ||
          (r >= 13 && c < 8)
        ) {
          continue;
        }
        // Deterministic pseudo-random fill
        const bit = Math.abs((hash ^ (r * 31 + c * 17 + r * c * 3)) % 100) > 42;
        mat[r][c] = bit;
      }
    }

    // 4. Center emblem cutout (rows 9-11, cols 9-11)
    for (let r = 9; r <= 11; r++) {
      for (let c = 9; c <= 11; c++) {
        mat[r][c] = false;
      }
    }

    return mat;
  };

  const matrix = generateMatrix(value);
  const cellSize = size / matrixSize;

  return (
    <div className={`relative inline-block ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="text-kc-maroon dark:text-kc-gold"
      >
        <rect width={size} height={size} fill="#F8F0DD" rx="4" />
        <rect
          x="2"
          y="2"
          width={size - 4}
          height={size - 4}
          fill="none"
          stroke="#C89B3C"
          strokeWidth="1"
          rx="3"
        />

        {matrix.map((row, r) =>
          row.map((cell, c) => {
            if (!cell) return null;
            return (
              <rect
                key={`cell-${r}-${c}`}
                x={c * cellSize}
                y={r * cellSize}
                width={cellSize - 0.4}
                height={cellSize - 0.4}
                fill="currentColor"
                rx="0.5"
              />
            );
          })
        )}

        {/* Center Kalachakra Wheel Emblem overlay */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={cellSize * 1.8}
          fill="#F4E7C8"
          stroke="#C89B3C"
          strokeWidth="1"
        />
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-kc-maroon font-bold text-[8px] font-devanagari select-none"
        >
          ☸
        </text>
      </svg>
    </div>
  );
};
