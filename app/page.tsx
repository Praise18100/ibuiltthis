import FeaturedProducts from "@/components/Landing-page/featured-products";
import HeroSection from "@/components/Landing-page/hero-section";
import RecentlyLaunchedProducts from "@/components/Landing-page/recently-launched-products";
import ProductSkeleton from "@/components/products/product-skeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <HeroSection />

      <FeaturedProducts />

      <Suspense fallback={<ProductSkeleton />}>
        <RecentlyLaunchedProducts />
      </Suspense>
    </div>
  );
}