return (
    prices.normal?.market ||
    prices.holofoil?.market ||
    prices.reverseHolofoil?.market ||
    prices['1stEditionHolofoil']?.market ||
    null
  );
};

export const getMarketPrice = (card) => {
  const prices = card.tcgplayer?.prices || {};
  return (
    prices.normal?.market ??
    prices.holofoil?.market ??
    prices.reverseHolofoil?.market ??
    prices['1stEditionHolofoil']?.market ??
    0
  );
};