import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Pricing = () => {
  const washFoldPricing = [
    { service: "11 lbs", price: "$15.27", unit: "total" },
    { service: "12 lbs", price: "$16.54", unit: "total" },
    { service: "13 lbs", price: "$17.81", unit: "total" },
    { service: "14 lbs", price: "$19.08", unit: "total" },
    { service: "15 lbs", price: "$20.35", unit: "total" },
    { service: "16 lbs", price: "$21.62", unit: "total" },
    { service: "17 lbs", price: "$22.89", unit: "total" },
    { service: "18 lbs", price: "$24.16", unit: "total" },
    { service: "19 lbs", price: "$25.43", unit: "total" },
    { service: "20 lbs", price: "$26.70", unit: "total" },
    { service: "21 lbs", price: "$27.97", unit: "total" },
    { service: "22 lbs", price: "$29.24", unit: "total" },
    { service: "23 lbs", price: "$30.51", unit: "total" },
    { service: "24 lbs", price: "$31.78", unit: "total" },
    { service: "25 lbs", price: "$33.05", unit: "total" },
    { service: "26 lbs", price: "$34.32", unit: "total" },
    { service: "27 lbs", price: "$35.59", unit: "total" },
    { service: "28 lbs", price: "$36.86", unit: "total" },
    { service: "29 lbs", price: "$38.13", unit: "total" },
    { service: "30 lbs", price: "$39.40", unit: "total" },
    { service: "31 lbs", price: "$40.67", unit: "total" },
    { service: "32 lbs", price: "$41.94", unit: "total" },
    { service: "33 lbs", price: "$43.21", unit: "total" },
    { service: "34 lbs", price: "$44.48", unit: "total" },
    { service: "35 lbs", price: "$45.75", unit: "total" },
    { service: "36 lbs", price: "$47.02", unit: "total" },
    { service: "37 lbs", price: "$48.29", unit: "total" },
    { service: "38 lbs", price: "$49.56", unit: "total" },
    { service: "39 lbs", price: "$50.83", unit: "total" },
    { service: "40 lbs", price: "$52.10", unit: "total" },
    { service: "41 lbs", price: "$53.37", unit: "total" },
    { service: "42 lbs", price: "$54.64", unit: "total" },
    { service: "43 lbs", price: "$55.91", unit: "total" },
    { service: "44 lbs", price: "$57.18", unit: "total" },
    { service: "45 lbs", price: "$58.45", unit: "total" },
    { service: "46 lbs", price: "$59.72", unit: "total" },
    { service: "47 lbs", price: "$60.99", unit: "total" },
    { service: "48 lbs", price: "$62.26", unit: "total" },
    { service: "49 lbs", price: "$63.53", unit: "total" },
    { service: "50 lbs", price: "$64.80", unit: "total" },
    { service: "51 lbs", price: "$66.07", unit: "total" },
    { service: "52 lbs", price: "$67.34", unit: "total" },
    { service: "53 lbs", price: "$68.61", unit: "total" },
    { service: "54 lbs", price: "$69.88", unit: "total" },
    { service: "55 lbs", price: "$71.15", unit: "total" },
    { service: "56 lbs", price: "$72.42", unit: "total" },
    { service: "57 lbs", price: "$73.69", unit: "total" },
    { service: "58 lbs", price: "$74.96", unit: "total" },
    { service: "59 lbs", price: "$76.23", unit: "total" },
    { service: "60 lbs", price: "$77.50", unit: "total" },
    { service: "61 lbs", price: "$78.77", unit: "total" },
    { service: "62 lbs", price: "$80.04", unit: "total" },
    { service: "63 lbs", price: "$81.31", unit: "total" },
    { service: "64 lbs", price: "$82.58", unit: "total" },
    { service: "65 lbs", price: "$83.85", unit: "total" },
    { service: "66 lbs", price: "$85.12", unit: "total" },
    { service: "67 lbs", price: "$86.39", unit: "total" },
    { service: "68 lbs", price: "$87.66", unit: "total" },
    { service: "69 lbs", price: "$88.93", unit: "total" },
    { service: "70 lbs", price: "$90.20", unit: "total" },
    { service: "71 lbs", price: "$91.47", unit: "total" },
    { service: "72 lbs", price: "$92.74", unit: "total" },
    { service: "73 lbs", price: "$94.01", unit: "total" },
    { service: "74 lbs", price: "$95.28", unit: "total" },
    { service: "75 lbs", price: "$96.55", unit: "total" },
    { service: "76 lbs", price: "$97.82", unit: "total" },
    { service: "77 lbs", price: "$99.09", unit: "total" },
    { service: "78 lbs", price: "$100.36", unit: "total" },
    { service: "79 lbs", price: "$101.63", unit: "total" },
    { service: "80 lbs", price: "$102.90", unit: "total" },
    { service: "81 lbs", price: "$104.17", unit: "total" },
    { service: "82 lbs", price: "$105.44", unit: "total" },
    { service: "83 lbs", price: "$106.71", unit: "total" },
    { service: "84 lbs", price: "$107.98", unit: "total" },
    { service: "85 lbs", price: "$109.25", unit: "total" },
    { service: "86 lbs", price: "$110.52", unit: "total" },
    { service: "87 lbs", price: "$111.79", unit: "total" },
    { service: "88 lbs", price: "$113.06", unit: "total" },
    { service: "89 lbs", price: "$114.33", unit: "total" },
    { service: "90 lbs", price: "$115.60", unit: "total" },
    { service: "91 lbs", price: "$116.87", unit: "total" },
    { service: "92 lbs", price: "$118.14", unit: "total" },
    { service: "93 lbs", price: "$119.41", unit: "total" },
    { service: "94 lbs", price: "$120.68", unit: "total" },
    { service: "95 lbs", price: "$121.95", unit: "total" },
    { service: "96 lbs", price: "$123.22", unit: "total" },
    { service: "97 lbs", price: "$124.49", unit: "total" },
    { service: "98 lbs", price: "$125.76", unit: "total" },
    { service: "99 lbs", price: "$127.03", unit: "total" },
    { service: "100 lbs", price: "$128.30", unit: "total" },
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

  const selfServicePricing = [
    { service: "Washer (Small Load)", price: "$3.50", unit: "per cycle" },
    { service: "Washer (Medium Load)", price: "$4.75", unit: "per cycle" },
    { service: "Washer (Big Load)", price: "$6.00", unit: "per cycle" },
    { service: "Washer (Extra Big Load)", price: "$8.50", unit: "per cycle" },
    { service: "Dryer", price: "$0.25", unit: "per 7 minutes" },
  ];

  // Helper to chunk the washFoldPricing into 3 truly even columns
  function chunkEvenColumns<T>(arr: T[], n: number): T[][] {
    const base = Math.floor(arr.length / n);
    const rem = arr.length % n;
    let start = 0;
    return Array.from({ length: n }, (_, i) => {
      const size = base + (i < rem ? 1 : 0);
      const chunk = arr.slice(start, start + size);
      start += size;
      return chunk;
    });
  }

  const WashFoldMultiColTable = ({ items, collapsedRows = 12 }: { items: { service: string; price: string; unit: string }[]; collapsedRows?: number }) => {
    const [expanded, setExpanded] = useState(false);
    const columns = chunkEvenColumns(items, 3);
    // Determine the max number of rows in any column
    const maxRows = Math.max(...columns.map(col => col.length));
    // When collapsed, only show the first 'collapsedRows' rows per column
    const visibleColumns = expanded
      ? columns
      : columns.map(col => col.slice(0, collapsedRows));
    const showViewMore = !expanded && columns.some(col => col.length > collapsedRows);

    return (
      <section className="mb-4">
        <h3 className="text-xl mb-6 font-normal font-['Inter'] text-gray-800 tracking-tight" style={{ fontWeight: 400, letterSpacing: '-0.01em' }}>Wash & Fold Pricing</h3>
        <div className="w-full overflow-x-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 xl:gap-24 px-0 md:px-8 xl:px-24">
            {visibleColumns.map((col, idx) => (
              <table key={idx} className="w-full border-separate border-spacing-0 rounded-xl shadow-md bg-white/70 font-['Inter'] mx-auto">
                <thead className="bg-white/90">
                  <tr>
                    <th className="px-6 py-3 text-left font-normal text-gray-500 text-base tracking-tight" style={{ fontWeight: 400 }}>Pound</th>
                    <th className="px-6 py-3 text-right font-normal text-gray-500 text-base tracking-tight" style={{ fontWeight: 400 }}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {col.map((item, i) => (
                    <tr key={i} className="even:bg-gray-50 odd:bg-white">
                      <td className="px-6 py-3 text-gray-800 font-normal text-base tracking-tight whitespace-nowrap" style={{ fontWeight: 400 }}>{item.service.replace(' lbs', '')}</td>
                      <td className="px-6 py-3 text-right font-normal text-gray-900 text-base tracking-tight whitespace-nowrap" style={{ fontWeight: 400 }}>{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ))}
          </div>
        </div>
        {showViewMore && (
          <div className="flex justify-center mt-4">
            <button
              className="px-6 py-2 rounded-lg bg-laundry-blue text-white font-normal font-['Inter'] shadow hover:bg-laundry-blue/80 transition"
              style={{ fontWeight: 400 }}
              onClick={() => setExpanded(true)}
            >
              View More
            </button>
          </div>
        )}
      </section>
    );
  };

  const PriceTable = ({ title, items }: { title: string; items: { service: string; price: string; unit: string }[] }) => (
    <section className="mb-8">
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

  const CollapsibleTable = ({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
      <div className="mb-6 rounded-2xl shadow-md bg-white/80 overflow-hidden border border-gray-100">
        <button
          className="w-full flex items-center justify-between px-6 py-4 text-left font-['Inter'] text-lg text-gray-800 bg-gradient-to-r from-laundry-blue/10 via-white to-transparent hover:bg-laundry-blue/5 transition"
          style={{ fontWeight: 400, letterSpacing: '-0.01em' }}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <span>{title}</span>
          <span className={`transform transition-transform duration-300 ${open ? 'rotate-90' : 'rotate-0'}`}>▶</span>
        </button>
        <div
          className={`transition-all duration-500 ease-in-out ${open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
          style={{ background: 'white' }}
        >
          <div className="px-4 md:px-8 pb-6 pt-2">{children}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-laundry-blue text-white py-16">
          <div className="container mx-auto px-4 text-center flex flex-col items-center">
            <img src="/pexels-karolina-grabowska-4959868.jpg" alt="Laundry pricing" className="rounded-xl shadow-lg w-full max-w-md mb-8" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Pricing</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Competitive rates for all your laundry needs
            </p>
          </div>
        </section>

        {/* Pricing Tables */}
        <section className="py-16 bg-gradient-to-b from-laundry-blue/10 via-white to-transparent">
          <div className="container mx-auto px-4 max-w-7xl md:max-w-6xl xl:max-w-screen-xl">
            <CollapsibleTable title="Self-Service" defaultOpen={true}>
              <PriceTable title="" items={selfServicePricing} />
            </CollapsibleTable>
            <CollapsibleTable title="Wash & Fold Pricing">
              <WashFoldMultiColTable items={washFoldPricing} collapsedRows={12} />
            </CollapsibleTable>
            <CollapsibleTable title="Specialty Items">
              <PriceTable title="" items={specialItemsPricing} />
            </CollapsibleTable>
            <div className="bg-white/80 backdrop-blur-md p-6 rounded-lg text-center mt-12 glass-card">
              <p className="text-gray-700 mb-4 font-normal font-['Open Sans']" style={{ fontWeight: 400 }}>
                <span className="font-normal">Note:</span> Bed sheets and rush service are included in regular wash & fold pricing. Dry cleaning prices are being updated. Alteration prices vary and can be confirmed in store. Detergent & fabric softener prices vary and are not listed here.
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
