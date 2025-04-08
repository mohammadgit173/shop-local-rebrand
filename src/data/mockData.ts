
import { Product, Category, Order, User, Address } from '@/types';

// Categories
export const categories: Category[] = [
  {
    id: 'promotions',
    name: 'Promotions',
    name_ar: 'العروض',
    image_path: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=240&h=240&fit=crop&q=80',
  },
  {
    id: 'mouneh',
    name: 'Mouneh',
    name_ar: 'مونة',
    image_path: 'https://images.unsplash.com/photo-1580651315530-69c8e0026377?w=240&h=240&fit=crop&q=80',
  },
  {
    id: 'sweets',
    name: 'Sweets',
    name_ar: 'حلويات',
    image_path: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=240&h=240&fit=crop&q=80',
  },
  {
    id: 'houseware',
    name: 'Houseware',
    name_ar: 'أدوات منزلية',
    image_path: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=240&h=240&fit=crop&q=80',
  },
  {
    id: 'beverages',
    name: 'Beverages',
    name_ar: 'مشروبات',
    image_path: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?w=240&h=240&fit=crop&q=80',
  },
  {
    id: 'bakery',
    name: 'Bakery',
    name_ar: 'مخبوزات',
    image_path: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?w=240&h=240&fit=crop&q=80',
  },
  {
    id: 'baby',
    name: 'Baby Products',
    name_ar: 'منتجات الأطفال',
    image_path: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=240&h=240&fit=crop&q=80',
  },
  {
    id: 'beauty',
    name: 'Beauty & Personal Care',
    name_ar: 'العناية الشخصية',
    image_path: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=240&h=240&fit=crop&q=80',
  },
  {
    id: 'cleaning',
    name: 'Cleaning Products',
    name_ar: 'منتجات التنظيف',
    image_path: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=240&h=240&fit=crop&q=80',
  },
  {
    id: 'deli',
    name: 'Deli, Dairy & Eggs',
    name_ar: 'ألبان وأجبان وبيض',
    image_path: 'https://images.unsplash.com/photo-1626201850129-a196e46dc5c3?w=240&h=240&fit=crop&q=80',
  },
  {
    id: 'frozen',
    name: 'Frozen',
    name_ar: 'مجمدات',
    image_path: 'https://images.unsplash.com/photo-1591634616938-1dce370ceba0?w=240&h=240&fit=crop&q=80',
  },
  {
    id: 'fruits',
    name: 'Fruits & Vegetables',
    name_ar: 'فواكه وخضار',
    image_path: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=240&h=240&fit=crop&q=80',
  },
  {
    id: 'imported',
    name: 'Imported',
    name_ar: 'منتجات مستوردة',
    image_path: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=240&h=240&fit=crop&q=80',
  },
  {
    id: 'pet',
    name: 'Pet Section',
    name_ar: 'مستلزمات الحيوانات',
    image_path: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=240&h=240&fit=crop&q=80',
  },
  {
    id: 'snacks',
    name: 'Snacks & Candy',
    name_ar: 'وجبات خفيفة وحلويات',
    image_path: 'https://images.unsplash.com/photo-1599629954294-14df9f8291b7?w=240&h=240&fit=crop&q=80',
  },
  {
    id: 'meat',
    name: 'Meat, Poultry & Fish',
    name_ar: 'لحوم ودواجن وأسماك',
    image_path: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=240&h=240&fit=crop&q=80',
  },
];

// Products
export const products: Product[] = [
  {
    id: 'p1',
    name: 'Fresh Organic Bananas',
    name_ar: 'موز عضوي طازج',
    description: 'Sweet and ripe organic bananas, perfect for a healthy snack or smoothies.',
    description_ar: 'موز عضوي حلو وناضج، مثالي للوجبات الخفيفة الصحية أو العصائر.',
    price: 15000,
    images: ['https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=300&fit=crop&q=80'],
    category_id: 'fruits',
    in_stock: true,
    stock_quantity: 100,
    unit: 'kg',
    featured: true,
  },
  {
    id: 'p2',
    name: 'Free Range Eggs (Pack of 12)',
    name_ar: 'بيض دجاج حر (12 حبة)',
    description: 'Farm fresh free-range eggs from local chickens.',
    description_ar: 'بيض طازج من المزرعة من دجاج محلي.',
    price: 35000,
    images: ['https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=300&fit=crop&q=80'],
    category_id: 'deli',
    in_stock: true,
    stock_quantity: 50,
    unit: 'pack',
  },
  {
    id: 'p3',
    name: 'Lebanese Flatbread',
    name_ar: 'خبز لبناني',
    description: 'Traditional Lebanese flatbread, freshly baked daily.',
    description_ar: 'خبز لبناني تقليدي، يخبز طازجاً يومياً.',
    price: 8000,
    images: ['https://images.unsplash.com/photo-1520342868574-5fa3804e551c?w=400&h=300&fit=crop&q=80'],
    category_id: 'bakery',
    in_stock: true,
    stock_quantity: 80,
    unit: 'pack',
  },
  {
    id: 'p4',
    name: 'Labneh with Olive Oil',
    name_ar: 'لبنة بزيت الزيتون',
    description: 'Creamy strained yogurt topped with premium olive oil.',
    description_ar: 'لبنة كريمية مع زيت زيتون فاخر.',
    price: 25000,
    images: ['https://images.unsplash.com/photo-1559598467-f8b76c8155d0?w=400&h=300&fit=crop&q=80'],
    category_id: 'deli',
    in_stock: true,
    stock_quantity: 40,
    unit: 'container',
  },
  {
    id: 'p5',
    name: 'Pomegranate Molasses',
    name_ar: 'دبس الرمان',
    description: 'Traditional pomegranate molasses, perfect for salad dressings and marinades.',
    description_ar: 'دبس الرمان التقليدي، مثالي لتتبيل السلطات والمتبلات.',
    price: 18000,
    sale_price: 15000,
    images: ['https://images.unsplash.com/photo-1563994478466-8024fcecfb32?w=400&h=300&fit=crop&q=80'],
    category_id: 'mouneh',
    in_stock: true,
    stock_quantity: 60,
    unit: 'bottle',
    featured: true,
  },
  {
    id: 'p6',
    name: 'Za\'atar Spice Mix',
    name_ar: 'خلطة زعتر',
    description: 'Authentic Lebanese za\'atar mix with wild thyme, sumac, sesame seeds.',
    description_ar: 'خلطة زعتر لبنانية أصلية مع زعتر بري، سماق، وبذور سمسم.',
    price: 22000,
    images: ['https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=400&h=300&fit=crop&q=80'],
    category_id: 'mouneh',
    in_stock: true,
    stock_quantity: 45,
    unit: 'pack',
  },
  {
    id: 'p7',
    name: 'Fresh Orange Juice',
    name_ar: 'عصير البرتقال الطازج',
    description: 'Freshly squeezed orange juice, no added sugar or preservatives.',
    description_ar: 'عصير برتقال طازج، بدون سكر أو مواد حافظة مضافة.',
    price: 12000,
    images: ['https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop&q=80'],
    category_id: 'beverages',
    in_stock: true,
    stock_quantity: 30,
    unit: 'bottle',
    new: true,
  },
  {
    id: 'p8',
    name: 'Premium Baklava Assortment',
    name_ar: 'تشكيلة بقلاوة فاخرة',
    description: 'Handcrafted baklava with pistachios, walnuts, and honey syrup.',
    description_ar: 'بقلاوة مصنوعة يدويًا مع فستق حلبي، جوز، وشراب العسل.',
    price: 65000,
    images: ['https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400&h=300&fit=crop&q=80'],
    category_id: 'sweets',
    in_stock: true,
    stock_quantity: 20,
    unit: 'box',
    featured: true,
  },
  {
    id: 'p9',
    name: 'Local Olive Oil (1L)',
    name_ar: 'زيت زيتون محلي (1 لتر)',
    description: 'Cold-pressed extra virgin olive oil from Lebanese mountains.',
    description_ar: 'زيت زيتون بكر ممتاز معصور على البارد من جبال لبنان.',
    price: 120000,
    sale_price: 99000,
    images: ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop&q=80'],
    category_id: 'mouneh',
    in_stock: true,
    stock_quantity: 35,
    unit: 'bottle',
  },
  {
    id: 'p10',
    name: 'Halloumi Cheese',
    name_ar: 'جبنة حلوم',
    description: 'Traditional halloumi cheese, perfect for grilling or frying.',
    description_ar: 'جبنة حلوم تقليدية، مثالية للشوي أو القلي.',
    price: 45000,
    images: ['https://images.unsplash.com/photo-1513200562121-0a0f3ad79efb?w=400&h=300&fit=crop&q=80'],
    category_id: 'deli',
    in_stock: true,
    stock_quantity: 40,
    unit: 'pack',
  },
  {
    id: 'p11',
    name: 'Nescafe Gold Instant Coffee',
    name_ar: 'قهوة نسكافيه جولد سريعة التحضير',
    description: 'Premium instant coffee for a rich and smooth taste.',
    description_ar: 'قهوة سريعة التحضير ممتازة لمذاق غني وناعم.',
    price: 75000,
    images: ['https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&h=300&fit=crop&q=80'],
    category_id: 'beverages',
    in_stock: true,
    stock_quantity: 25,
    unit: 'jar',
  },
  {
    id: 'p12',
    name: 'Dried Apricots',
    name_ar: 'مشمش مجفف',
    description: 'Sweet dried apricots, great for snacking or baking.',
    description_ar: 'مشمش مجفف حلو، رائع للوجبات الخفيفة أو الخبز.',
    price: 30000,
    images: ['https://images.unsplash.com/photo-1596810577223-31a873260b61?w=400&h=300&fit=crop&q=80'],
    category_id: 'snacks',
    in_stock: true,
    stock_quantity: 55,
    unit: 'pack',
  },
];

// Sample user address
export const sampleAddresses: Address[] = [
  {
    id: 'addr1',
    label: 'Home',
    full_address: 'Barja, near Shahin pharmacy',
    city: 'Barja',
    landmark: 'Near Shahin pharmacy',
    notes: 'White building, 2nd floor',
  },
  {
    id: 'addr2',
    label: 'Work',
    full_address: 'Beirut, Hamra St., Commodore Building',
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
  default_address_id: 'addr1',
};

// Sample orders
export const sampleOrders: Order[] = [
  {
    id: 'ord1',
    user_id: 'user1',
    items: [
      {
        product_id: 'p1',
        name: 'Fresh Organic Bananas',
        price: 15000,
        quantity: 2,
        total: 30000,
        image: 'https://via.placeholder.com/400x300?text=Bananas',
      },
      {
        product_id: 'p3',
        name: 'Lebanese Flatbread',
        price: 8000,
        quantity: 1,
        total: 8000,
        image: 'https://via.placeholder.com/400x300?text=Flatbread',
      },
    ],
    subtotal: 38000,
    delivery_fee: 10000,
    total: 48000,
    status: 'delivered',
    payment_method: 'Cash on Delivery',
    payment_status: 'paid',
    address: sampleAddresses[0],
    created_at: '2023-05-10T14:30:00Z',
  },
  {
    id: 'ord2',
    user_id: 'user1',
    items: [
      {
        product_id: 'p5',
        name: 'Pomegranate Molasses',
        price: 15000,
        quantity: 1,
        total: 15000,
        image: 'https://via.placeholder.com/400x300?text=Molasses',
      },
      {
        product_id: 'p8',
        name: 'Premium Baklava Assortment',
        price: 65000,
        quantity: 1,
        total: 65000,
        image: 'https://via.placeholder.com/400x300?text=Baklava',
      },
    ],
    subtotal: 80000,
    delivery_fee: 10000,
    total: 90000,
    status: 'processing',
    payment_method: 'Credit Card',
    payment_status: 'paid',
    address: sampleAddresses[1],
    created_at: '2023-06-15T10:15:00Z',
    estimated_delivery: '2023-06-16T14:00:00Z',
  },
];

// Featured Products
export const featuredProducts = products.filter(product => product.featured);

// New Products
export const newProducts = products.filter(product => product.new);

// Products on Sale
export const saleProducts = products.filter(product => product.sale_price);

// Get products by category
export const getProductsByCategory = (categoryId: string) => {
  return products.filter(product => product.category_id === categoryId);
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
  return sampleOrders.filter(order => order.user_id === userId);
};

// Get order by ID
export const getOrderById = (id: string) => {
  return sampleOrders.find(order => order.id === id);
};
