//to enable caching for this page - the result store after the first execution is stored and reused for subsequent reloading
"use cache";
//import all necessary components
import SectionHeader from "@/components/common/section-header";
import ProductExplorer from "@/components/products/product-explorer";
import { getAllApprovedProducts } from "@/lib/products/product-select";
import { CompassIcon } from "lucide-react";

  //(async) - allow the page to load it data from the database before the UI
export default async function ExplorePage() {
  const products = await getAllApprovedProducts();

  return (
    <div className="py-20">
      <div className="wrapper">
        <div className="mb-12">
          <SectionHeader
            title="Explore All Products"
            icon={CompassIcon}
            description="Browse and discover amazing projects from our community"
          />
        </div>
        {/* to display all the products */}
        <ProductExplorer products={products} /> 
      </div>
    </div>
  );
}
