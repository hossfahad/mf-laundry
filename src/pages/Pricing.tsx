
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Pricing = () => {
  const washFoldPricing = [
    { service: "Regular Laundry (Wash, Dry & Fold)", price: "$1.75", unit: "per lb" },
    { service: "Comforters (Queen/King)", price: "$25.00", unit: "each" },
    { service: "Comforters (Twin/Full)", price: "$20.00", unit: "each" },
    { service: "Blankets", price: "$15.00", unit: "each" },
    { service: "Bed Sheets (Set)", price: "$12.00", unit: "set" },
    { service: "Rush Service (Same Day)", price: "+$10.00", unit: "additional" },
  ];
  
  const dryCleaningPricing = [
    { service: "Shirts/Blouses", price: "$6.50", unit: "each" },
    { service: "Pants/Slacks", price: "$7.50", unit: "each" },
    { service: "Suits (2pc)", price: "$18.00", unit: "each" },
    { service: "Dresses (Simple)", price: "$14.00", unit: "each" },
    { service: "Dresses (Formal)", price: "From $20.00", unit: "each" },
    { service: "Coats/Jackets", price: "From $15.00", unit: "each" },
  ];
  
  const alterationsPricing = [
    { service: "Hem Pants/Skirts", price: "$12.00", unit: "each" },
    { service: "Take in/out Waist", price: "$16.00", unit: "each" },
    { service: "Shorten Sleeves", price: "$15.00", unit: "each" },
    { service: "Replace Zipper", price: "From $18.00", unit: "each" },
    { service: "Patch/Repair", price: "From $10.00", unit: "each" },
  ];
  
  const selfServicePricing = [
    { service: "Washer (Small Load)", price: "$3.50", unit: "per cycle" },
    { service: "Washer (Medium Load)", price: "$5.50", unit: "per cycle" },
    { service: "Washer (Large Load)", price: "$7.50", unit: "per cycle" },
    { service: "Dryer", price: "$0.50", unit: "per 5 minutes" },
    { service: "Detergent", price: "$1.00", unit: "per packet" },
    { service: "Fabric Softener", price: "$1.00", unit: "per packet" },
  ];
  
  const PriceTable = ({ title, items }: { title: string; items: { service: string; price: string; unit: string }[] }) => (
    <div className="mb-12">
      <h3 className="text-2xl font-bold mb-6">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-laundry-blue text-white">
            <tr>
              <th className="px-6 py-3 text-left">Service</th>
              <th className="px-6 py-3 text-right">Price</th>
              <th className="px-6 py-3 text-left">Unit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-laundry-lightGray'}>
                <td className="px-6 py-4">{item.service}</td>
                <td className="px-6 py-4 text-right font-medium">{item.price}</td>
                <td className="px-6 py-4 text-gray-500">{item.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
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
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <PriceTable title="Wash & Fold Services" items={washFoldPricing} />
            <PriceTable title="Dry Cleaning Services" items={dryCleaningPricing} />
            <PriceTable title="Alterations & Tailoring" items={alterationsPricing} />
            <PriceTable title="Self-Service" items={selfServicePricing} />
            
            <div className="bg-laundry-lightGray p-6 rounded-lg text-center mt-12">
              <p className="text-gray-700 mb-4">
                <span className="font-bold">Note:</span> Prices may vary depending on specific requirements. Please contact us for a precise quote.
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Free pickup and delivery</span> within our service area!
              </p>
            </div>
            
            <div className="text-center mt-12">
              <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
              <p className="text-gray-600 mb-6">Experience our quality service today.</p>
              <Link to="/request" className="btn-primary">
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
