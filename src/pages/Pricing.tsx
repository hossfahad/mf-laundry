import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Pricing = () => {
  const washFoldPricing = [
    { service: "1–10 lbs (Flat Rate)", price: "$14.00", unit: "total" },
    { service: "11+ lbs", price: "$1.27", unit: "per lb" },
  ];

  const specialItemsPricing = [
    { service: "Pillow (Regular)", price: "$8.00", unit: "each" },
    { service: "Pillow (Down)", price: "$12.00", unit: "each" },
    { service: "Blanket (Twin)", price: "$10.00", unit: "each" },
    { service: "Blanket (Queen)", price: "$12.00", unit: "each" },
    { service: "Blanket (King)", price: "$13.00", unit: "each" },
    { service: "Comforter (Twin)", price: "$18.00", unit: "each" },
    { service: "Comforter (Queen)", price: "$20.00", unit: "each" },
    { service: "Comforter (King)", price: "$23.00", unit: "each" },
    { service: "Down Comforter (Twin)", price: "$20.00", unit: "each" },
    { service: "Down Comforter (Queen)", price: "$25.00", unit: "each" },
    { service: "Down Comforter (King)", price: "$30.00", unit: "each" },
  ];

  const PriceTable = ({ title, items }: { title: string; items: { service: string; price: string; unit: string }[] }) => (
    <section className="mb-12">
      <h3 className="text-xl mb-6 font-normal font-['Inter'] text-gray-800 tracking-tight" style={{ fontWeight: 400, letterSpacing: '-0.01em' }}>{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0 rounded-xl shadow-md bg-white/70 font-['Inter']">
          <thead className="bg-white/90">
            <tr>
              <th className="px-6 py-4 text-left font-normal text-gray-500 text-base tracking-tight" style={{ fontWeight: 400 }}>Service</th>
              <th className="px-6 py-4 text-right font-normal text-gray-500 text-base tracking-tight" style={{ fontWeight: 400 }}>Price</th>
              <th className="px-6 py-4 text-left font-normal text-gray-500 text-base tracking-tight" style={{ fontWeight: 400 }}>Unit</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="even:bg-gray-50 odd:bg-white">
                <td className="px-6 py-4 text-gray-800 font-normal text-base tracking-tight whitespace-nowrap" style={{ fontWeight: 400 }}>{item.service}</td>
                <td className="px-6 py-4 text-right font-normal text-gray-900 text-base tracking-tight whitespace-nowrap" style={{ fontWeight: 400 }}>{item.price}</td>
                <td className="px-6 py-4 text-gray-500 font-normal text-base tracking-tight whitespace-nowrap" style={{ fontWeight: 400 }}>{item.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-laundry-blue text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Pricing</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Competitive rates for all your laundry needs
            </p>
          </div>
        </section>

        {/* Pricing Tables */}
        <section className="py-16 bg-gradient-to-b from-laundry-blue/10 via-white to-transparent">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <PriceTable title="Wash & Fold Pricing" items={washFoldPricing} />
              <PriceTable title="Specialty Items" items={specialItemsPricing} />
            </div>
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-lg text-center mt-12 glass-card">
              <p className="text-gray-700 mb-4 font-normal font-['Open Sans']" style={{ fontWeight: 400 }}>
                <span className="font-normal">Note:</span> Prices may vary depending on specific requirements. Please contact us for a precise quote.
              </p>
              <p className="text-gray-700 font-normal font-['Open Sans']" style={{ fontWeight: 400 }}>
                <span className="font-normal">Free pickup and delivery</span> within our service area!
              </p>
            </div>
            <div className="text-center mt-12">
              <h3 className="text-xl mb-4 font-normal font-['Inter'] text-gray-800 tracking-tight" style={{ fontWeight: 400 }}>Ready to get started?</h3>
              <p className="text-gray-600 mb-6 font-normal font-['Open Sans']" style={{ fontWeight: 400 }}>Experience our quality service today.</p>
              <Link to="/request" className="btn-primary font-normal font-['Inter']" style={{ fontWeight: 400 }}>
                Request Pickup
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
