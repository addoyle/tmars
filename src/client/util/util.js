import { cloneDeep } from 'lodash';

export function displayRequirement(requirement) {
  // For safety, make a deep copy
  const raw = cloneDeep(requirement);
  const req = [];

  // Any optional text
  if (raw.text) {
    req.push({ text: raw.text });
  }

  // Maximum restriction, append the word 'max'
  if (raw.max) {
    req.push({ text: 'max' });
  }

  // Restriction is a parameter, i.e. oxygen or temperature. Note: oceans are not included here, even though
  // they're considered parameters. They're handled by the Tiles section
  if (raw.param) {
    // Oxygen, shown as N%
    if (raw.param === 'oxygen' || raw.param === 'venus') {
      req.push({ text: raw.value + '%' }, { param: raw.param });
    }

    // Temperature, shown as ±N°C
    else if (raw.param === 'temperature') {
      req.push(
        { text: (raw.value > 0 ? '+' : null) + raw.value + '°C' },
        { param: 'temperature' }
      );
    }
  }

  // Anything else: tile, tag, production, etc.
  else {
    /**
     * Render a restriction
     *
     * @param key Restriction type (tag, resource, tile, production)
     */
    const prepareItem = key => {
      let val = raw.value;

      // More than 3, or max and more than 2, show with a number denoting the amount
      if (val > 3 || (raw.max && val > 2)) {
        req.push({ text: val });
        val = 1;
      }

      // No value specified, assumed to be 1
      val = val ?? 1;

      // Convert to array if not already
      const item = Array.isArray(raw[key]) ? raw[key] : [raw[key]];

      // Render the restrictions
      for (let i = 0; i < raw.value; i++) {
        item.forEach(item => req.push({ [key]: item, anyone: raw.anyone }));
      }
    };

    // Render the restrictions
    raw.tag && prepareItem('tag');
    raw.resource && prepareItem('resource');
    raw.tile && prepareItem('tile');
    raw.production && prepareItem('production');
  }

  return req;
}
