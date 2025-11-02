# Complete Data Extraction Instructions

## Quick Method (Python Script)

Since you have the Python file with complete ADVICE_BLOCKS_V5 and ANSWER_TO_ADVICE_MAP_V5, here's the fastest way:

### Step 1: Create a Python script
```python
import json

# Open your Python file that contains ADVICE_BLOCKS_V5 and ANSWER_TO_ADVICE_MAP_V5
# Then export them:

# Copy the complete ADVICE_BLOCKS_V5 dictionary from your Python code
ADVICE_BLOCKS_V5 = {
    # ... all your blocks here
}

# Copy the complete ANSWER_TO_ADVICE_MAP_V5 dictionary from your Python code  
ANSWER_TO_ADVICE_MAP_V5 = {
    # ... all your mappings here
}

# Save to JSON files
with open('server/services/adviceBlocks.json', 'w', encoding='utf-8') as f:
    json.dump(ADVICE_BLOCKS_V5, f, indent=2, ensure_ascii=False)

with open('server/services/answerToAdviceMap.json', 'w', encoding='utf-8') as f:
    json.dump(ANSWER_TO_ADVICE_MAP_V5, f, indent=2, ensure_ascii=False)

print("✅ Done! Files created in server/services/")
```

### Step 2: Run the script
```bash
cd "server/services"
python createCompleteJSON.py
```

## Alternative: Manual Copy-Paste

1. Open your Python file with the complete code
2. Find `ADVICE_BLOCKS_V5 = {`
3. Copy everything from `{` to the matching `}`
4. Paste into a JSON validator/formatter
5. Save as `server/services/adviceBlocks.json`
6. Repeat for `ANSWER_TO_ADVICE_MAP_V5`

## Verification

After creating files, verify:
- ✅ JSON is valid (use jsonlint.com)
- ✅ All advice block IDs referenced in mappings exist
- ✅ File sizes are substantial (adviceBlocks should be ~100KB+, mappings ~20KB+)

