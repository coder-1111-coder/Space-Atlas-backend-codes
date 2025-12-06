# 🚀 QUICK ATLAS SETUP

## 1️⃣ Update .env File

```bash
ATLAS_USERNAME=your_mongodb_username
ATLAS_PASSWORD=your_mongodb_password
```

## 2️⃣ Whitelist IP in MongoDB Atlas

- Go to Network Access
- Add IP: `0.0.0.0/0` (for testing)

## 3️⃣ Run Seeding Script

```bash
node utils/seedAtlasDB.js
```

## ✅ Expected Result

```
✔ MongoDB Atlas connected
✔ SpaceAtlasDB initialized
✔ celestialbodies collection recreated
✔ 24 celestial objects inserted
✔ Database is ready!
```

## 📊 What Gets Seeded

- 8 Planets
- 5 Major Moons
- 5 Dwarf Planets
- 3 Comets
- 3 Asteroids

**Total: 24 objects with real NASA data!**

---

See `ATLAS_SEEDING_GUIDE.md` for detailed instructions.
