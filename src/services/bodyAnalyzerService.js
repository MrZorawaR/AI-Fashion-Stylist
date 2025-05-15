// Body shape analysis service
// This service analyzes body measurements to determine body shape

// Body shape types
const BODY_SHAPES = {
  HOURGLASS: {
    type: 'Hourglass',
    description: 'Your shoulders and hips are similar in width with a defined waistline.',
    features: [
      'Balanced proportions',
      'Defined waistline',
      'Curved hip line',
      'Similar shoulder and hip width'
    ]
  },
  RECTANGLE: {
    type: 'Rectangle',
    description: 'Your shoulders, waist, and hips are similar in width with minimal waist definition.',
    features: [
      'Straight up and down figure',
      'Athletic build',
      'Minimal waist definition',
      'Similar measurements throughout torso'
    ]
  },
  TRIANGLE: {
    type: 'Triangle (Pear)',
    description: 'Your hips are wider than your shoulders with a defined waist.',
    features: [
      'Narrower shoulders',
      'Defined waistline',
      'Fuller hips and thighs',
      'Gradual slope from waist to hips'
    ]
  },
  INVERTED_TRIANGLE: {
    type: 'Inverted Triangle',
    description: 'Your shoulders are wider than your hips with an athletic upper body.',
    features: [
      'Broader shoulders or bustline',
      'Narrower hips',
      'Athletic upper body',
      'Straight hip line'
    ]
  },
  APPLE: {
    type: 'Apple',
    description: 'Your midsection is fuller with slimmer legs and similar shoulder/hip width.',
    features: [
      'Fuller midsection',
      'Similar shoulder and hip width',
      'Less defined waistline',
      'Often slimmer legs'
    ]
  }
};

/**
 * Analyzes body measurements to determine body shape
 * @param {Object} measurements - Body measurements from pose detection
 * @returns {Object} - Body shape type and characteristics
 */
export function analyzeBodyShape(measurements) {
  // Extract ratios from measurements
  const { shoulderToHipRatio, waistToHipRatio, shoulderToWaistRatio } = measurements;
  
  // Determine body shape based on ratios
  // These are simplified thresholds and would need to be refined with more data
  
  // Hourglass: shoulders and hips similar, defined waist
  if (
    shoulderToHipRatio >= 0.9 && 
    shoulderToHipRatio <= 1.1 && 
    waistToHipRatio <= 0.8
  ) {
    return BODY_SHAPES.HOURGLASS;
  }
  
  // Rectangle: shoulders, waist, and hips similar
  if (
    shoulderToHipRatio >= 0.9 && 
    shoulderToHipRatio <= 1.1 && 
    waistToHipRatio >= 0.8
  ) {
    return BODY_SHAPES.RECTANGLE;
  }
  
  // Triangle (Pear): hips wider than shoulders
  if (shoulderToHipRatio < 0.9) {
    return BODY_SHAPES.TRIANGLE;
  }
  
  // Inverted Triangle: shoulders wider than hips
  if (
    shoulderToHipRatio > 1.1 && 
    shoulderToWaistRatio < 1.3
  ) {
    return BODY_SHAPES.INVERTED_TRIANGLE;
  }
  
  // Apple: fuller midsection
  if (
    shoulderToHipRatio >= 0.9 && 
    shoulderToHipRatio <= 1.1 && 
    waistToHipRatio >= 0.9
  ) {
    return BODY_SHAPES.APPLE;
  }
  
  // Default to Rectangle if no clear match
  return BODY_SHAPES.RECTANGLE;
}

/**
 * Gets styling tips based on body shape
 * @param {string} bodyShape - Body shape type
 * @returns {Array} - Array of styling tips
 */
export function getStylingTips(bodyShape) {
  const tips = {
    'Hourglass': [
      'Highlight your waist with belted styles',
      'Fitted clothes that follow your natural curves',
      'Wrap dresses and tops',
      'High-waisted bottoms'
    ],
    'Rectangle': [
      'Create curves with peplum tops and dresses',
      'Belted styles to define the waist',
      'Jackets that cinch at the waist',
      'Details at the bust or hips to create dimension'
    ],
    'Triangle (Pear)': [
      'Structured tops to balance proportions',
      'A-line skirts and dresses',
      'Dark colors on bottom, brighter colors on top',
      'Boot cut or wide-leg pants'
    ],
    'Inverted Triangle': [
      'V-necks and scoop necklines',
      'Full or A-line skirts',
      'Wide-leg pants',
      'Details on lower half to create balance'
    ],
    'Apple': [
      'Empire waistlines',
      'Styles that highlight your legs',
      'V-necks and vertical details',
      'Structured jackets that create shape'
    ]
  };
  
  return tips[bodyShape] || tips['Rectangle'];
}

export default {
  analyzeBodyShape,
  getStylingTips,
  BODY_SHAPES
};