import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "search_placeholder": "Search for groceries...",
      "categories": "Categories",
      "fruits_vegetables": "Fruits & Veggies",
      "meat_fish": "Meat & Fish",
      "dairy": "Dairy",
      "beverages": "Beverages",
      "bakery": "Bakery",
      "cleaning": "Cleaning",
      "household": "Household",
      "cart": "Cart",
      "checkout": "Checkout",
      "daily_deals": "Daily Deals",
      "add_to_cart": "Add",
      "frequently_bought": "Frequently Bought Together",
      "reorder": "Quick Reorder",
      "voice_search_hint": "Try saying 'Apples'",
      "profile": "Profile",
      "wishlist": "Wishlist",
      "orders": "My Orders",
      "delivery_estimate": "Delivery Estimate",
      "total": "Total",
      "live_tracking": "Live Tracking"
    }
  },
  ru: {
    translation: {
      "search_placeholder": "Поиск продуктов...",
      "categories": "Категории",
      "fruits_vegetables": "Фрукты и Овощи",
      "meat_fish": "Мясо и Рыба",
      "dairy": "Молочка",
      "beverages": "Напитки",
      "bakery": "Выпечка",
      "cleaning": "Уборка",
      "household": "Для дома",
      "cart": "Корзина",
      "checkout": "Оформить",
      "daily_deals": "Скидки дня",
      "add_to_cart": "В корзину",
      "frequently_bought": "Часто покупают вместе",
      "reorder": "Быстрый заказ",
      "voice_search_hint": "Скажите 'Яблоки'",
      "profile": "Профиль",
      "wishlist": "Избранное",
      "orders": "Мои заказы",
      "delivery_estimate": "Ожидаемая доставка",
      "total": "Итого",
      "live_tracking": "Отслеживание"
    }
  },
  kg: {
    translation: {
      "search_placeholder": "Азык-түлүк издөө...",
      "categories": "Категориялар",
      "fruits_vegetables": "Мөмө-жемиштер",
      "meat_fish": "Эт жана Балык",
      "dairy": "Сүт азыктары",
      "beverages": "Суусундуктар",
      "bakery": "Нан азыктары",
      "cleaning": "Тазалоо",
      "household": "Үй буюмдары",
      "cart": "Корзина",
      "checkout": "Сатып алуу",
      "daily_deals": "Күнүмдүк арзандатуулар",
      "add_to_cart": "Кошуу",
      "frequently_bought": "Көп сатылган",
      "reorder": "Тез буйрутма",
      "voice_search_hint": "Мисалы 'Алма' деп айтыңыз",
      "profile": "Профиль",
      "wishlist": "Тандалган",
      "orders": "Менин буйрутмаларым",
      "delivery_estimate": "Жеткирүү убактысы",
      "total": "Баардыгы",
      "live_tracking": "Көзөмөлдөө",
      "fresh_fast": "Тез жана Жаңы",
      "premium_groceries": "Сиздин үйүңүз үчүн мыкты азыктар",
      "hero_subtitle": "30 мүнөттүн ичинде жаңы органикалык продуктуларды үйүңүзгө жеткириңиз. Бүгүнкү 777 сунуштары.",
      "shop_now": "Сунуштарды көрүү",
      "fresh_deals": "Жаңы сунуштар",
      "all": "Баардыгы",
      "fast_delivery": "Тез жеткирүү",
      "fast_delivery_desc": "30 мүнөттүн ичинде эшигиңизге чейин",
      "fresh_organic": "Жаңы жана таза",
      "fresh_organic_desc": "100% табигый жана органикалык азыктар",
      "support_24": "24/7 Колдоо",
      "support_24_desc": "Биз ар дайым сиз менен байланыштабыз",
      "why_777": "Эмне үчүн 777 тандашат?",
      "safe_payment": "Коопсуз төлөм",
      "safe_payment_desc": "100% коопсуз транзакциялар",
      "quick_view": "Тез көрүү",
      "added_to_cart": "Корзинага кошулду!",
      "search_results": "Издөө жыйынтыктары",
      "no_products_found": "Продукция табылган жок",
      "hero_btn": "Сатып алуу",
      "cart_empty": "Корзинаңыз бош",
      "cart_empty_desc": "Сиз азырынча эч нерсе тандай элексиз. Биздин каталогду карап көрүңүз!",
      "back_to_shop": "Каталогко кайтуу",
      "reviews": "пикирлер",
      "delivery_address": "Жеткирүү дареги",
      "full_name": "Аты-жөнүңүз",
      "complete_address": "Толук дарек",
      "phone_number": "Телефон номериңиз",
      "delivery_time": "Жеткирүү убактысы",
      "payment_method": "Төлөм ыкмасы",
      "cash": "Накталай акча",
      "card": "Карта менен",
      "summary": "Жалпы маалымат",
      "place_order": "Буйрутма берүү",
      "processing": "Кабыл алынууда...",
      "express": "Тез жеткирүү",
      "free": "Акысыз"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'kg',
    fallbackLng: 'kg',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
