#!/usr/bin/env python3
"""
Script to extract ADVICE_BLOCKS_V5 and ANSWER_TO_ADVICE_MAP_V5 
from the Python file and convert to JSON.

This assumes you have the Python file with the complete data.
Run: python createCompleteJSON.py
"""

import json

# Paste your complete ADVICE_BLOCKS_V5 here from the Python code
ADVICE_BLOCKS_V5 = {
    # This will be populated from your Python file
}

# Paste your complete ANSWER_TO_ADVICE_MAP_V5 here from the Python code  
ANSWER_TO_ADVICE_MAP_V5 = {
    # This will be populated from your Python file
}

# Write to JSON files
with open('adviceBlocks.json', 'w', encoding='utf-8') as f:
    json.dump(ADVICE_BLOCKS_V5, f, indent=2, ensure_ascii=False)

with open('answerToAdviceMap.json', 'w', encoding='utf-8') as f:
    json.dump(ANSWER_TO_ADVICE_MAP_V5, f, indent=2, ensure_ascii=False)

print("✅ JSON files created successfully!")
print(f"   - adviceBlocks.json: {len(ADVICE_BLOCKS_V5)} blocks")
print(f"   - answerToAdviceMap.json: {len(ANSWER_TO_ADVICE_MAP_V5)} mappings")

