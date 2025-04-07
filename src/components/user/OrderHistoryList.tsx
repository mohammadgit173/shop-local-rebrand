
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  ChevronRight, 
  Truck, 
  CheckCircle, 
  AlertCircle, 
  Clock
} from 'lucide-react';
import { formatDistance } from 'date-fns';
import { Order, OrderStatus } from '@/types';

// Helper function to get status icon
const getStatusIcon = (status: OrderStatus) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case 'processing':
      return <Package className="h-4 w-4 text-blue-500" />;
    case 'out_for_delivery':
      return <Truck className="h-4 w-4 text-purple-500" />;
    case 'delivered':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'cancelled':
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    default:
      return <Package className="h-4 w-4 text-gray-500" />;
  }
};

// Helper function to get status text
const getStatusText = (status: OrderStatus) => {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'processing':
      return 'Processing';
    case 'out_for_delivery':
      return 'Out for delivery';
    case 'delivered':
      return 'Delivered';
    case 'cancelled':
      return 'Cancelled';
    default:
      return 'Unknown';
  }
};

interface OrderItemProps {
  order: Order;
  onClick: () => void;
}

export const OrderItem = ({ order, onClick }: OrderItemProps) => {
  const formattedDate = formatDistance(
    new Date(order.created_at),
    new Date(),
    { addSuffix: true }
  );

  return (
    <div 
      onClick={onClick}
      className="p-4 border rounded-lg hover:border-primary hover:shadow-sm transition-all cursor-pointer space-y-2"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-900">Order #{order.id.slice(0, 8)}</span>
          <div className="flex items-center bg-gray-100 px-2 py-0.5 rounded text-xs">
            {getStatusIcon(order.status)}
            <span className="ml-1">{getStatusText(order.status)}</span>
          </div>
        </div>
        <span className="text-xs text-gray-500">{formattedDate}</span>
      </div>
      
      <div className="text-sm text-gray-600">
        {order.items.length} {order.items.length === 1 ? 'item' : 'items'} · ${order.total.toFixed(2)}
      </div>
      
      <div className="flex justify-between items-center pt-1">
        <div className="flex -space-x-2">
          {/* Show up to 3 product images */}
          {order.items.slice(0, 3).map((item, idx) => (
            <div 
              key={idx} 
              className="h-8 w-8 rounded-full border border-white bg-gray-200 overflow-hidden"
            >
              <img 
                src={item.image} 
                alt={item.name} 
                className="h-full w-full object-cover"
              />
            </div>
          ))}
          {order.items.length > 3 && (
            <div className="h-8 w-8 rounded-full border border-white bg-gray-100 flex items-center justify-center text-xs">
              +{order.items.length - 3}
            </div>
          )}
        </div>
        
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
};

interface OrderHistoryListProps {
  orders: Order[];
}

export const OrderHistoryList = ({ orders }: OrderHistoryListProps) => {
  const navigate = useNavigate();
  
  if (!orders || orders.length === 0) {
    return (
      <div className="p-8 text-center border rounded-lg bg-gray-50">
        <Package className="h-12 w-12 mx-auto text-gray-300 mb-3" />
        <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
        <p className="text-gray-500 mt-1">When you place orders, they will appear here</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderItem 
          key={order.id}
          order={order} 
          onClick={() => navigate(`/user/orders/${order.id}`)} 
        />
      ))}
    </div>
  );
};

export default OrderHistoryList;
