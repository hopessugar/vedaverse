# How to Test Ayurvedic Doctor V5 Integration

## Step 1: Start the Backend Server

```powershell
cd server
node index.js
```

You should see:
```
✅ MongoDB Connected
✅ Server running on port 5000
✅ API available at http://localhost:5000/api
```

## Step 2: Test the API Endpoints

### Option A: Using Browser (Simple)

1. **Get All Diseases:**
   - Open: `http://localhost:5000/api/plans/diseases`
   - Should show: List of all 12 diseases

2. **Get General Questions:**
   - Open: `http://localhost:5000/api/plans/questions/general`
   - Should show: 10 general questions with options

3. **Get Disease-Specific Questions (Example for Obesity):**
   - Open: `http://localhost:5000/api/plans/questions/disease/Obesity`
   - Should show: Disease-specific questions for Obesity

### Option B: Using curl (PowerShell)

```powershell
# Test Health Check
Invoke-WebRequest -Uri "http://localhost:5000/api/health" -Method GET

# Get Diseases List
Invoke-WebRequest -Uri "http://localhost:5000/api/plans/diseases" -Method GET

# Get General Questions
Invoke-WebRequest -Uri "http://localhost:5000/api/plans/questions/general" -Method GET

# Get Disease Questions (Obesity)
Invoke-WebRequest -Uri "http://localhost:5000/api/plans/questions/disease/Obesity" -Method GET
```

### Option C: Using Postman or Thunder Client (VSCode Extension)

1. **Get Diseases:**
   - Method: `GET`
   - URL: `http://localhost:5000/api/plans/diseases`
   - Headers: `Authorization: Bearer YOUR_TOKEN` (if logged in)

2. **Get General Questions:**
   - Method: `GET`
   - URL: `http://localhost:5000/api/plans/questions/general`
   - Headers: `Authorization: Bearer YOUR_TOKEN`

3. **Get Disease Questions:**
   - Method: `GET`
   - URL: `http://localhost:5000/api/plans/questions/disease/Obesity`
   - Headers: `Authorization: Bearer YOUR_TOKEN`

4. **Generate Plan (Full Test):**
   - Method: `POST`
   - URL: `http://localhost:5000/api/plans/generate`
   - Headers: 
     ```
     Content-Type: application/json
     Authorization: Bearer YOUR_TOKEN
     ```
   - Body (JSON):
     ```json
     {
       "prakritiType": "Kapha",
       "diseases": ["Obesity"],
       "generalAnswers": {
         "Q_sleep": "C",
         "Q_appetite": "C",
         "Q_stress_mind": "C",
         "Q_energy": "C",
         "Q_bowels": "C",
         "Q_skin": "C",
         "Q_temp": "C",
         "Q_thirst": "C",
         "Q_focus": "C",
         "Q_aches": "C"
       },
       "diseaseAnswers": {
         "Obesity": {
           "D_Obe_1": "C",
           "D_Obe_2": "C",
           "D_Obe_3": "C",
           "D_Obe_4": "C",
           "D_Obe_5": "C",
           "D_Obe_6": "C",
           "D_Obe_7": "C",
           "D_Obe_8": "C",
           "D_Obe_9": "C"
         }
       },
       "dietaryPreferences": [],
       "stressLevel": "Moderate"
     }
     ```

## Step 3: Test Through Frontend

1. **Start Frontend:**
   ```powershell
   cd client
   npm run dev
   ```

2. **Navigate to Report Tab:**
   - Login to the app
   - Go to "Report" tab
   - Click "Get Personalized Plan" button
   - Fill in:
     - Select Prakriti type
     - Answer 10 general questions
     - Select disease(s)
     - Answer disease-specific questions
   - Submit and see the generated plan

## Step 4: Verify the Response

The generated plan should include:
- ✅ `yogaPoses`: Array of yoga poses with details
- ✅ `dietPlan`: Foods to eat/avoid, meal schedule
- ✅ `lifestyleTips`: Daily routine recommendations
- ✅ `herbalRecommendations`: Herbal remedies
- ✅ `diagnosticRationale`: Doctor's analysis
- ✅ `priorityActions`: Top 3-4 actions
- ✅ `cautions`: Safety warnings

## Expected Results

For a Kapha-dominant Obesity case, you should see:
- Diet Philosophy: "Light, Dry, and Warm"
- Yoga: Surya Namaskar, Kapalabhati, etc.
- Foods to Avoid: Dairy, Sugar, Cold drinks
- Lifestyle: Wake before 6 AM, vigorous exercise
- Remedies: Ginger tea, Triphala, etc.

## Troubleshooting

1. **Server not starting?**
   - Check if MongoDB is connected
   - Check if port 5000 is available
   - Look at server console for errors

2. **Missing questions?**
   - Check `server/services/ayurvedicDoctorModel.js`
   - Verify JSON files exist: `adviceBlocks.json`, `answerToAdviceMap.json`

3. **Plan not generating?**
   - Check server console for errors
   - Verify all required fields in request body
   - Check if user is authenticated (JWT token valid)

4. **Empty plan?**
   - Check if advice blocks are loaded correctly
   - Verify disease name matches exactly (case-sensitive)
   - Check answer flags are being generated correctly








