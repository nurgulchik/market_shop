export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  weight: string;
  rating: number;
  reviews: number;
  isPopular?: boolean;
  discount?: number;
}

export const CATEGORIES = [
  { id: 'fruits_vegetables', name: 'Fruits & Veggies', icon: 'Apple' },
  { id: 'meat_fish', name: 'Meat & Fish', icon: 'Beef' },
  { id: 'dairy', name: 'Dairy', icon: 'Milk' },
  { id: 'beverages', name: 'Beverages', icon: 'CupSoda' },
  { id: 'bakery', name: 'Bakery', icon: 'Croissant' },
  { id: 'cleaning', name: 'Cleaning', icon: 'SprayCan' },
  { id: 'household', name: 'Household', icon: 'Home' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Жаңы органикалык банан',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1571501478200-8b1cc9c0c3c6?auto=format&fit=crop&q=80&w=400',
    category: 'fruits_vegetables',
    weight: '1 кг',
    rating: 4.8,
    reviews: 124,
    isPopular: true,
  },
  {
    id: 'p2',
    name: 'Натуралдык сүт 3.2%',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=400',
    category: 'dairy',
    weight: '1 л',
    rating: 4.5,
    reviews: 89,
    isPopular: true,
  },
  {
    id: 'p3',
    name: 'Жаңы Атлантика форели',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=400',
    category: 'meat_fish',
    weight: '500 г',
    rating: 4.9,
    reviews: 56,
  },
  {
    id: 'p4',
    name: 'Үй наны (саама)',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050eb0e9?auto=format&fit=crop&q=80&w=400',
    category: 'bakery',
    weight: '1 даана',
    rating: 4.7,
    reviews: 210,
    discount: 10,
  },
  {
    id: 'p5',
    name: 'Идиш жуугуч каражат',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1584820927498-cafe8c1c9695?auto=format&fit=crop&q=80&w=400',
    category: 'cleaning',
    weight: '500 мл',
    rating: 4.6,
    reviews: 45,
  },
  {
    id: 'p6',
    name: 'Органикалык авокадо',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=400',
    category: 'fruits_vegetables',
    weight: '4 даана',
    rating: 4.9,
    reviews: 320,
    isPopular: true,
  },
  {
    id: 'p7',
    name: 'Премиум апельсин ширеси',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=400',
    category: 'beverages',
    weight: '1 л',
    rating: 4.4,
    reviews: 88,
  },
  {
    id: 'p8',
    name: 'Тазалоочу микрофибра салфеткалар',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1585933646706-7b243ea5625c?auto=format&fit=crop&q=80&w=400',
    category: 'household',
    weight: '3 даана',
    rating: 4.8,
    reviews: 156,
  }
];
