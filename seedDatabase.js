require("dotenv").config();
const mongoose = require("mongoose");
const CelestialBody = require("./models/CelestialBody");
const seedData = require("./SEED_DATA.json");

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");

        // Clear existing data
        await CelestialBody.deleteMany({});
        console.log("🗑️  Cleared existing celestial bodies");

        // Insert seed data
        const inserted = await CelestialBody.insertMany(seedData);
        console.log(`✅ Successfully inserted ${inserted.length} celestial bodies`);

        // Display summary
        const summary = await CelestialBody.aggregate([
            {
                $group: {
                    _id: "$type",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        console.log("\n📊 Database Summary:");
        summary.forEach(item => {
            console.log(`   ${item._id}: ${item.count}`);
        });

        console.log(`\n🎉 Total: ${inserted.length} celestial bodies`);
        console.log("\n✨ Database seeding complete!");

        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding database:", error.message);
        process.exit(1);
    }
};

seedDatabase();
