
/**
 * White-label store configuration
 * This file contains all the store-specific settings that can be changed for different deployments
 */
export interface StoreConfig {
  // Store information
  name: string;
  slogan: string;
  logo: string;
  favicon: string;
  
  // Contact information
  phone: string;
  email: string;
  address: string;
  
  // Social media
  facebook?: string;
  instagram?: string;
  twitter?: string;
  
  // App settings
  defaultLanguage: 'en' | 'ar';
  supportedLanguages: ('en' | 'ar')[];
  currency: string;
  currencySymbol: string;
  
  // Features
  enabledFeatures: {
    socialLogin: boolean;
    productReviews: boolean;
    orderTracking: boolean;
    wishlist: boolean;
    pushNotifications: boolean;
    inAppChat: boolean;
  };
  
  // Delivery settings
  deliverySettings: {
    minimumOrderAmount: number;
    freeDeliveryThreshold: number;
    standardDeliveryFee: number;
    expressDeliveryAvailable: boolean;
    expressDeliveryFee: number;
  };
  
  // Payment methods
  paymentMethods: {
    creditCard: boolean;
    applePay: boolean;
    googlePay: boolean;
    cashOnDelivery: boolean;
  };
}

/**
 * Shami Shopping configuration
 */
export const shamiShoppingConfig: StoreConfig = {
  name: "Shami Shopping",
  slogan: "Fresh Groceries, Fast Delivery",
  logo: "src/assets/shami-logo.png", // Will create this asset
  favicon: "/favicon.ico",
  
  phone: "+961 1 234 567",
  email: "support@shamishopping.com",
  address: "Beirut, Lebanon",
  
  facebook: "https://facebook.com/shamishopping",
  instagram: "https://instagram.com/shamishopping",
  
  defaultLanguage: "en",
  supportedLanguages: ["en", "ar"],
  currency: "LBP",
  currencySymbol: "L£",
  
  enabledFeatures: {
    socialLogin: true,
    productReviews: true,
    orderTracking: true,
    wishlist: true,
    pushNotifications: true,
    inAppChat: true,
  },
  
  deliverySettings: {
    minimumOrderAmount: 50000,
    freeDeliveryThreshold: 200000,
    standardDeliveryFee: 10000,
    expressDeliveryAvailable: true,
    expressDeliveryFee: 25000,
  },
  
  paymentMethods: {
    creditCard: true,
    applePay: true,
    googlePay: true,
    cashOnDelivery: true,
  },
};

// Export the current active store configuration
export const storeConfig = shamiShoppingConfig;

// Language translations
export interface LanguageTranslations {
  [key: string]: string;
}

// English translations
export const enTranslations: LanguageTranslations = {
  // Common
  appName: "Shami Shopping",
  search: "Search",
  cart: "Cart",
  account: "Account",
  home: "Home",
  categories: "Categories",
  orders: "Orders",
  
  // Categories
  promotions: "Promotions",
  mouneh: "Mouneh",
  sweets: "Sweets",
  houseware: "Houseware",
  beverages: "Beverages",
  bakery: "Bakery",
  baby: "Baby Products",
  beauty: "Beauty & Personal Care",
  cleaning: "Cleaning Products",
  deli: "Deli, Dairy & Eggs",
  frozen: "Frozen",
  fruits: "Fruits & Vegetables",
  imported: "Imported",
  pet: "Pet Section",
  snacks: "Snacks & Candy",
  meat: "Meat, Poultry & Fish",
  
  // Product details
  addToCart: "Add to Cart",
  addToWishlist: "Add to Wishlist",
  quantity: "Quantity",
  inStock: "In Stock",
  outOfStock: "Out of Stock",
  description: "Description",
  reviews: "Reviews",
  
  // Cart
  emptyCart: "Your cart is empty",
  checkout: "Checkout",
  total: "Total",
  subtotal: "Subtotal",
  delivery: "Delivery",
  
  // Authentication
  login: "Login",
  register: "Register",
  email: "Email",
  password: "Password",
  forgotPassword: "Forgot Password?",
  name: "Name",
  phoneNumber: "Phone Number",
  
  // Profile
  myProfile: "My Profile",
  myOrders: "My Orders",
  myAddresses: "My Addresses",
  settings: "Settings",
  logout: "Logout",
  
  // Order
  orderNumber: "Order Number",
  orderDate: "Order Date",
  orderStatus: "Order Status",
  orderTotal: "Order Total",
  viewOrder: "View Order",
  trackOrder: "Track Order",
  
  // Checkout
  paymentMethod: "Payment Method",
  deliveryAddress: "Delivery Address",
  placeOrder: "Place Order",
  
  // Misc
  language: "Language",
  aboutUs: "About Us",
  contactUs: "Contact Us",
  termsConditions: "Terms & Conditions",
  privacyPolicy: "Privacy Policy",
};

// Arabic translations
export const arTranslations: LanguageTranslations = {
  // Common
  appName: "شامي شوبينغ",
  search: "بحث",
  cart: "سلة التسوق",
  account: "حسابي",
  home: "الرئيسية",
  categories: "الفئات",
  orders: "الطلبات",
  
  // Categories
  promotions: "العروض",
  mouneh: "مونة",
  sweets: "حلويات",
  houseware: "أدوات منزلية",
  beverages: "مشروبات",
  bakery: "مخبوزات",
  baby: "منتجات الأطفال",
  beauty: "العناية الشخصية",
  cleaning: "منتجات التنظيف",
  deli: "ألبان وأجبان وبيض",
  frozen: "مجمدات",
  fruits: "فواكه وخضار",
  imported: "منتجات مستوردة",
  pet: "مستلزمات الحيوانات",
  snacks: "وجبات خفيفة وحلويات",
  meat: "لحوم ودواجن وأسماك",
  
  // Product details
  addToCart: "أضف إلى السلة",
  addToWishlist: "أضف إلى المفضلة",
  quantity: "الكمية",
  inStock: "متوفر",
  outOfStock: "غير متوفر",
  description: "الوصف",
  reviews: "التقييمات",
  
  // Cart
  emptyCart: "سلة التسوق فارغة",
  checkout: "إتمام الشراء",
  total: "المجموع",
  subtotal: "المجموع الفرعي",
  delivery: "التوصيل",
  
  // Authentication
  login: "تسجيل الدخول",
  register: "إنشاء حساب",
  email: "البريد الإلكتروني",
  password: "كلمة المرور",
  forgotPassword: "نسيت كلمة المرور؟",
  name: "الاسم",
  phoneNumber: "رقم الهاتف",
  
  // Profile
  myProfile: "ملفي الشخصي",
  myOrders: "طلباتي",
  myAddresses: "عناويني",
  settings: "الإعدادات",
  logout: "تسجيل الخروج",
  
  // Order
  orderNumber: "رقم الطلب",
  orderDate: "تاريخ الطلب",
  orderStatus: "حالة الطلب",
  orderTotal: "إجمالي الطلب",
  viewOrder: "عرض الطلب",
  trackOrder: "تتبع الطلب",
  
  // Checkout
  paymentMethod: "طريقة الدفع",
  deliveryAddress: "عنوان التوصيل",
  placeOrder: "تأكيد الطلب",
  
  // Misc
  language: "اللغة",
  aboutUs: "عن الشركة",
  contactUs: "اتصل بنا",
  termsConditions: "الشروط والأحكام",
  privacyPolicy: "سياسة الخصوصية",
};
