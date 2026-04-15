//import all necessary components
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { products } from "./schema";
import { allProducts } from "./data";

//to connect the database object to the databasde url
const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await db.delete(products);
  console.log("✅ Cleared existing data");

  // Insert products from data.ts(to loop through)
  for (const product of allProducts) {
    await db.insert(products).values({
      name: product.name,
      slug: product.slug,
      tagline: product.tagline,
      description: product.description,
      websiteUrl: product.websiteUrl,
      tags: product.tags,
      voteCount: product.voteCount || 0,
      createdAt: product.createdAt,
      approvedAt: product.approvedAt,
      status: product.status,
      submittedBy: product.submittedBy,
    });

    console.log(
      `✅ Added product: ${product.name} (${product.voteCount || 0} votes)`
    );
  }

  // Verify inserted products
  const insertedProducts = await db.select().from(products);
  console.log(`\n🎉 Successfully seeded ${insertedProducts.length} products!`);

  console.log("\n📦 Products in database:");
  insertedProducts.forEach((product) => {
    console.log(
      `  - ${product.name} (${product.slug}) - ${product.voteCount} votes`
    );
  });
}

main()
  .catch((error) => {//if there is an error, exit and display the error
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  })
  .finally(() => {// when the seeding is complete, exit the process
    console.log("\n✨ Seeding complete!");
    process.exit(0);
  });