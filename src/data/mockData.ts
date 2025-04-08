
import { Product, Category, Order, User, Address } from '@/types';

// Categories
export const categories: Category[] = [
  {
    id: 'promotions',
    name: 'Promotions',
    nameAr: 'العروض',
    icon: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=240&h=240&fit=crop&q=80',
  },
  {
    id: 'mouneh',
    name: 'Mouneh',
    nameAr: 'مونة',
    icon: 'https://images.unsplash.com/photo-1580651315530-69c8e0026377?w=240&h=240&fit=crop&q=80',
  },
  {
    id: 'sweets',
    name: 'Sweets',
    nameAr: 'حلويات',
    icon: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=240&h=240&fit=crop&q=80',
  },
  {
    id: 'houseware',
    name: 'Houseware',
    nameAr: 'أدوات منزلية',
    icon: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=240&h=240&fit=crop&q=80',
  },
  {
    id: 'beverages',
    name: 'Beverages',
    nameAr: 'مشروبات',
    icon: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=240&h=240&fit=crop&q=80',
  },
  {
    id: 'bakery',
    name: 'Bakery',
    nameAr: 'مخبوزات',
    icon: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=240&h=240&fit=crop&q=80',
  },
  {
    id: 'baby',
    name: 'Baby Products',
    nameAr: 'منتجات الأطفال',
    icon: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=240&h=240&fit=crop&q=80',
  },
  {
    id: 'beauty',
    name: 'Beauty & Personal Care',
    nameAr: 'العناية الشخصية',
    icon: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=240&h=240&fit=crop&q=80',
  },
  {
    id: 'cleaning',
    name: 'Cleaning Products',
    nameAr: 'منتجات التنظيف',
    icon: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=240&h=240&fit=crop&q=80',
  },
  {
    id: 'deli',
    name: 'Deli, Dairy & Eggs',
    nameAr: 'ألبان وأجبان وبيض',
    icon: 'https://images.unsplash.com/photo-1626201850129-a196e46dc5c3?w=240&h=240&fit=crop&q=80',
  },
  {
    id: 'frozen',
    name: 'Frozen',
    nameAr: 'مجمدات',
    icon: 'https://images.unsplash.com/photo-1591634616938-1dce370ceba0?w=240&h=240&fit=crop&q=80',
  },
  {
    id: 'fruits',
    name: 'Fruits & Vegetables',
    nameAr: 'فواكه وخضار',
    icon: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=240&h=240&fit=crop&q=80',
  },
  {
    id: 'imported',
    name: 'Imported',
    nameAr: 'منتجات مستوردة',
    icon: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=240&h=240&fit=crop&q=80',
  },
  {
    id: 'pet',
    name: 'Pet Section',
    nameAr: 'مستلزمات الحيوانات',
    icon: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=240&h=240&fit=crop&q=80',
  },
  {
    id: 'snacks',
    name: 'Snacks & Candy',
    nameAr: 'وجبات خفيفة وحلويات',
    icon: 'https://images.unsplash.com/photo-1599629954294-14df9f8291b7?w=240&h=240&fit=crop&q=80',
  },
  {
    id: 'meat',
    name: 'Meat, Poultry & Fish',
    nameAr: 'لحوم ودواجن وأسماك',
    icon: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=240&h=240&fit=crop&q=80',
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
    images: ['https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=300&fit=crop&q=80'],
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
    images: ['https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=300&fit=crop&q=80'],
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
    images: ['https://images.unsplash.com/photo-1520342868574-5fa3804e551c?w=400&h=300&fit=crop&q=80'],
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
    images: ['https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=400&h=300&fit=crop&q=80'],
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
    images: ['https://images.unsplash.com/photo-1563994478466-8024fcecfb32?w=400&h=300&fit=crop&q=80'],
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
    images: ['https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=400&h=300&fit=crop&q=80'],
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
    images: ['https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop&q=80'],
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
    images: ['https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400&h=300&fit=crop&q=80'],
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
    images: ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop&q=80'],
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
    images: ['https://images.unsplash.com/photo-1513200562121-0a0f3ad79efb?w=400&h=300&fit=crop&q=80'],
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
    images: ['https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&h=300&fit=crop&q=80'],
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
    images: ['https://images.unsplash.com/photo-1596810577223-31a873260b61?w=400&h=300&fit=crop&q=80'],
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
