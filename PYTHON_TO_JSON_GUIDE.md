# Converting Python Data to JSON Files

## Overview
The Python code contains two main data structures that need to be converted to JSON:
1. `ADVICE_BLOCKS_V5` - ~300+ advice blocks
2. `ANSWER_TO_ADVICE_MAP_V5` - ~110+ answer mappings

## Current Status
- ✅ Frontend ReportTab updated to display questions
- ✅ Backend routes working correctly  
- ⚠️ JSON files are incomplete (only ~20 blocks vs 300+ needed)

## Next Steps

### Option 1: Manual Conversion (Recommended for accuracy)
1. Copy all `ADVICE_BLOCKS_V5` dictionary from Python
2. Convert to JSON format (ensure proper escaping)
3. Save to `server/services/adviceBlocks.json`
4. Copy all `ANSWER_TO_ADVICE_MAP_V5` dictionary from Python
5. Save to `server/services/answerToAdviceMap.json`

### Option 2: Python Script to Generate JSON
Run this Python script to generate the JSON files:

```python
import json

# Load the Python file with ADVICE_BLOCKS_V5 and ANSWER_TO_ADVICE_MAP_V5
# Then export:

with open('adviceBlocks.json', 'w', encoding='utf-8') as f:
    json.dump(ADVICE_BLOCKS_V5, f, indent=2, ensure_ascii=False)

with open('answerToAdviceMap.json', 'w', encoding='utf-8') as f:
    json.dump(ANSWER_TO_ADVICE_MAP_V5, f, indent=2, ensure_ascii=False)
```

## Structure Requirements

### adviceBlocks.json
Each block should have:
```json
{
  "BLOCK_ID": {
    "category": "Yoga|Diet_Philosophy|Foods_To_Eat|Foods_To_Avoid|Lifestyle_Advice|Home_Remedies|Cautions",
    "dosha": "Vata|Pitta|Kapha",
    "disease": ["array", "of", "diseases"] or missing if not disease-specific,
    "advice": "Short advice title",
    "details": "Detailed explanation",
    "rationale": "Why this helps" (for some categories)
  }
}
```

### answerToAdviceMap.json
Each mapping:
```json
{
  "Q_sleep_A": ["L_V_Strict_Routine", "R_V_Calming_Tea"],
  "D_Obe_3_B": ["Y_P_Sheetali"]
}
```

## Verification
After conversion, verify:
1. All 10 general questions have mappings
2. All 12 diseases have their questions mapped
3. All advice block IDs in mappings exist in adviceBlocks.json
4. JSON is valid (use jsonlint.com)

