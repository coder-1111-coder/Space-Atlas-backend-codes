require("dotenv").config();
const { MongoClient } = require("mongodb");

// EXACT Atlas connection string as specified
const ATLAS_URI = "mongodb+srv://<db_username>:<db_password>@spaceatlas.trm5h10.mongodb.net/SpaceAtlasDB?retryWrites=true&w=majority&appName=SpaceAtlas";

// Helper function to generate slug
const generateSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
};

// 8 Planets with real data
const planets = [
    {
        name: "Mercury",
        slug: generateSlug("Mercury"),
        type: "Planet",
        description: "Mercury is the smallest planet in our Solar System and the closest to the Sun. It has a heavily cratered surface similar to Earth's Moon and experiences extreme temperature variations between day and night.",
        discoveredBy: "Known since ancient times",
        discoveryDate: null,
        imageUrl: "https://science.nasa.gov/wp-content/uploads/2023/09/mercury-messenger-globe-pia15162.jpg",
        scientificFacts: {
            radius_km: 2439.7,
            mass_kg: "3.3011e23",
            gravity_m_s2: 3.7,
            orbital_period_days: 88,
            temperature_range_c: "-173 to 427",
            atmosphere: "Trace amounts of oxygen, sodium, hydrogen, helium, potassium"
        }
    },
    {
        name: "Venus",
        slug: generateSlug("Venus"),
        type: "Planet",
        description: "Venus is the second planet from the Sun and Earth's closest planetary neighbor. Often called Earth's twin due to similar size and mass, Venus has a thick, toxic atmosphere filled with carbon dioxide and is the hottest planet in our solar system.",
        discoveredBy: "Known since ancient times",
        discoveryDate: null,
        imageUrl: "https://science.nasa.gov/wp-content/uploads/2023/09/venus-mariner-10-pia23791.jpg",
        scientificFacts: {
            radius_km: 6051.8,
            mass_kg: "4.8675e24",
            gravity_m_s2: 8.87,
            orbital_period_days: 225,
            temperature_range_c: "462 (average)",
            atmosphere: "96.5% CO₂, 3.5% nitrogen, traces of sulfur dioxide"
        }
    },
    {
        name: "Earth",
        slug: generateSlug("Earth"),
        type: "Planet",
        description: "Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 71% of Earth's surface is covered with water, and the atmosphere is rich in nitrogen and oxygen.",
        discoveredBy: "N/A",
        discoveryDate: null,
        imageUrl: "https://science.nasa.gov/wp-content/uploads/2023/09/blue-marble-apollo-17-pia00122.jpg",
        scientificFacts: {
            radius_km: 6371,
            mass_kg: "5.972e24",
            gravity_m_s2: 9.807,
            orbital_period_days: 365.25,
            temperature_range_c: "-88 to 58",
            atmosphere: "78% nitrogen, 21% oxygen, 1% argon, traces of CO₂"
        }
    },
    {
        name: "Mars",
        slug: generateSlug("Mars"),
        type: "Planet",
        description: "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System. Known as the Red Planet due to iron oxide on its surface, Mars has polar ice caps, seasons, and evidence suggests it once had liquid water.",
        discoveredBy: "Known since ancient times",
        discoveryDate: null,
        imageUrl: "https://science.nasa.gov/wp-content/uploads/2023/09/mars-full-globe-pia16800.jpg",
        scientificFacts: {
            radius_km: 3389.5,
            mass_kg: "6.4171e23",
            gravity_m_s2: 3.721,
            orbital_period_days: 687,
            temperature_range_c: "-125 to 20",
            atmosphere: "95% CO₂, 2.8% nitrogen, 2% argon"
        }
    },
    {
        name: "Jupiter",
        slug: generateSlug("Jupiter"),
        type: "Planet",
        description: "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It's a gas giant with a mass more than twice that of all other planets combined. Jupiter's Great Red Spot is a giant storm that has raged for hundreds of years.",
        discoveredBy: "Known since ancient times",
        discoveryDate: null,
        imageUrl: "https://science.nasa.gov/wp-content/uploads/2023/09/jupiter-marble-pia22946.jpg",
        scientificFacts: {
            radius_km: 69911,
            mass_kg: "1.8982e27",
            gravity_m_s2: 24.79,
            orbital_period_days: 4333,
            temperature_range_c: "-145 (cloud tops)",
            atmosphere: "90% hydrogen, 10% helium, traces of methane, ammonia"
        }
    },
    {
        name: "Saturn",
        slug: generateSlug("Saturn"),
        type: "Planet",
        description: "Saturn is the sixth planet from the Sun and the second-largest in the Solar System. It's best known for its spectacular ring system, made of ice particles, rocky debris, and dust. Saturn is a gas giant with the lowest density of all planets.",
        discoveredBy: "Known since ancient times",
        discoveryDate: null,
        imageUrl: "https://science.nasa.gov/wp-content/uploads/2023/09/saturn-cassini-pia21046.jpg",
        scientificFacts: {
            radius_km: 58232,
            mass_kg: "5.6834e26",
            gravity_m_s2: 10.44,
            orbital_period_days: 10759,
            temperature_range_c: "-178 (cloud tops)",
            atmosphere: "96% hydrogen, 3% helium, traces of methane, ammonia"
        }
    },
    {
        name: "Uranus",
        slug: generateSlug("Uranus"),
        type: "Planet",
        description: "Uranus is the seventh planet from the Sun and has the third-largest diameter in our Solar System. It's an ice giant with a blue-green color due to methane in its atmosphere. Uranus rotates on its side, with an axial tilt of 98 degrees.",
        discoveredBy: "William Herschel",
        discoveryDate: new Date("1781-03-13"),
        imageUrl: "https://science.nasa.gov/wp-content/uploads/2023/09/uranus-voyager-2-pia18182.jpg",
        scientificFacts: {
            radius_km: 25362,
            mass_kg: "8.6810e25",
            gravity_m_s2: 8.69,
            orbital_period_days: 30687,
            temperature_range_c: "-224 (cloud tops)",
            atmosphere: "83% hydrogen, 15% helium, 2% methane"
        }
    },
    {
        name: "Neptune",
        slug: generateSlug("Neptune"),
        type: "Planet",
        description: "Neptune is the eighth and farthest known planet from the Sun in the Solar System. It's an ice giant with the strongest winds in the solar system, reaching speeds of 2,100 km/h. Neptune has a dynamic atmosphere with large storms.",
        discoveredBy: "Johann Galle and Urbain Le Verrier",
        discoveryDate: new Date("1846-09-23"),
        imageUrl: "https://science.nasa.gov/wp-content/uploads/2023/09/neptune-voyager-2-pia01492.jpg",
        scientificFacts: {
            radius_km: 24622,
            mass_kg: "1.02413e26",
            gravity_m_s2: 11.15,
            orbital_period_days: 60190,
            temperature_range_c: "-214 (cloud tops)",
            atmosphere: "80% hydrogen, 19% helium, 1.5% methane"
        }
    }
];

async function writeToAtlas() {
    let client;

    console.log("\n🛰️  ATLAS WRITE AGENT - STARTING REAL MONGODB OPERATIONS\n");
    console.log("=".repeat(70));

    try {
        // Step 1: Replace credentials
        console.log("\n📡 Step 1: Preparing connection...");

        const username = process.env.ATLAS_USERNAME || "admin";
        const password = process.env.ATLAS_PASSWORD || "password";

        const uri = ATLAS_URI
            .replace("<db_username>", username)
            .replace("<db_password>", password);

        console.log(`   Using credentials: ${username} / ${"*".repeat(password.length)}`);

        // Step 2: Connect to Atlas
        console.log("\n🔌 Step 2: Connecting to MongoDB Atlas...");
        console.log(`   Target: spaceatlas.trm5h10.mongodb.net`);

        client = new MongoClient(uri);
        await client.connect();

        // Verify connection
        const adminDb = client.db().admin();
        const serverInfo = await adminDb.serverInfo();

        console.log("✅ Connected to Atlas successfully!");
        console.log(`   MongoDB Version: ${serverInfo.version}`);

        // Step 3: Select database
        console.log("\n📊 Step 3: Selecting database...");
        const db = client.db("SpaceAtlasDB");
        console.log(`   Database: ${db.databaseName}`);

        // Verify we're connected to the right database
        if (db.databaseName !== "SpaceAtlasDB") {
            throw new Error(`ERROR: Connected to wrong database: ${db.databaseName}. Expected: SpaceAtlasDB`);
        }

        // Step 4: Get/Create collection
        console.log("\n🌠 Step 4: Accessing collection...");
        const collection = db.collection("celestialbodies");
        console.log(`   Collection: celestialbodies`);

        // Check if collection exists
        const collections = await db.listCollections({ name: "celestialbodies" }).toArray();
        if (collections.length > 0) {
            console.log("   ℹ️  Collection already exists (keeping existing data)");
        } else {
            console.log("   ✨ Collection will be created on first insert");
        }

        // Step 5: Insert planets
        console.log("\n🌎 Step 5: Inserting 8 planets into Atlas...");
        console.log(`   Preparing ${planets.length} documents...`);

        // Show what we're inserting
        planets.forEach((planet, index) => {
            console.log(`   ${index + 1}. ${planet.name} (${planet.slug})`);
        });

        console.log("\n   Executing insertMany()...");
        const result = await collection.insertMany(planets);

        console.log(`✅ Inserted documents count: ${result.insertedCount}`);
        console.log(`   Inserted IDs: ${Object.keys(result.insertedIds).length} documents`);

        // Step 6: Verify insertion
        console.log("\n🔎 Step 6: Verifying insertion...");
        const count = await collection.countDocuments();
        console.log(`   Total documents now: ${count}`);

        if (count < planets.length) {
            console.warn(`   ⚠️  Warning: Expected at least ${planets.length} documents, found ${count}`);
        }

        // Show sample documents
        console.log("\n📄 Sample documents from Atlas:");
        const samples = await collection.find().limit(3).toArray();
        samples.forEach((doc, index) => {
            console.log(`   ${index + 1}. ${doc.name} (${doc.type}) - ID: ${doc._id}`);
        });

        // Step 7: Success message
        console.log("\n" + "=".repeat(70));
        console.log("🎉 SUCCESS!");
        console.log("=".repeat(70));
        console.log("\n✔ MongoDB Atlas connection verified");
        console.log(`✔ Connected to: spaceatlas.trm5h10.mongodb.net`);
        console.log(`✔ Database: SpaceAtlasDB`);
        console.log("✔ celestialbodies collection updated");
        console.log(`✔ ${result.insertedCount} entries inserted successfully`);
        console.log(`✔ Total documents in collection: ${count}`);
        console.log("\n📍 Check Atlas → Data Explorer → SpaceAtlasDB → celestialbodies");
        console.log("\n🚀 Your Space Atlas database is live on MongoDB Atlas!\n");

    } catch (error) {
        console.error("\n" + "=".repeat(70));
        console.error("❌ ERROR OCCURRED");
        console.error("=".repeat(70));

        if (error.message.includes("authentication failed") || error.message.includes("bad auth")) {
            console.error("\n🔒 AUTHENTICATION FAILED");
            console.error("\n📝 Instructions:");
            console.error("   1. Check ATLAS_USERNAME in .env file");
            console.error("   2. Check ATLAS_PASSWORD in .env file");
            console.error("   3. Verify user exists in MongoDB Atlas");
            console.error("   4. Ensure user has read/write permissions on SpaceAtlasDB");

        } else if (error.message.includes("ENOTFOUND") || error.message.includes("ETIMEDOUT")) {
            console.error("\n🌐 NETWORK CONNECTION FAILED");
            console.error("\n📝 Instructions:");
            console.error("   1. Check your internet connection");
            console.error("   2. Go to MongoDB Atlas → Network Access");
            console.error("   3. Add IP Address: 0.0.0.0/0 (for testing)");
            console.error("   4. Ensure cluster is running");

        } else if (error.message.includes("IP whitelist")) {
            console.error("\n🚫 IP NOT WHITELISTED");
            console.error("\n📝 Instructions:");
            console.error("   1. Go to MongoDB Atlas → Network Access");
            console.error("   2. Click 'Add IP Address'");
            console.error("   3. Add: 0.0.0.0/0 (allows all IPs for testing)");
            console.error("   4. Wait 1-2 minutes for changes to apply");

        } else {
            console.error(`\n⚠️  ${error.name}: ${error.message}`);
            console.error("\nFull error:");
            console.error(error);
        }

        console.error("\n" + "=".repeat(70));
        process.exit(1);

    } finally {
        if (client) {
            await client.close();
            console.log("🔌 Connection closed\n");
        }
    }
}

// Execute the write operation
writeToAtlas();
