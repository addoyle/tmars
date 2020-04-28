export const normalize = card =>
  isNaN(card) ? card : card.toString().padStart(3, '0');
