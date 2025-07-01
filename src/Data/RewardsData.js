export const dummyUserPoints = 0;

export const availableRewards = [
  {
    id: 1,
    title: 'Cena para Dos',
    description: 'Disfruta de una cena gourmet para dos personas en restaurantes seleccionados',
    pointsRequired: 1000,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80',
    type: 'meal',
    value: '€50'
  },
  {
    id: 2,
    title: 'Noche de Hotel',
    description: 'Una noche en hoteles de lujo seleccionados con desayuno incluido',
    pointsRequired: 2000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80',
    type: 'hotel',
    value: '€150'
  },
  {
    id: 3,
    title: 'Tarjeta Regalo Amazon',
    description: 'Tarjeta regalo para comprar lo que quieras en Amazon',
    pointsRequired: 1500,
    image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=500&q=80',
    type: 'gift_card',
    value: '€100'
  },
  {
    id: 4,
    title: 'Experiencia Spa',
    description: 'Día completo de spa y tratamientos de belleza',
    pointsRequired: 1800,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&q=80',
    type: 'spa',
    value: '€120'
  }
];

export const userRewardHistory = [
  {
    id: 1,
    rewardId: 2,
    redeemedDate: '2024-02-15',
    status: 'completed'
  },
  {
    id: 2,
    rewardId: 1,
    redeemedDate: '2024-01-20',
    status: 'completed'
  }
];