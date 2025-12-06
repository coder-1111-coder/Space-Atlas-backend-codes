const { MongoClient } = require("mongodb");

// EXACT Atlas connection string with provided credentials
const ATLAS_URI = "mongodb+srv://rachanuser:da5ysAvwXwNQsh8X@spaceatlas.trm5h10.mongodb.net/SpaceAtlasDB?retryWrites=true&w=majority&appName=SpaceAtlas";

// 🌎 PLANETS (8)
const planets = [
    { name: "Mercury", slug: "mercury", type: "Planet", description: "The smallest planet and the closest to the Sun.", discoveredBy: "Ancient astronomers", discoveryDate: new Date("0001-01-01"), imageUrl: "https://space-facts.com/wp-content/uploads/mercury.png" },
    { name: "Venus", slug: "venus", type: "Planet", description: "A toxic, hot world with an extremely dense atmosphere.", discoveredBy: "Ancient astronomers", discoveryDate: new Date("0001-01-01"), imageUrl: "https://space-facts.com/wp-content/uploads/venus.png" },
    { name: "Earth", slug: "earth", type: "Planet", description: "The only known world to support life.", discoveredBy: "N/A", discoveryDate: new Date("0001-01-01"), imageUrl: "https://space-facts.com/wp-content/uploads/earth.png" },
    { name: "Mars", slug: "mars", type: "Planet", description: "The Red Planet, home to Olympus Mons and Vallis Marineris.", discoveredBy: "Ancient astronomers", discoveryDate: new Date("0001-01-01"), imageUrl: "https://space-facts.com/wp-content/uploads/mars.png" },
    { name: "Jupiter", slug: "jupiter", type: "Planet", description: "The largest planet with a massive storm called the Great Red Spot.", discoveredBy: "Ancient astronomers", discoveryDate: new Date("0001-01-01"), imageUrl: "https://space-facts.com/wp-content/uploads/jupiter.png" },
    { name: "Saturn", slug: "saturn", type: "Planet", description: "Known for its spectacular ring system.", discoveredBy: "Ancient astronomers", discoveryDate: new Date("0001-01-01"), imageUrl: "https://space-facts.com/wp-content/uploads/saturn.png" },
    { name: "Uranus", slug: "uranus", type: "Planet", description: "An ice giant tilted sideways with extreme seasons.", discoveredBy: "William Herschel", discoveryDate: new Date("1781-03-13"), imageUrl: "https://space-facts.com/wp-content/uploads/uranus.png" },
    { name: "Neptune", slug: "neptune", type: "Planet", description: "An ice giant with supersonic winds.", discoveredBy: "Johann Galle", discoveryDate: new Date("1846-09-23"), imageUrl: "https://space-facts.com/wp-content/uploads/neptune.png" }
];

// 🌙 MOONS (5)
const moons = [
    { name: "Moon", slug: "moon", type: "Moon", description: "Earth's only natural satellite.", discoveredBy: "N/A", discoveryDate: new Date("0001-01-01"), imageUrl: "https://space-facts.com/wp-content/uploads/moon.png" },
    { name: "Europa", slug: "europa", type: "Moon", description: "An icy moon of Jupiter with a possible subsurface ocean.", discoveredBy: "Galileo Galilei", discoveryDate: new Date("1610-01-08"), imageUrl: "https://space-facts.com/wp-content/uploads/europa.png" },
    { name: "Ganymede", slug: "ganymede", type: "Moon", description: "The largest moon in the solar system.", discoveredBy: "Galileo Galilei", discoveryDate: new Date("1610-01-07"), imageUrl: "https://space-facts.com/wp-content/uploads/ganymede.png" },
    { name: "Titan", slug: "titan", type: "Moon", description: "Saturn's largest moon with lakes of liquid methane.", discoveredBy: "Christiaan Huygens", discoveryDate: new Date("1655-03-25"), imageUrl: "https://space-facts.com/wp-content/uploads/titan.png" },
    { name: "Enceladus", slug: "enceladus", type: "Moon", description: "An icy moon with water plumes and possible habitability.", discoveredBy: "William Herschel", discoveryDate: new Date("1789-08-28"), imageUrl: "https://space-facts.com/wp-content/uploads/enceladus.png" }
];

// 🪐 DWARF PLANETS (5)
const dwarfPlanets = [
    { name: "Pluto", slug: "pluto", type: "Dwarf Planet", description: "A distant icy world once considered the ninth planet.", discoveredBy: "Clyde Tombaugh", discoveryDate: new Date("1930-02-18"), imageUrl: "https://space-facts.com/wp-content/uploads/pluto.png" },
    { name: "Ceres", slug: "ceres", type: "Dwarf Planet", description: "The largest object in the asteroid belt.", discoveredBy: "Giuseppe Piazzi", discoveryDate: new Date("1801-01-01"), imageUrl: "https://space-facts.com/wp-content/uploads/ceres.png" },
    { name: "Haumea", slug: "haumea", type: "Dwarf Planet", description: "An elongated dwarf planet with fast rotation.", discoveredBy: "Brown et al.", discoveryDate: new Date("2004-12-28"), imageUrl: "https://space-facts.com/wp-content/uploads/haumea.png" },
    { name: "Makemake", slug: "makemake", type: "Dwarf Planet", description: "A bright Kuiper belt object discovered around Easter.", discoveredBy: "Michael Brown", discoveryDate: new Date("2005-03-31"), imageUrl: "https://space-facts.com/wp-content/uploads/makemake.png" },
    { name: "Eris", slug: "eris", type: "Dwarf Planet", description: "A massive dwarf planet that led to Pluto's demotion.", discoveredBy: "Michael Brown", discoveryDate: new Date("2005-01-05"), imageUrl: "https://space-facts.com/wp-content/uploads/eris.png" }
];

// ☄️ COMETS (3)
const comets = [
    { name: "Halley's Comet", slug: "halleys-comet", type: "Comet", description: "The most famous periodic comet.", discoveredBy: "Edmond Halley", discoveryDate: new Date("1758-12-25"), imageUrl: "https://space-facts.com/wp-content/uploads/halley.png" },
    { name: "Comet NEOWISE", slug: "comet-neowise", type: "Comet", description: "A bright long-period comet visible in 2020.", discoveredBy: "WISE Telescope", discoveryDate: new Date("2020-03-27"), imageUrl: "https://space-facts.com/wp-content/uploads/neowise.png" },
    { name: "Hale–Bopp", slug: "hale-bopp", type: "Comet", description: "One of the brightest comets of the 20th century.", discoveredBy: "Alan Hale & Thomas Bopp", discoveryDate: new Date("1995-07-23"), imageUrl: "https://space-facts.com/wp-content/uploads/halebopp.png" }
];

// 🪨 ASTEROIDS (3)
const asteroids = [
    { name: "Vesta", slug: "vesta", type: "Asteroid", description: "One of the largest asteroids in the asteroid belt.", discoveredBy: "Heinrich Olbers", discoveryDate: new Date("1807-03-29"), imageUrl: "https://space-facts.com/wp-content/uploads/vesta.png" },
    { name: "Bennu", slug: "bennu", type: "Asteroid", description: "Target of NASA's OSIRIS-REx sample return mission.", discoveredBy: "LINEAR", discoveryDate: new Date("1999-09-11"), imageUrl: "https://space-facts.com/wp-content/uploads/bennu.png" },
    { name: "Pallas", slug: "pallas", type: "Asteroid", description: "A large and highly inclined asteroid.", discoveredBy: "Heinrich Olbers", discoveryDate: new Date("1802-03-28"), imageUrl: "https://space-facts.com/wp-content/uploads/pallas.png" }
];

async function writeToAtlas() {
    let client;

    console.log("\n🛰️  ATLAS WRITE AGENT - REAL MONGODB OPERATIONS\n");
    console.log("=".repeat(70));

    try {
        console.log("\n🔌 Connecting to MongoDB Atlas...");
        console.log("   Target: spaceatlas.trm5h10.mongodb.net");
        console.log("   Database: SpaceAtlasDB");

        client = new MongoClient(ATLAS_URI);
        await client.connect();

        console.log("✅ Connected to MongoDB Atlas");
        console.log(`   Host: spaceatlas.trm5h10.mongodb.net`);

        const db = client.db("SpaceAtlasDB");
        console.log(`   Database: ${db.databaseName}`);

        const collection = db.collection("celestialbodies");
        console.log("   Collection: celestialbodies");

        console.log("\n🧪 Preparing celestial objects...");
        const allBodies = [...planets, ...moons, ...dwarfPlanets, ...comets, ...asteroids];

        console.log(`   Total objects: ${allBodies.length}`);
        console.log(`   - Planets: ${planets.length}`);
        console.log(`   - Moons: ${moons.length}`);
        console.log(`   - Dwarf Planets: ${dwarfPlanets.length}`);
        console.log(`   - Comets: ${comets.length}`);
        console.log(`   - Asteroids: ${asteroids.length}`);

        console.log("\n📥 Inserting all objects into Atlas...");
        const result = await collection.insertMany(allBodies);

        console.log(`✅ Inserted documents count: ${result.insertedCount}`);

        console.log("\n🔍 Verifying insertion...");
        const count = await collection.countDocuments();
        console.log(`   Total documents now: ${count}`);

        console.log("\n" + "=".repeat(70));
        console.log("🎉 SUCCESS!");
        console.log("=".repeat(70));
        console.log("\n✔ MongoDB Atlas connection verified");
        console.log("✔ celestialbodies collection updated");
        console.log(`✔ ${result.insertedCount} celestial objects inserted successfully`);
        console.log("\n📍 Check Atlas → Data Explorer → SpaceAtlasDB → celestialbodies\n");

    } catch (error) {
        console.error("\n❌ ERROR:", error.message);
        if (error.message.includes("IP")) {
            console.error("\n📝 Add 0.0.0.0/0 to Network Access in MongoDB Atlas");
        }
        process.exit(1);
    } finally {
        if (client) {
            await client.close();
            console.log("🔌 Connection closed\n");
        }
    }
}

writeToAtlas();
