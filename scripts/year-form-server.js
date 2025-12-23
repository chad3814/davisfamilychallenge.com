/* eslint-disable @typescript-eslint/no-require-imports */
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'year-data-form.html'));
});

// Save year data endpoint
app.post('/api/save-year', (req, res) => {
  try {
    const yearData = req.body;

    // Validate required fields
    if (!yearData.year) {
      return res.status(400).json({
        success: false,
        error: 'Year is required'
      });
    }

    // Construct file path
    const dataDir = path.join(__dirname, '..', 'data', 'years');
    const filePath = path.join(dataDir, `${yearData.year}.json`);

    // Ensure data/years directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Write JSON file with pretty formatting
    fs.writeFileSync(filePath, JSON.stringify(yearData, null, 2), 'utf8');

    console.log(`✅ Saved ${yearData.year}.json successfully`);

    res.json({
      success: true,
      message: `Year ${yearData.year} data saved successfully`,
      filePath: `/data/years/${yearData.year}.json`
    });

  } catch (error) {
    console.error('Error saving year data:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Load year data endpoint
app.get('/api/load-year/:year', (req, res) => {
  try {
    const year = req.params.year;
    const filePath = path.join(__dirname, '..', 'data', 'years', `${year}.json`);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        error: `Year ${year} data not found`
      });
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const yearData = JSON.parse(fileContent);

    console.log(`📖 Loaded ${year}.json for editing`);

    res.json({
      success: true,
      data: yearData
    });

  } catch (error) {
    console.error('Error loading year data:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Check if file exists endpoint
app.get('/api/check-year/:year', (req, res) => {
  const year = req.params.year;
  const filePath = path.join(__dirname, '..', 'data', 'years', `${year}.json`);
  const exists = fs.existsSync(filePath);

  res.json({ exists });
});

app.listen(PORT, () => {
  console.log(`\n🎲 Davis Family Challenge - Year Data Form Server`);
  console.log(`📝 Form available at: http://localhost:${PORT}`);
  console.log(`💾 Data will be saved to: data/years/\n`);
});
