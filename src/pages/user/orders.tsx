export default function OrdersPage() {
    return (
      <div className="px-4 py-8 space-y-6">
        <h1 className="text-2xl font-bold">My Orders</h1>
  
        <div className="space-y-4">
          {/* Mocked orders */}
          <div className="p-4 border rounded-lg space-y-2">
            <div className="text-lg font-semibold">Order #12345</div>
            <div className="text-gray-500 text-sm">Delivered on March 1, 2025</div>
            <div className="text-right text-sm text-blue-600">View Details</div>
          </div>
          <div className="p-4 border rounded-lg space-y-2">
            <div className="text-lg font-semibold">Order #67890</div>
            <div className="text-gray-500 text-sm">Delivered on February 20, 2025</div>
            <div className="text-right text-sm text-blue-600">View Details</div>
          </div>
        </div>
      </div>
    );
  }
  