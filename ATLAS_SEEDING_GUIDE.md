# 🛰️ MONGODB ATLAS DATABASE SEEDING GUIDE

## 📋 Overview

This guide will help you populate your MongoDB Atlas database with **24 comprehensive celestial objects** including real NASA data, scientific facts, and images.

---

## 🎯 What Gets Seeded

### Total: 24 Celestial Objects

- **8 Planets**: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune
- **5 Major Moons**: Moon, Europa, Titan, Ganymede, Enceladus
- **5 Dwarf Planets**: Pluto, Ceres, Makemake, Haumea, Eris
- **3 Comets**: Halley's Comet, Comet NEOWISE, Hale-Bopp
- **3 Asteroids**: Vesta, Bennu, Pallas

### Each Object Includes:

✅ **Name** - Official astronomical name  
✅ **Slug** - URL-friendly identifier (auto-generated)  
✅ **Type** - Planet, Moon, Dwarf Planet, Comet, or Asteroid  
✅ **Description** - Detailed NASA-sourced information  
✅ **Discovered By** - Historical discoverer  
✅ **Discovery Date** - ISO format date  
✅ **Image URL** - Real NASA image link  
✅ **Scientific Facts**:
  - Radius (km)
  - Mass (kg)
  - Surface gravity (m/s²)
  - Orbital period (days)
  - Temperature range (°C)
  - Atmospheric composition

---

## 🔧 Prerequisites

1. **MongoDB Atlas Account** (free tier works)
2. **Cluster Created** on MongoDB Atlas
3. **Database User** with read/write permissions
4. **IP Whitelist** configured (use `0.0.0.0/0` for testing)

---

## 📝 Setup Instructions

### Step 1: Get Your MongoDB Atlas Credentials

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Go to your cluster
3. Click **"Connect"** → **"Connect your application"**
4. Copy your connection string (should look like):
   ```
   mongodb+srv://<username>:<password>@spaceatlas.trm5h10.mongodb.net/...
   ```
5. Note your **username** and **password**

### Step 2: Configure Environment Variables

Open `.env` file in the root directory and update:

```bash
# MongoDB Atlas Credentials
ATLAS_USERNAME=your_actual_username
ATLAS_PASSWORD=your_actual_password
```

**Example:**
```bash
ATLAS_USERNAME=admin
ATLAS_PASSWORD=MySecurePass123
```

### Step 3: Whitelist Your IP Address

1. In MongoDB Atlas, go to **Network Access**
2. Click **"Add IP Address"**
3. For testing, add `0.0.0.0/0` (allows all IPs)
4. For production, add your specific IP

### Step 4: Run the Seeding Script

Execute the following command from the root directory:

```bash
node utils/seedAtlasDB.js
```

---

## 📊 Expected Output

You should see output like this:

```
🛰️  SPACE ATLAS DATABASE SEEDING INITIATED

============================================================

📡 Connecting to MongoDB Atlas...
✅ MongoDB Atlas connected successfully
📊 Database: SpaceAtlasDB

🗑️  Checking for existing collection...
ℹ️  No existing collection found

🔤 Generating slugs...

📥 Inserting celestial objects...
✅ 24 celestial objects inserted successfully

🔍 Validating database...
✅ Database validation complete: 24 documents found

📊 SUMMARY BY TYPE:
============================================================
   Planet          : 8
   Moon            : 5
   Dwarf Planet    : 5
   Comet           : 3
   Asteroid        : 3

📄 SAMPLE DOCUMENTS:
============================================================
   ✓ Mercury (Planet) → slug: mercury
   ✓ Venus (Planet) → slug: venus
   ✓ Earth (Planet) → slug: earth

============================================================
🎉 DATABASE SEEDING COMPLETE!
============================================================

✔ MongoDB Atlas connected
✔ SpaceAtlasDB initialized
✔ celestialbodies collection recreated
✔ 24 celestial objects inserted
✔ Database is ready for the frontend and admin panel

🚀 You can now run your Space Atlas application!
```

---

## 🔍 Verification

### Verify in MongoDB Atlas Dashboard

1. Go to your cluster in MongoDB Atlas
2. Click **"Browse Collections"**
3. You should see:
   - Database: `SpaceAtlasDB`
   - Collection: `celestialbodies`
   - Documents: 24

### Verify via API

Once your backend is running, test:

```bash
curl http://localhost:4000/api/bodies
```

You should get a JSON response with all 24 celestial objects.

---

## 🛠️ Troubleshooting

### Error: "Authentication Failed"

**Problem**: Incorrect username or password

**Solution**:
1. Double-check `ATLAS_USERNAME` and `ATLAS_PASSWORD` in `.env`
2. Ensure the user exists in MongoDB Atlas
3. Verify the user has read/write permissions

### Error: "Network Connection Failed"

**Problem**: IP not whitelisted or network issue

**Solution**:
1. Add `0.0.0.0/0` to IP whitelist in MongoDB Atlas
2. Check your internet connection
3. Verify your cluster is running

### Error: "Cannot connect to MongoDB"

**Problem**: Incorrect connection string

**Solution**:
1. Verify the cluster name in `seedAtlasDB.js` matches your Atlas cluster
2. Check the connection string format
3. Ensure you're using the correct database name (`SpaceAtlasDB`)

### Collection Already Exists

**No problem!** The script automatically drops and recreates the collection, ensuring a clean slate every time.

---

## 🔄 Re-running the Script

You can run the script multiple times safely. It will:

1. ✅ Drop the existing `celestialbodies` collection
2. ✅ Recreate it from scratch
3. ✅ Insert fresh data

This is useful for:
- Resetting the database
- Testing changes
- Recovering from data corruption

---

## 📦 Data Schema

Each document follows this structure:

```javascript
{
  "name": "Earth",
  "slug": "earth",
  "type": "Planet",
  "description": "Earth is the third planet from the Sun...",
  "discoveredBy": "N/A",
  "discoveryDate": null,
  "imageUrl": "https://science.nasa.gov/...",
  "scientificFacts": {
    "radius_km": "6,371",
    "mass_kg": "5.972 × 10²⁴",
    "gravity_m_s2": "9.807",
    "orbital_period_days": "365.25",
    "temperature_range_c": "-88 to 58",
    "atmosphere": "78% nitrogen, 21% oxygen..."
  },
  "createdAt": "2024-12-06T08:30:00.000Z",
  "updatedAt": "2024-12-06T08:30:00.000Z"
}
```

---

## 🌟 Features

### Automatic Slug Generation

Slugs are automatically generated from names:
- `"Halley's Comet"` → `"halleys-comet"`
- `"Hale-Bopp"` → `"hale-bopp"`
- `"Moon"` → `"moon"`

### Real NASA Data

All descriptions, images, and scientific facts are sourced from:
- NASA Science
- NASA Solar System Exploration
- NASA Planetary Fact Sheets

### Comprehensive Scientific Facts

Each object includes:
- Physical properties (radius, mass, gravity)
- Orbital characteristics
- Temperature ranges
- Atmospheric composition

---

## 🔗 Connecting Your Backend

After seeding, update your backend to use Atlas:

### Option 1: Keep Local MongoDB (Current)

Leave `MONGO_URI` as is:
```bash
MONGO_URI=mongodb://localhost:27017/spaceatlas
```

### Option 2: Switch to Atlas

Update `MONGO_URI` in `.env`:
```bash
MONGO_URI=mongodb+srv://<username>:<password>@spaceatlas.trm5h10.mongodb.net/SpaceAtlasDB?retryWrites=true&w=majority
```

Then restart your backend:
```bash
npm start
```

---

## 📊 Sample Data Preview

### Planets (8)
- Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune

### Moons (5)
- **Moon** - Earth's natural satellite
- **Europa** - Jupiter's icy moon with subsurface ocean
- **Titan** - Saturn's largest moon with methane lakes
- **Ganymede** - Largest moon in the Solar System
- **Enceladus** - Saturn's moon with water geysers

### Dwarf Planets (5)
- **Pluto** - Former 9th planet
- **Ceres** - Largest asteroid belt object
- **Makemake** - Kuiper belt object
- **Haumea** - Elongated, fast-rotating
- **Eris** - Most massive dwarf planet

### Comets (3)
- **Halley's Comet** - Returns every 75-76 years
- **Comet NEOWISE** - 2020 discovery
- **Hale-Bopp** - Brightest comet of the 20th century

### Asteroids (3)
- **Vesta** - Second-largest asteroid
- **Bennu** - OSIRIS-REx sample return target
- **Pallas** - Third-largest asteroid

---

## 🎯 Next Steps

After successful seeding:

1. ✅ Verify data in MongoDB Atlas dashboard
2. ✅ Test API endpoints
3. ✅ View data in your React frontend
4. ✅ Test admin CRUD operations
5. ✅ Enjoy your fully populated Space Atlas!

---

## 📞 Support

If you encounter issues:

1. Check the error message carefully
2. Verify all credentials in `.env`
3. Ensure IP is whitelisted in Atlas
4. Check MongoDB Atlas cluster status
5. Review the troubleshooting section above

---

**🎉 Happy Space Exploring! 🚀**
