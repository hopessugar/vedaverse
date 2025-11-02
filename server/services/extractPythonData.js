// This script would extract data from Python if run in a Python environment
// For now, we'll manually create the complete JSON files based on the Python code provided

// The Python code provided has:
// 1. ADVICE_BLOCKS_V5 - Contains all advice blocks
// 2. ANSWER_TO_ADVICE_MAP_V5 - Contains answer mappings

// We need to convert these to JSON format
// This file is a reference for what needs to be extracted

console.log('To extract the complete data, run this in Python:');
console.log(`
import json

# Copy ADVICE_BLOCKS_V5 and ANSWER_TO_ADVICE_MAP_V5 from your Python file
# Then run:

with open('server/services/adviceBlocks.json', 'w', encoding='utf-8') as f:
    json.dump(ADVICE_BLOCKS_V5, f, indent=2, ensure_ascii=False)

with open('server/services/answerToAdviceMap.json', 'w', encoding='utf-8') as f:
    json.dump(ANSWER_TO_ADVICE_MAP_V5, f, indent=2, ensure_ascii=False)
`);

