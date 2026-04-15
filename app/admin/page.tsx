//import all necessary components
import AdminProductCard from "@/components/admin/admin-product-card";
import StatsCard from "@/components/admin/stats-card";
import EmptyState from "@/components/common/empty-state";
import SectionHeader from "@/components/common/section-header";
import { getAllProducts } from "@/lib/products/product-select";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { InboxIcon, ShieldIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function AdminPage() { 
  //(async) - allow the page to load it data from the database before the UI
  const { userId } = await auth();// to get the current userID

  //if no userID redirect to signin page
  if (!userId) {
    redirect("/sign-in");
  }

  //get all users from clerk
  const response = await clerkClient();
  const user = await response.users.getUser(userId!);

  const metadata = user.publicMetadata;
  const isAdmin = metadata?.isAdmin ?? false; //check if the user is an admin, if not - false

  //if not an admin redirect to home
  if (!isAdmin) {
    redirect("/");
  }
  const allProducts = await getAllProducts(); //get all products from the database
  const approvedProducts = allProducts.filter(
    (product) => product.status === "approved" //get only approved products from the database
  );
  const pendingProducts = allProducts.filter(
    (product) => product.status === "pending" //get only pending products from the database
  );
  const rejectedProducts = allProducts.filter(
    (product) => product.status === "rejected" //get only rejected products from the database
  );
  return (
    <div className="py-20">
      <div className="wrapper">
        <div className="mb-12">
          <SectionHeader
            title="Product Admin"
            icon={ShieldIcon}
            description="Review and manage submitted products"
          />
        </div>
        <StatsCard // to display the count of every product
          approved={approvedProducts.length}
          pending={pendingProducts.length}
          rejected={rejectedProducts.length}
          all={allProducts.length}
        />

        <section className="my-12">
          <div className="section-header-with-count">
            <h2 className="text-2xl font-bold">
              Pending Products ({pendingProducts.length})
            </h2>
          </div>
          <div className="space-y-4">
            {pendingProducts.length === 0 && (
              <EmptyState
                message="No pending products to review"
                icon={InboxIcon}
              />
            )}
            {/* to loop through and display pending products */}
            {pendingProducts.map((product) => (
              <AdminProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="my-12">
          <div className="section-header-with-count">
            <h2 className="text-2xl font-bold">All Products</h2>
          </div>
          <div className="space-y-4">
            {allProducts.map((product) => (
              <AdminProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}