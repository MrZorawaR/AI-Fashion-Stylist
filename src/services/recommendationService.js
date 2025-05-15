// Recommendation service
// In a real application, this would connect to Gemini API or another AI service
// For demo purposes, we're using static recommendations

/**
 * Mock API call to get recommendations based on body type
 * @param {Object} bodyType - The detected body type object
 * @returns {Promise} - Promise resolving to recommendations
 */
export async function getRecommendations(bodyType, gender) {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return mock recommendations based on body type
  return MOCK_RECOMMENDATIONS[bodyType.type] || MOCK_RECOMMENDATIONS.Rectangle;
}

// Mock recommendation data
const MOCK_RECOMMENDATIONS = {
  'Hourglass': {
    casual: [
      {
        id: 'h-casual-1',
        name: 'Wrap Dress',
        description: 'A flattering wrap dress that accentuates your waistline',
        price: 79.99,
        image: 'https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'This wrap dress highlights your defined waist and maintains balance between your shoulders and hips.',
        link: 'https://example.com/shop',
        tags: ['Wrap style', 'Waist defining', 'Versatile']
      },
      {
        id: 'h-casual-2',
        name: 'High-Waisted Jeans',
        description: 'Perfect fit jeans that showcase your natural curves',
        price: 69.99,
        image: 'https://images.pexels.com/photos/1485781/pexels-photo-1485781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'These high-waisted jeans emphasize your waist while accommodating your hip curve.',
        link: 'https://example.com/shop',
        tags: ['High-waisted', 'Stretchy', 'Curve-hugging']
      },
      {
        id: 'h-casual-3',
        name: 'Belted Cardigan',
        description: 'Comfortable yet stylish cardigan with a waist-defining belt',
        price: 59.99,
        image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'The belt on this cardigan highlights your smallest point while providing a relaxed fit elsewhere.',
        link: 'https://example.com/shop',
        tags: ['Belted', 'Cozy', 'Waist-defining']
      }
    ],
    formal: [
      {
        id: 'h-formal-1',
        name: 'Fit and Flare Dress',
        description: 'Elegant dress with a fitted bodice and flared skirt',
        price: 129.99,
        image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'The structured top highlights your defined waist while the flared skirt balances your proportions.',
        link: 'https://example.com/shop',
        tags: ['Fit and flare', 'Elegant', 'Event-ready']
      },
      {
        id: 'h-formal-2',
        name: 'Tailored Jumpsuit',
        description: 'Sophisticated jumpsuit with a defined waistline',
        price: 149.99,
        image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'This jumpsuit is tailored to highlight your waist while providing a sleek silhouette.',
        link: 'https://example.com/shop',
        tags: ['Tailored', 'Modern', 'Statement piece']
      },
      {
        id: 'h-formal-3',
        name: 'Belted Sheath Dress',
        description: 'Classic sheath dress with a thin belt',
        price: 119.99,
        image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'The streamlined silhouette accentuates your curves while the belt defines your natural waist.',
        link: 'https://example.com/shop',
        tags: ['Classic', 'Versatile', 'Waist-defining']
      }
    ],
    workwear: [
      {
        id: 'h-work-1',
        name: 'Pencil Skirt Suit',
        description: 'Professional suit with a fitted jacket and pencil skirt',
        price: 179.99,
        image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'This matching set defines your waist and follows your curves while maintaining professional appeal.',
        link: 'https://example.com/shop',
        tags: ['Professional', 'Tailored', 'Classic']
      },
      {
        id: 'h-work-2',
        name: 'Wrap Blouse',
        description: 'Elegant wrap blouse that pairs with any bottom',
        price: 59.99,
        image: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'This wrap-style blouse highlights your waist and creates a balanced silhouette for your proportions.',
        link: 'https://example.com/shop',
        tags: ['Versatile', 'Wrap style', 'Professional']
      },
      {
        id: 'h-work-3',
        name: 'Belted Dress',
        description: 'Professional dress with a flattering belt',
        price: 119.99,
        image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'The classic silhouette with a defined waist works perfectly for your proportional figure.',
        link: 'https://example.com/shop',
        tags: ['Office-ready', 'Flattering', 'Versatile']
      }
    ],
    accessories: [
      {
        id: 'h-acc-1',
        name: 'Statement Belt',
        description: 'Bold belt to accentuate your waistline',
        price: 39.99,
        image: 'https://images.pexels.com/photos/45924/pexels-photo-45924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'A statement belt is perfect for highlighting your defined waist with multiple outfits.',
        link: 'https://example.com/shop',
        tags: ['Statement piece', 'Versatile', 'Waist-enhancing']
      },
      {
        id: 'h-acc-2',
        name: 'Medium-Length Necklace',
        description: 'Elegant necklace that falls at the perfect length',
        price: 49.99,
        image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'This length draws attention to your balanced proportions and frames your neckline beautifully.',
        link: 'https://example.com/shop',
        tags: ['Elegant', 'Versatile', 'Classic']
      },
      {
        id: 'h-acc-3',
        name: 'Structured Handbag',
        description: 'Medium-sized bag with clean lines',
        price: 89.99,
        image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'This proportional bag complements your balanced figure without overwhelming it.',
        link: 'https://example.com/shop',
        tags: ['Structured', 'Versatile', 'Classic']
      }
    ]
  },
  
  'Rectangle': {
    casual: [
      {
        id: 'r-casual-1',
        name: 'Peplum Top',
        description: 'Stylish peplum top that creates curves',
        price: 49.99,
        image: 'https://images.pexels.com/photos/2887766/pexels-photo-2887766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'The peplum detail creates the illusion of curves and defines your waist.',
        link: 'https://example.com/shop',
        tags: ['Peplum', 'Waist-creating', 'Versatile']
      },
      {
        id: 'r-casual-2',
        name: 'Cinched Waist Dress',
        description: 'Casual dress with a drawstring waist',
        price: 59.99,
        image: 'https://images.pexels.com/photos/6069552/pexels-photo-6069552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'This dress creates definition at your waist while the flowy skirt adds volume to your hips.',
        link: 'https://example.com/shop',
        tags: ['Waist-defining', 'Casual', 'Comfortable']
      },
      {
        id: 'r-casual-3',
        name: 'Boyfriend Jeans with Belt',
        description: 'Relaxed jeans with a waist-cinching belt',
        price: 69.99,
        image: 'https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'These jeans create curves with their relaxed fit, while the belt defines your waist.',
        link: 'https://example.com/shop',
        tags: ['Relaxed fit', 'Belted', 'Versatile']
      }
    ],
    formal: [
      {
        id: 'r-formal-1',
        name: 'Structured Peplum Gown',
        description: 'Elegant gown with peplum detail at the waist',
        price: 159.99,
        image: 'https://images.pexels.com/photos/1926768/pexels-photo-1926768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'The structured bodice and peplum create curves while the flowing skirt adds dimension.',
        link: 'https://example.com/shop',
        tags: ['Peplum', 'Elegant', 'Evening wear']
      },
      {
        id: 'r-formal-2',
        name: 'Ruched Side Dress',
        description: 'Sophisticated dress with ruching at the waist',
        price: 129.99,
        image: 'https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'The ruching creates visual curves while the draping offers a sophisticated silhouette.',
        link: 'https://example.com/shop',
        tags: ['Ruched', 'Figure-enhancing', 'Elegant']
      },
      {
        id: 'r-formal-3',
        name: 'Structured Jumpsuit',
        description: 'Modern jumpsuit with a belted waist',
        price: 139.99,
        image: 'https://images.pexels.com/photos/1375736/pexels-photo-1375736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'This jumpsuit creates a defined waistline while the structured shoulders add dimension.',
        link: 'https://example.com/shop',
        tags: ['Modern', 'Belted', 'Statement piece']
      }
    ],
    workwear: [
      {
        id: 'r-work-1',
        name: 'Belted Blazer',
        description: 'Sophisticated blazer with a tie belt',
        price: 99.99,
        image: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'This blazer creates definition at your waist while maintaining professional style.',
        link: 'https://example.com/shop',
        tags: ['Belted', 'Professional', 'Structured']
      },
      {
        id: 'r-work-2',
        name: 'Peplum Blouse',
        description: 'Professional blouse with a subtle peplum',
        price: 59.99,
        image: 'https://images.pexels.com/photos/5935748/pexels-photo-5935748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'The peplum detail creates curves while maintaining a professional appearance.',
        link: 'https://example.com/shop',
        tags: ['Peplum', 'Professional', 'Curve-creating']
      },
      {
        id: 'r-work-3',
        name: 'A-Line Skirt',
        description: 'Classic A-line skirt for professional settings',
        price: 69.99,
        image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'This skirt creates curves at the hip while the A-line shape adds feminine flair.',
        link: 'https://example.com/shop',
        tags: ['A-line', 'Professional', 'Versatile']
      }
    ],
    accessories: [
      {
        id: 'r-acc-1',
        name: 'Wide Statement Belt',
        description: 'Bold belt to create definition at the waist',
        price: 39.99,
        image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'A wide belt instantly creates a waistline and adds curves to your frame.',
        link: 'https://example.com/shop',
        tags: ['Wide', 'Statement', 'Waist-creating']
      },
      {
        id: 'r-acc-2',
        name: 'Layered Necklace',
        description: 'Multi-strand necklace to add dimension',
        price: 49.99,
        image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'These layers create visual interest and dimension for your straight figure.',
        link: 'https://example.com/shop',
        tags: ['Layered', 'Statement', 'Dimension-adding']
      },
      {
        id: 'r-acc-3',
        name: 'Structured Handbag',
        description: 'Bag with architectural details and shape',
        price: 79.99,
        image: 'https://images.pexels.com/photos/934673/pexels-photo-934673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'This structured bag adds curves and dimension to complement your straight figure.',
        link: 'https://example.com/shop',
        tags: ['Structured', 'Statement', 'Curve-adding']
      }
    ]
  },
  
  // Similar structures for other body types
  'Triangle (Pear)': {
    casual: [
      {
        id: 'p-casual-1',
        name: 'Boat Neck Top',
        description: 'Stylish top with a wide neckline to balance proportions',
        price: 45.99,
        image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'The wide neckline draws attention to your shoulders and creates balance with your hips.',
        link: 'https://example.com/shop',
        tags: ['Wide neckline', 'Balancing', 'Casual']
      },
      // Add more items similar to other categories
    ],
    formal: [
      {
        id: 'p-formal-1',
        name: 'A-Line Gown',
        description: 'Elegant gown that skims over hips',
        price: 159.99,
        image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'This silhouette balances your proportions while the A-line skirt flatters your lower body.',
        link: 'https://example.com/shop',
        tags: ['A-line', 'Elegant', 'Balancing']
      },
      // Add more items similar to other categories
    ],
    workwear: [
      {
        id: 'p-work-1',
        name: 'Structured Blazer',
        description: 'Professional blazer with structured shoulders',
        price: 99.99,
        image: 'https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'The structured shoulders balance your hip width while creating a professional silhouette.',
        link: 'https://example.com/shop',
        tags: ['Structured', 'Professional', 'Balancing']
      },
      // Add more items similar to other categories
    ],
    accessories: [
      {
        id: 'p-acc-1',
        name: 'Statement Earrings',
        description: 'Bold earrings to draw attention upward',
        price: 34.99,
        image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'These earrings draw the eye upward to create visual balance with your lower body.',
        link: 'https://example.com/shop',
        tags: ['Statement', 'Attention-drawing', 'Balancing']
      },
      // Add more items similar to other categories
    ]
  },
  
  'Inverted Triangle': {
    casual: [
      {
        id: 'it-casual-1',
        name: 'A-Line Skirt',
        description: 'Flared skirt that adds volume to lower body',
        price: 59.99,
        image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'This skirt adds volume to your lower body to balance your broader shoulders.',
        link: 'https://example.com/shop',
        tags: ['A-line', 'Volume-adding', 'Balancing']
      },
      // Add more items similar to other categories
    ],
    formal: [
      {
        id: 'it-formal-1',
        name: 'Wide Leg Jumpsuit',
        description: 'Elegant jumpsuit with wide-leg pants',
        price: 139.99,
        image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'The wide-leg silhouette balances your broader shoulders and creates harmony.',
        link: 'https://example.com/shop',
        tags: ['Wide-leg', 'Elegant', 'Balancing']
      },
      // Add more items similar to other categories
    ],
    workwear: [
      {
        id: 'it-work-1',
        name: 'A-Line Dress',
        description: 'Professional dress with a flared skirt',
        price: 89.99,
        image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'This dress balances your proportions with a fitted top and volume in the skirt.',
        link: 'https://example.com/shop',
        tags: ['A-line', 'Professional', 'Balancing']
      },
      // Add more items similar to other categories
    ],
    accessories: [
      {
        id: 'it-acc-1',
        name: 'Statement Shoes',
        description: 'Bold footwear to draw attention downward',
        price: 89.99,
        image: 'https://images.pexels.com/photos/934673/pexels-photo-934673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'These shoes draw attention to your lower body, creating visual balance.',
        link: 'https://example.com/shop',
        tags: ['Statement', 'Attention-drawing', 'Balancing']
      },
      // Add more items similar to other categories
    ]
  },
  
  'Apple': {
    casual: [
      {
        id: 'a-casual-1',
        name: 'Empire Waist Top',
        description: 'Flowing top with a high waistline',
        price: 49.99,
        image: 'https://images.pexels.com/photos/5935748/pexels-photo-5935748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'This silhouette skims over your midsection while highlighting your bust and legs.',
        link: 'https://example.com/shop',
        tags: ['Empire waist', 'Flowing', 'Flattering']
      },
      // Add more items similar to other categories
    ],
    formal: [
      {
        id: 'a-formal-1',
        name: 'A-Line Evening Dress',
        description: 'Elegant dress with a defined bustline and flowing skirt',
        price: 149.99,
        image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'This dress highlights your bust and legs while providing a flattering fit at your midsection.',
        link: 'https://example.com/shop',
        tags: ['A-line', 'Elegant', 'Flattering']
      },
      // Add more items similar to other categories
    ],
    workwear: [
      {
        id: 'a-work-1',
        name: 'Structured Jacket',
        description: 'Professional jacket that creates shape',
        price: 99.99,
        image: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'This jacket creates structure and draws attention to your shoulders.',
        link: 'https://example.com/shop',
        tags: ['Structured', 'Professional', 'Shape-creating']
      },
      // Add more items similar to other categories
    ],
    accessories: [
      {
        id: 'a-acc-1',
        name: 'Statement Necklace',
        description: 'Bold necklace to draw attention upward',
        price: 49.99,
        image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        reasonText: 'This necklace draws attention to your face and décolletage, creating vertical focus.',
        link: 'https://example.com/shop',
        tags: ['Statement', 'Attention-drawing', 'Vertical focus']
      },
      // Add more items similar to other categories
    ]
  }
};

export default {
  getRecommendations
};