
import { Product, Category, Order, User, Address } from '@/types';

// Categories
export const categories: Category[] = [
  {
    id: 'promotions',
    name: 'Promotions',
    nameAr: 'العروض',
    icon: 'https://via.placeholder.com/100?text=Promo',
  },
  {
    id: 'mouneh',
    name: 'Mouneh',
    nameAr: 'مونة',
    icon: 'https://via.placeholder.com/100?text=Mouneh',
  },
  {
    id: 'sweets',
    name: 'Sweets',
    nameAr: 'حلويات',
    icon: 'https://via.placeholder.com/100?text=Sweets',
  },
  {
    id: 'houseware',
    name: 'Houseware',
    nameAr: 'أدوات منزلية',
    icon: 'https://via.placeholder.com/100?text=Houseware',
  },
  {
    id: 'beverages',
    name: 'Beverages',
    nameAr: 'مشروبات',
    icon: 'https://via.placeholder.com/100?text=Beverages',
  },
  {
    id: 'bakery',
    name: 'Bakery',
    nameAr: 'مخبوزات',
    icon: 'https://via.placeholder.com/100?text=Bakery',
  },
  {
    id: 'baby',
    name: 'Baby Products',
    nameAr: 'منتجات الأطفال',
    icon: 'https://via.placeholder.com/100?text=Baby',
  },
  {
    id: 'beauty',
    name: 'Beauty & Personal Care',
    nameAr: 'العناية الشخصية',
    icon: 'https://via.placeholder.com/100?text=Beauty',
  },
  {
    id: 'cleaning',
    name: 'Cleaning Products',
    nameAr: 'منتجات التنظيف',
    icon: 'https://via.placeholder.com/100?text=Cleaning',
  },
  {
    id: 'deli',
    name: 'Deli, Dairy & Eggs',
    nameAr: 'ألبان وأجبان وبيض',
    icon: 'https://via.placeholder.com/100?text=Deli',
  },
  {
    id: 'frozen',
    name: 'Frozen',
    nameAr: 'مجمدات',
    icon: 'https://via.placeholder.com/100?text=Frozen',
  },
  {
    id: 'fruits',
    name: 'Fruits & Vegetables',
    nameAr: 'فواكه وخضار',
    icon: 'https://via.placeholder.com/100?text=Fruits',
  },
  {
    id: 'imported',
    name: 'Imported',
    nameAr: 'منتجات مستوردة',
    icon: 'https://via.placeholder.com/100?text=Imported',
  },
  {
    id: 'pet',
    name: 'Pet Section',
    nameAr: 'مستلزمات الحيوانات',
    icon: 'https://via.placeholder.com/100?text=Pet',
  },
  {
    id: 'snacks',
    name: 'Snacks & Candy',
    nameAr: 'وجبات خفيفة وحلويات',
    icon: 'https://via.placeholder.com/100?text=Snacks',
  },
  {
    id: 'meat',
    name: 'Meat, Poultry & Fish',
    nameAr: 'لحوم ودواجن وأسماك',
    icon: 'https://via.placeholder.com/100?text=Meat',
  },
];

// Products
export const products: Product[] = [
  {
    id: 'p1',
    name: 'Fresh Organic Bananas',
    nameAr: 'موز عضوي طازج',
    description: 'Sweet and ripe organic bananas, perfect for a healthy snack or smoothies.',
    descriptionAr: 'موز عضوي حلو وناضج، مثالي للوجبات الخفيفة الصحية أو العصائر.',
    price: 15000,
    images: ['https://via.placeholder.com/400x300?text=Bananas'],
    category: 'fruits',
    inStock: true,
    stockQuantity: 100,
    unit: 'kg',
    featured: true,
  },
  {
    id: 'p2',
    name: 'Free Range Eggs (Pack of 12)',
    nameAr: 'بيض دجاج حر (12 حبة)',
    description: 'Farm fresh free-range eggs from local chickens.',
    descriptionAr: 'بيض طازج من المزرعة من دجاج محلي.',
    price: 35000,
    images: ['https://via.placeholder.com/400x300?text=Eggs'],
    category: 'deli',
    inStock: true,
    stockQuantity: 50,
    unit: 'pack',
  },
  {
    id: 'p3',
    name: 'Lebanese Flatbread',
    nameAr: 'خبز لبناني',
    description: 'Traditional Lebanese flatbread, freshly baked daily.',
    descriptionAr: 'خبز لبناني تقليدي، يخبز طازجاً يومياً.',
    price: 8000,
    images: ['https://via.placeholder.com/400x300?text=Flatbread'],
    category: 'bakery',
    inStock: true,
    stockQuantity: 80,
    unit: 'pack',
  },
  {
    id: 'p4',
    name: 'Labneh with Olive Oil',
    nameAr: 'لبنة بزيت الزيتون',
    description: 'Creamy strained yogurt topped with premium olive oil.',
    descriptionAr: 'لبنة كريمية مع زيت زيتون فاخر.',
    price: 25000,
    images: ['https://via.placeholder.com/400x300?text=Labneh'],
    category: 'deli',
    inStock: true,
    stockQuantity: 40,
    unit: 'container',
  },
  {
    id: 'p5',
    name: 'Pomegranate Molasses',
    nameAr: 'دبس الرمان',
    description: 'Traditional pomegranate molasses, perfect for salad dressings and marinades.',
    descriptionAr: 'دبس الرمان التقليدي، مثالي لتتبيل السلطات والمتبلات.',
    price: 18000,
    salePrice: 15000,
    images: ['https://via.placeholder.com/400x300?text=Molasses'],
    category: 'mouneh',
    inStock: true,
    stockQuantity: 60,
    unit: 'bottle',
    featured: true,
  },
  {
    id: 'p6',
    name: 'Za\'atar Spice Mix',
    nameAr: 'خلطة زعتر',
    description: 'Authentic Lebanese za\'atar mix with wild thyme, sumac, sesame seeds.',
    descriptionAr: 'خلطة زعتر لبنانية أصلية مع زعتر بري، سماق، وبذور سمسم.',
    price: 22000,
    images: ['https://via.placeholder.com/400x300?text=Zaatar'],
    category: 'mouneh',
    inStock: true,
    stockQuantity: 45,
    unit: 'pack',
  },
  {
    id: 'p7',
    name: 'Fresh Orange Juice',
    nameAr: 'عصير البرتقال الطازج',
    description: 'Freshly squeezed orange juice, no added sugar or preservatives.',
    descriptionAr: 'عصير برتقال طازج، بدون سكر أو مواد حافظة مضافة.',
    price: 12000,
    images: ['https://via.placeholder.com/400x300?text=OrangeJuice'],
    category: 'beverages',
    inStock: true,
    stockQuantity: 30,
    unit: 'bottle',
    new: true,
  },
  {
    id: 'p8',
    name: 'Premium Baklava Assortment',
    nameAr: 'تشكيلة بقلاوة فاخرة',
    description: 'Handcrafted baklava with pistachios, walnuts, and honey syrup.',
    descriptionAr: 'بقلاوة مصنوعة يدويًا مع فستق حلبي، جوز، وشراب العسل.',
    price: 65000,
    images: ['https://via.placeholder.com/400x300?text=Baklava'],
    category: 'sweets',
    inStock: true,
    stockQuantity: 20,
    unit: 'box',
    featured: true,
  },
  {
    id: 'p9',
    name: 'Local Olive Oil (1L)',
    nameAr: 'زيت زيتون محلي (1 لتر)',
    description: 'Cold-pressed extra virgin olive oil from Lebanese mountains.',
    descriptionAr: 'زيت زيتون بكر ممتاز معصور على البارد من جبال لبنان.',
    price: 120000,
    salePrice: 99000,
    images: ['https://via.placeholder.com/400x300?text=OliveOil'],
    category: 'mouneh',
    inStock: true,
    stockQuantity: 35,
    unit: 'bottle',
  },
  {
    id: 'p10',
    name: 'Halloumi Cheese',
    nameAr: 'جبنة حلوم',
    description: 'Traditional halloumi cheese, perfect for grilling or frying.',
    descriptionAr: 'جبنة حلوم تقليدية، مثالية للشوي أو القلي.',
    price: 45000,
    images: ['https://via.placeholder.com/400x300?text=Halloumi'],
    category: 'deli',
    inStock: true,
    stockQuantity: 40,
    unit: 'pack',
  },
  {
    id: 'p11',
    name: 'Nescafe Gold Instant Coffee',
    nameAr: 'قهوة نسكافيه جولد سريعة التحضير',
    description: 'Premium instant coffee for a rich and smooth taste.',
    descriptionAr: 'قهوة سريعة التحضير ممتازة لمذاق غني وناعم.',
    price: 75000,
    images: ['https://via.placeholder.com/400x300?text=Coffee'],
    category: 'beverages',
    inStock: true,
    stockQuantity: 25,
    unit: 'jar',
  },
  {
    id: 'p12',
    name: 'Dried Apricots',
    nameAr: 'مشمش مجفف',
    description: 'Sweet dried apricots, great for snacking or baking.',
    descriptionAr: 'مشمش مجفف حلو، رائع للوجبات الخفيفة أو الخبز.',
    price: 30000,
    images: ['https://via.placeholder.com/400x300?text=DriedApricots'],
    category: 'snacks',
    inStock: true,
    stockQuantity: 55,
    unit: 'pack',
  },
];

// Sample user address
export const sampleAddresses: Address[] = [
  {
    id: 'addr1',
    label: 'Home',
    fullAddress: 'Barja, near Shahin pharmacy',
    city: 'Barja',
    landmark: 'Near Shahin pharmacy',
    notes: 'White building, 2nd floor',
  },
  {
    id: 'addr2',
    label: 'Work',
    fullAddress: 'Beirut, Hamra St., Commodore Building',
    city: 'Beirut',
    area: 'Hamra',
    building: 'Commodore Building',
    floor: '5',
  },
];

// Sample user
export const sampleUser: User = {
  id: 'user1',
  email: 'customer@example.com',
  name: 'John Doe',
  phone: '+961 71 123 456',
  addresses: sampleAddresses,
  defaultAddressId: 'addr1',
};

// Sample orders
export const sampleOrders: Order[] = [
  {
    id: 'ord1',
    userId: 'user1',
    items: [
      {
        productId: 'p1',
        name: 'Fresh Organic Bananas',
        price: 15000,
        quantity: 2,
        total: 30000,
        image: 'https://via.placeholder.com/400x300?text=Bananas',
      },
      {
        productId: 'p3',
        name: 'Lebanese Flatbread',
        price: 8000,
        quantity: 1,
        total: 8000,
        image: 'https://via.placeholder.com/400x300?text=Flatbread',
      },
    ],
    subtotal: 38000,
    deliveryFee: 10000,
    total: 48000,
    status: 'delivered',
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'paid',
    address: sampleAddresses[0],
    createdAt: '2023-05-10T14:30:00Z',
  },
  {
    id: 'ord2',
    userId: 'user1',
    items: [
      {
        productId: 'p5',
        name: 'Pomegranate Molasses',
        price: 15000,
        quantity: 1,
        total: 15000,
        image: 'https://via.placeholder.com/400x300?text=Molasses',
      },
      {
        productId: 'p8',
        name: 'Premium Baklava Assortment',
        price: 65000,
        quantity: 1,
        total: 65000,
        image: 'https://via.placeholder.com/400x300?text=Baklava',
      },
    ],
    subtotal: 80000,
    deliveryFee: 10000,
    total: 90000,
    status: 'processing',
    paymentMethod: 'Credit Card',
    paymentStatus: 'paid',
    address: sampleAddresses[1],
    createdAt: '2023-06-15T10:15:00Z',
    estimatedDelivery: '2023-06-16T14:00:00Z',
  },
];

// Featured Products
export const featuredProducts = products.filter(product => product.featured);

// New Products
export const newProducts = products.filter(product => product.new);

// Products on Sale
export const saleProducts = products.filter(product => product.salePrice);

// Get products by category
export const getProductsByCategory = (categoryId: string) => {
  return products.filter(product => product.category === categoryId);
};

// Get product by ID
export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

// Get category by ID
export const getCategoryById = (id: string) => {
  return categories.find(category => category.id === id);
};

// Get orders by user ID
export const getOrdersByUserId = (userId: string) => {
  return sampleOrders.filter(order => order.userId === userId);
};

// Get order by ID
export const getOrderById = (id: string) => {
  return sampleOrders.find(order => order.id === id);
};
