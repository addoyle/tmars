export default Object.freeze({
  resources: {
    // Standard resources
    MEGACREDIT: 'megacredit',
    STEEL: 'steel',
    TITANIUM: 'titanium',
    PLANT: 'plant',
    POWER: 'power',
    HEAT: 'heat',

    // Other resources
    SCIENCE: 'science',
    MICROBE: 'microbe',
    ANIMAL: 'animal',
    FIGHTER: 'fighter',
    ASTEROID: 'asteroid',
    FLOATER: 'floater',
    DISEASE: 'disease',

    ALL: 'all'
  },

  tags: {
    BUILDING: 'building',
    SPACE: 'space',
    POWER: 'power',
    SCIENCE: 'science',
    JOVIAN: 'jovian',
    EARTH: 'earth',
    PLANT: 'plant',
    MICROBE: 'microbe',
    ANIMAL: 'animal',
    CITY: 'city',
    EVENT: 'event',
    VENUS: 'venus',
    ALL: 'all',
    ANY: 'any'
  },

  tiles: {
    OCEAN: 'ocean',
    CITY: 'city',
    GREENERY: 'greenery',

    // Special tiles
    CAPITAL: 'capital city',
    NATURAL_PRESERVE: 'mars',
    MINING_AREA: 'mine',
    MINING_RIGHTS: 'mine',
    COMMERCIAL_DISTRICT: 'euro',
    NUCLEAR_ZONE: 'nuclear',
    INDUSTRIAL_CENTER: 'factory',
    ECOLOGICAL_ZONE: 'animal',
    LAVA_FLOWS: 'volcano',
    MOHOLE_AREA: 'mohole',
    RESTRICTED_AREA: 'restricted',
    DEIMOS_DOWN: 'deimos',
    GREAT_DAM: 'dam',
    MAGNETIC_FIELD_GENERATORS: 'magnet'
  },

  params: {
    // Global parameters
    TEMPERATURE: 'temperature',
    OXYGEN: 'oxygen',
    // Omitting Ocean as it is typically referred to by the tile
    VENUS: 'venus',

    // Other ones
    TERRAFORM_RATING: 'tr',
    CARD_BACK: 'card back'
  }
});
