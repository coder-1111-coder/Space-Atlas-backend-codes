# 🚀 QUICK START GUIDE

## Running the Application

### Step 1: Start Backend Server

Open a terminal in the root directory (`space-atlas/`) and run:

```bash
npm start
```

You should see:
```
🚀 Server running on http://localhost:4000
MongoDB Connected Successfully
Celestial bodies already exist ✔
```

### Step 2: Start Frontend Server

Open a **NEW** terminal in the frontend directory (`space-atlas/frontend/`) and run:

```bash
npm run dev
```

You should see:
```
VITE v7.2.6  ready in 365 ms
➜  Local:   http://localhost:5173/
```

### Step 3: Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 🎯 What to Do Next

### 1. Browse Celestial Bodies
- The home page displays all celestial bodies
- Use the search bar to find specific bodies
- Filter by type (Planet, Moon, Asteroid, etc.)
- Sort by newest, oldest, or name
- Click on any card to view details

### 2. Login as Admin
- Click "Admin Login" in the navbar
- Use these credentials:
  - **Email**: `admin@space.com`
  - **Password**: `Admin@123`

### 3. Manage Bodies (Admin Dashboard)
- After logging in, click "Dashboard" in the navbar
- **Create**: Click "+ Add New Body" button
- **Edit**: Click "Edit" button on any row
- **Delete**: Click "Delete" button on any row

## 🔧 Troubleshooting

### Backend won't start
- Make sure MongoDB is running on `localhost:27017`
- Check if port 4000 is available
- Verify `.env` file exists in root directory

### Frontend won't start
- Make sure you're in the `frontend/` directory
- Check if port 5173 is available
- Verify `.env` file exists in frontend directory

### Can't login
- Make sure you ran `node utils/createAdmin.js` first
- Check backend console for errors
- Verify MongoDB connection is successful

### API calls fail
- Ensure backend is running on port 4000
- Check browser console for CORS errors
- Verify `VITE_API_URL` in frontend/.env is correct

## 📊 Testing the API

You can test the API directly using these endpoints:

### Health Check
```bash
curl http://localhost:4000/
```

### Get All Bodies
```bash
curl http://localhost:4000/api/bodies
```

### Login
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@space.com","password":"Admin@123"}'
```

### Create Body (requires token)
```bash
curl -X POST http://localhost:4000/api/bodies \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Mars",
    "type": "Planet",
    "description": "The Red Planet, fourth from the Sun.",
    "discoveryDate": null,
    "discoveredBy": "Known since ancient times"
  }'
```

## 🎨 Features to Explore

### Frontend
- ✅ Responsive design (try resizing browser)
- ✅ Smooth animations and transitions
- ✅ Type-specific color badges
- ✅ Pagination on home page
- ✅ Search with instant results
- ✅ Modal forms in admin dashboard
- ✅ Auto-logout on token expiration

### Backend
- ✅ Automatic slug generation from names
- ✅ Text search across name and description
- ✅ Rate limiting on login (5 attempts per 15 min)
- ✅ MongoDB injection prevention
- ✅ Comprehensive input validation
- ✅ Consistent error responses
- ✅ ID or slug lookup for flexibility

## 📝 Default Data

The application comes pre-seeded with 6 celestial bodies:
1. Mercury (Planet)
2. Venus (Planet)
3. Earth (Planet)
4. Moon (Moon)
5. Europa (Moon)
6. Halley's Comet (Comet)

## 🛑 Stopping the Servers

### Stop Backend
- Press `Ctrl+C` in the backend terminal

### Stop Frontend
- Press `Ctrl+C` in the frontend terminal

---

**Need help? Check the main README.md for detailed documentation.**
