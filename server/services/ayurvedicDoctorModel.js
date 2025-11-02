// Ayurvedic Doctor V5 - Complete "Gold Standard" AI Model
// Converted from Python to Node.js for Veda Verse integration

// Disease list
const DISEASE_LIST = [
  "Obesity", "Diabetes", "Hypertension", "Cholesterol/Lipid", "PCOD/PCOS", 
  "Asthma", "Cardiac", "Cancer (Breast/Prostate)", "Tobacco/Alcohol", 
  "Physical inactivity", "Unhealthy diet", "Climate or air pollution"
];

const ALL_DOSHAS = ["Vata", "Pitta", "Kapha", "Vata-Pitta", "Pitta-Kapha", "Vata-Kapha", "Sama"];

// Get general questions (10 General Vikriti Questions)
function getGeneralQuestions() {
  return {
    "Q_sleep": {
      "q": "How is your CURRENT sleep quality?",
      "options": {
        "A": "Light, interrupted, difficult to fall asleep",
        "B": "Good, but I wake up hot or irritable",
        "C": "Heavy, deep, I oversleep and feel groggy"
      },
      "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
    },
    "Q_appetite": {
      "q": "How is your CURRENT appetite/digestion?",
      "options": {
        "A": "Irregular, gassy, bloated, 'Visham Agni'",
        "B": "Strong, sharp, 'hangry', 'Tikshna Agni'",
        "C": "Slow, heavy, low hunger, 'Manda Agni'"
      },
      "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
    },
    "Q_stress_mind": {
      "q": "What is your CURRENT mental/emotional state under stress?",
      "options": {
        "A": "Anxious, worried, restless, 'wired'",
        "B": "Irritable, angry, critical, impatient",
        "C": "Calm, but also complacent, lethargic, or withdrawn"
      },
      "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
    },
    "Q_energy": {
      "q": "How is your CURRENT energy level throughout the day?",
      "options": {
        "A": "Comes in bursts, erratic, I fatigue easily",
        "B": "Focused, driven, intense, I can't 'stop'",
        "C": "Slow and steady, but hard to get started, sluggish in AM"
      },
      "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
    },
    "Q_bowels": {
      "q": "How are your CURRENT bowel movements?",
      "options": {
        "A": "Dry, hard, constipated, irregular",
        "B": "Loose, urgent, yellowish, burning sensation",
        "C": "Heavy, sticky, oily, but regular, may have mucus"
      },
      "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
    },
    "Q_skin": {
      "q": "How is your CURRENT skin condition?",
      "options": {
        "A": "Dry, rough, chapped, thin",
        "B": "Red, inflamed, acne, rashes, sensitive",
        "C": "Oily, greasy, large pores, congested"
      },
      "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
    },
    "Q_temp": {
      "q": "What is your CURRENT body temperature preference?",
      "options": {
        "A": "I feel cold easily, hands/feet are cold, crave warmth",
        "B": "I feel hot, flush easily, prefer cool environments",
        "C": "I feel cool and damp, hate humidity and cold/damp weather"
      },
      "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
    },
    "Q_thirst": {
      "q": "How is your CURRENT thirst?",
      "options": {
        "A": "Variable, I forget to drink",
        "B": "Excessive, I crave cold drinks",
        "C": "Low, I don't feel thirsty often"
      },
      "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
    },
    "Q_focus": {
      "q": "How is your CURRENT mental focus?",
      "options": {
        "A": "Scattered, hard to focus, many ideas",
        "B": "Sharp, piercing, very focused but can be obsessive",
        "C": "Calm, steady, but can be slow to learn new things"
      },
      "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
    },
    "Q_aches": {
      "q": "What kind of CURRENT body aches do you have (if any)?",
      "options": {
        "A": "Popping/cracking joints, stiffness, migrating pain",
        "B": "Inflammation, joint swelling, 'burning' pain",
        "C": "Dull, heavy ache, congestion, joint 'fullness'"
      },
      "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
    }
  };
}

// Get disease-specific questions (V5 Gold Standard for all 12 diseases)
function getDiseaseQuestions(disease) {
  const diseaseMap = {
    "Obesity": {
      "D_Obe_1": {
        "q": "Where on your body do you gain weight most easily?",
        "options": {
          "A": "Everywhere, but I'm still 'bony' (Vata-type)",
          "B": "Mainly abdomen, 'apple-shape', muscular build",
          "C": "Hips, thighs, buttocks, 'pear-shape', heavy build"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Obe_2": {
        "q": "What kind of food cravings do you experience most?",
        "options": {
          "A": "Erratic cravings; salty, crunchy, or sweet",
          "B": "Intense cravings; spicy, fried, salty, sour",
          "C": "Strong cravings; sweet (sugar), dairy (ice cream, cheese), bread"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Obe_3": {
        "q": "How do you feel physically after eating a large meal?",
        "options": {
          "A": "Gassy and bloated, 'air' belly",
          "B": "Heartburn, acidity, or irritable",
          "C": "Heavy, lethargic, sleepy, 'food coma'"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Obe_4": {
        "q": "How would you describe your hunger pattern?",
        "options": {
          "A": "Irregular, I snack a lot",
          "B": "Intense and sharp, I *must* eat now",
          "C": "Constant, dull, I can go long times but always feel 'background' hunger"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Obe_5": {
        "q": "What is your emotional relationship with food?",
        "options": {
          "A": "I eat when I'm anxious or stressed (Vata)",
          "B": "I eat out of habit or for intense pleasure (Pitta)",
          "C": "I eat for comfort, I am 'attached' to food, it's 'love' (Kapha)"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Obe_6": {
        "q": "Do you experience water retention or swelling (edema)?",
        "options": {
          "A": "Rarely, I am more 'dry'",
          "B": "Sometimes, especially if it's hot",
          "C": "Yes, often. My rings get tight, my ankles swell"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Obe_7": {
        "q": "How is your motivation to exercise?",
        "options": {
          "A": "I like fast, exciting things (like dance) but get bored",
          "B": "I am competitive and like to 'win' (sports, intense classes)",
          "C": "It is very, very hard to get motivated, I prefer the sofa"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Obe_8": {
        "q": "How is your joint health when you consider exercising?",
        "options": {
          "A": "My joints feel stiff, dry, and crackle or pop.",
          "B": "My joints feel fine, but I can get inflamed or 'hot' after.",
          "C": "My joints feel okay, just 'heavy' and stiff from inaction."
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Obe_9": {
        "q": "What is your main *emotional* barrier to losing weight?",
        "options": {
          "A": "Anxiety and inconsistency. I'm not grounded.",
          "B": "Perfectionism and 'all-or-nothing' thinking. I get frustrated.",
          "C": "Emotional attachment to food and lack of self-worth."
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      }
    },
    "Diabetes": {
      "D_Dia_1": {
        "q": "Do you experience excessive thirst?",
        "options": {
          "A": "Sometimes, but it's variable",
          "B": "Yes, intense thirst, I crave cold drinks",
          "C": "No, my thirst is generally low"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Dia_2": {
        "q": "How is your urination frequency?",
        "options": {
          "A": "Frequent and clear, but in small amounts",
          "B": "Frequent, high volume, and yellowish",
          "C": "Frequent, high volume, and pale or cloudy"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Dia_3": {
        "q": "How is your energy level / fatigue?",
        "options": {
          "A": "General fatigue, weakness, and exhaustion",
          "B": "Bursts of energy followed by crashes, irritability",
          "C": "Constant lethargy, sleepiness, especially after meals"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Dia_4": {
        "q": "Have you experienced changes in your weight?",
        "options": {
          "A": "Yes, I have *lost* weight unexpectedly",
          "B": "My weight is stable or slightly increased",
          "C": "Yes, I have *gained* weight and it's hard to lose"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Dia_5": {
        "q": "Do you have any 'burning' sensations (e.g., feet, hands, urination)?",
        "options": {
          "A": "No, I have more numbness or tingling",
          "B": "Yes, burning sensations are a key symptom for me",
          "C": "No, I have more of a 'heavy' or 'dull' feeling"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Dia_6": {
        "q": "Do you have skin issues associated with this?",
        "options": {
          "A": "Yes, my skin has become very dry and rough",
          "B": "Yes, I have skin infections, boils, or redness (e.g., in folds)",
          "C": "Yes, my skin is often oily, damp, or has fungal infections"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Dia_7": {
        "q": "How is your digestion?",
        "options": {
          "A": "Irregular, gassy, and constipated",
          "B": "Intense, with acidity or diarrhea",
          "C": "Slow, heavy, and sluggish"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      }
    },
    "Hypertension": {
      "D_Htn_1": {
        "q": "What other symptoms do you feel with your high blood pressure?",
        "options": {
          "A": "Anxiety, worry, irregular heartbeat, 'fluttering'",
          "B": "Headaches, flushing, anger, irritability, nosebleeds",
          "C": "Lethargy, swelling (edema), feeling 'heavy', high cholesterol"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Htn_2": {
        "q": "When is your blood pressure typically highest?",
        "options": {
          "A": "It's erratic, changes a lot with my stress levels",
          "B": "During the day, when I'm working or after a conflict",
          "C": "It's more constant, but worse in the morning"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Htn_3": {
        "q": "How is your body temperature?",
        "options": {
          "A": "My hands and feet are often cold",
          "B": "I often feel hot, flushed, and sweaty",
          "C": "I feel cool, but my body/circulation feels 'congested'"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Htn_4": {
        "q": "How do you react to stressful situations?",
        "options": {
          "A": "I get anxious and worried, my heart races",
          "B": "I get angry, frustrated, and want to 'fight'",
          "C": "I shut down and feel 'stuck' or heavy"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Htn_5": {
        "q": "What are your salt cravings/intake like?",
        "options": {
          "A": "I crave salty, crunchy snacks (like chips)",
          "B": "I crave savory, spicy, and salty foods",
          "C": "I crave salt, but also retain water easily when I eat it"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Htn_6": {
        "q": "Do you experience headaches?",
        "options": {
          "A": "Yes, tension headaches, especially at the back of the neck",
          "B": "Yes, sharp, piercing, or migraine-like headaches",
          "C": "Yes, dull, heavy, 'sinus-like' headaches"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      }
    },
    "Cholesterol/Lipid": {
      "D_Cho_1": {
        "q": "What does your lab report primarily show?",
        "options": {
          "A": "Just high total cholesterol, numbers are erratic",
          "B": "High LDL and high Triglycerides, low HDL",
          "C": "High Triglycerides, high total cholesterol, sluggish liver"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Cho_2": {
        "q": "How is your digestion and metabolism?",
        "options": {
          "A": "Irregular, gassy, variable",
          "B": "Intense, sharp, with potential acidity or loose stools",
          "C": "Slow, heavy, sluggish, I feel tired after eating"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Cho_3": {
        "q": "What is your body frame and weight?",
        "options": {
          "A": "Thin frame, but I have plaque (Vata-type)",
          "B": "Medium, muscular frame, tendency for inflammation",
          "C": "Heavy, large frame, I gain weight easily"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Cho_4": {
        "q": "What kind of foods do you crave?",
        "options": {
          "A": "Dry, salty, crunchy snacks",
          "B": "Fried, spicy, oily, and sour/salty foods",
          "C": "Sweet, heavy, fatty foods (dairy, cheese, fried, sugar)"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Cho_5": {
        "q": "Do you experience any 'heating' symptoms like skin rashes or acidity?",
        "options": {
          "A": "No, my skin is dry",
          "B": "Yes, I have inflammation, redness, or heartburn",
          "C": "No, I feel more 'congested' and oily"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Cho_6": {
        "q": "How is your energy and motivation?",
        "options": {
          "A": "Variable and anxious",
          "B": "Driven and intense, but can be irritable",
          "C": "Low, lethargic, it's hard to get started"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      }
    },
    "PCOD/PCOS": {
      "D_Pco_1": {
        "q": "What is your primary menstrual symptom?",
        "options": {
          "A": "Irregular, scanty, or painful periods (Vata-type)",
          "B": "Heavy bleeding, inflammation, acne, irritability (Pitta-type)",
          "C": "Delayed or absent periods, heavy flow, weight gain (Kapha-type)"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Pco_2": {
        "q": "What are your main associated symptoms?",
        "options": {
          "A": "Anxiety, insomnia, constipation, dry skin",
          "B": "Acne, skin inflammation, hair loss (scalp), excess body heat",
          "C": "Weight gain, cysts, lethargy, oily skin/hair"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Pco_3": {
        "q": "How is your body weight and build?",
        "options": {
          "A": "Thin, hard to gain weight, but very irregular cycles",
          "B": "Medium build, good muscle, but inflammatory symptoms",
          "C": "Heavy build, easy to gain weight, hard to lose"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Pco_4": {
        "q": "Do you experience excess hair growth (hirsutism)?",
        "options": {
          "A": "No, or very little",
          "B": "Yes, this is a primary and frustrating symptom",
          "C": "Yes, along with weight gain"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Pco_5": {
        "q": "How is your emotional state?",
        "options": {
          "A": "Anxious, moody, ungrounded",
          "B": "Irritable, angry, intense, critical",
          "C": "Lethargic, complacent, feeling 'stuck'"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Pco_6": {
        "q": "What are your food cravings?",
        "options": {
          "A": "Irregular cravings for salty/crunchy",
          "B": "Intense cravings for spicy, sour, or salty",
          "C": "Strong cravings for sugar, dairy, and bread"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      }
    },
    "Asthma": {
      "D_Ast_1": {
        "q": "What is the primary trigger for your asthma?",
        "options": {
          "A": "Cold, dry air, wind, dust, or after traveling",
          "B": "Pollen, allergens, pollutants, high heat, or after being angry",
          "C": "Damp, cold, moldy environments, congestion, or in Spring"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Ast_2": {
        "q": "What time of day is it worst?",
        "options": {
          "A": "Vata time (2-6 AM/PM), erratic, unpredictable",
          "B": "Pitta time (10-2 AM/PM), during midday heat",
          "C": "Kapha time (6-10 AM/PM), in the morning or evening"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Ast_3": {
        "q": "Describe the main sensation of an attack.",
        "options": {
          "A": "Dry wheezing, constriction, anxiety, dry cough",
          "B": "Inflammation, yellow phlegm, burning sensation, cough",
          "C": "Congestion, productive cough with lots of white/clear phlegm"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Ast_4": {
        "q": "How is your digestion?",
        "options": {
          "A": "Irregular, gassy, and bloated",
          "B": "Strong, acidic, prone to heartburn",
          "C": "Slow, heavy, sluggish"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Ast_5": {
        "q": "What is your thirst like during an attack?",
        "options": {
          "A": "I crave sips of warm/hot drinks",
          "B": "I crave cool drinks, I feel hot",
          "C": "I have little to no thirst"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Ast_6": {
        "q": "What is your tongue like?",
        "options": {
          "A": "Dry, thin, and possibly cracked",
          "B": "Red, sharp, with a yellowish coating",
          "C": "Thick, pale, and with a heavy white coating"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      }
    },
    "Cardiac": {
      "D_Car_1": {
        "q": "What is your primary cardiac symptom?",
        "options": {
          "A": "Palpitations, irregular heartbeat, anxiety",
          "B": "Chest discomfort, burning, 'hot' feeling",
          "C": "Heaviness in chest, high BP, swelling in legs"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Car_2": {
        "q": "Are you pre- or post-procedure/event?",
        "options": {
          "A": "Pre-procedure, managing with medication",
          "B": "Post-procedure (e.g., stent, bypass), in recovery",
          "C": "No event, but managing high risk (e.g., family history)"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Car_3": {
        "q": "How is your emotional state related to this?",
        "options": {
          "A": "High anxiety, fear, and worry",
          "B": "High stress, frustration, and anger",
          "C": "Low mood, lethargy, feeling 'stuck'"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Car_4": {
        "q": "Do you experience shortness of breath (dyspnea)?",
        "options": {
          "A": "Sometimes, related to anxiety or exertion",
          "B": "Rarely, only with high heat or inflammation",
          "C": "Yes, especially on exertion, feel 'congested'"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Car_5": {
        "q": "Do you have swelling (edema) in your feet or ankles?",
        "options": {
          "A": "No, I am more dry",
          "B": "Only when it's very hot",
          "C": "Yes, this is a common symptom for me"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      }
    },
    "Cancer (Breast/Prostate)": {
      "D_Can_1": {
        "q": "What is your current treatment status? (This is for supportive advice only)",
        "options": {
          "A": "Active treatment (chemo, radiation, hormone)",
          "B": "Post-treatment, in recovery/remission",
          "C": "Screening/Prevention (e.g., high risk, family history)"
        },
        "dosha_map": {"A": "Pitta", "B": "Vata", "C": "Kapha"}
      },
      "D_Can_2": {
        "q": "What is your primary side-effect or concern?",
        "options": {
          "A": "Fatigue, anxiety, insomnia, dryness, nerve pain (Vata)",
          "B": "Inflammation, nausea, hot flashes, skin rashes, anger (Pitta)",
          "C": "Lethargy, heaviness, low appetite, congestion, water retention (Kapha)"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Can_3": {
        "q": "How is your digestion (Agni)?",
        "options": {
          "A": "Irregular, gassy, constipated, low appetite",
          "B": "Acidic, burning, nausea, or loose stools",
          "C": "Slow, heavy, sluggish, no appetite, metallic taste"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Can_4": {
        "q": "How is your emotional energy?",
        "options": {
          "A": "Fearful, anxious, ungrounded",
          "B": "Frustrated, angry, irritable",
          "C": "Sad, lethargic, withdrawn"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Can_5": {
        "q": "What is your main goal with this advice?",
        "options": {
          "A": "To calm my mind and nervous system",
          "B": "To reduce inflammation and heat from treatment",
          "C": "To gently support my body's detox and energy"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      }
    },
    "Tobacco/Alcohol": {
      "D_T/A_1": {
        "q": "What is the primary substance you're addressing?",
        "options": {
          "A": "Tobacco (smoking) - Vata/Kapha",
          "B": "Alcohol - Pitta/Vata",
          "C": "Both or other substances"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_T/A_2": {
        "q": "What is the main driver for use?",
        "options": {
          "A": "Anxiety, restlessness, social habit (Vata)",
          "B": "Stress, work-pressure, to 'blow off steam', habit (Pitta)",
          "C": "Boredom, lethargy, to 'feel something', habit (Kapha)"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_T/A_3": {
        "q": "What side effects do you notice most?",
        "options": {
          "A": "Dryness (cough, skin), anxiety, insomnia, tremors",
          "B": "Acidity, inflammation, anger, skin redness, liver issues",
          "C": "Congestion (lungs), lethargy, weight gain, low motivation"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_T/A_4": {
        "q": "How are your cravings?",
        "options": {
          "A": "Erratic, triggered by stress",
          "B": "Sharp, intense, hard to ignore",
          "C": "Dull, constant, 'background noise'"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      }
    },
    "Physical inactivity": {
      "D_Ina_1": {
        "q": "What is the MAIN reason you are inactive?",
        "options": {
          "A": "I'm restless, I start/stop, get bored, or feel 'too weak/tired'",
          "B": "I'm a 'workaholic', I have 'no time', I'm too competitive/intense",
          "C": "I have no motivation, I feel too heavy/lethargic, I prefer comfort"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Ina_2": {
        "q": "How many hours a day do you sit?",
        "options": {
          "A": "It's variable, I pace a lot",
          "B": "6-8 hours, but I'm mentally 'on'",
          "C": "More than 8 hours, I feel 'stuck' to my chair"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Ina_3": {
        "q": "How do you feel after (the rare) exercise?",
        "options": {
          "A": "Good, but my joints crackle, and I get sore easily",
          "B": "Energized, I 'crushed it', but I can overdo it",
          "C": "Exhausted, but good. The hardest part is starting."
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      }
    },
    "Unhealthy diet": {
      "D_Die_1": {
        "q": "What is the main problem with your diet?",
        "options": {
          "A": "Irregular meals, snacking, eating dry/cold/processed foods",
          "B": "Too much spicy, fried, sour, salty, or 'hot' food; overeating",
          "C": "Too much sweet, heavy, oily food (dairy, sugar, bread); overeating"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Die_2": {
        "q": "How is your digestive fire ('Agni')?",
        "options": {
          "A": "'Visham Agni': Irregular, gassy, bloated, variable",
          "B": "'Tikshna Agni': Sharp, intense, burns food, causes acidity",
          "C": "'Manda Agni': Slow, dull, heavy, food sits for hours"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Die_3": {
        "q": "What kind of cravings do you have?",
        "options": {
          "A": "Salty, crunchy, dry (chips, crackers)",
          "B": "Spicy, fried, sour, savory (curry, pickles, burgers)",
          "C": "Sweet, heavy (ice cream, cheese, pastries, bread)"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Die_3": {
        "q": "When do you eat?",
        "options": {
          "A": "All the time, I 'graze' and have no set schedule",
          "B": "I eat big, intense meals, but get 'hangry' if I'm late",
          "C": "I'm not hungry for breakfast, I eat a lot at night"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      }
    },
    "Climate or air pollution": {
      "D_Pol_1": {
        "q": "What are your primary symptoms from exposure?",
        "options": {
          "A": "Dry cough, dry sinuses, wheezing, anxiety",
          "B": "Sinus inflammation, skin rashes, burning eyes, headache",
          "C": "Wet cough (phlegm), congestion, sinus infection, lethargy"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Pol_2": {
        "q": "What kind of environment triggers you?",
        "options": {
          "A": "Cold, dry, windy, dusty",
          "B": "Hot, high-pollen, sharp chemical smells",
          "C": "Damp, cold, moldy, heavy smog"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      },
      "D_Pol_3": {
        "q": "Where do you feel it most?",
        "options": {
          "A": "Nervous system, joints, dry lungs",
          "B": "Blood, liver, skin, eyes (inflammation)",
          "C": "Lungs, sinuses, lymphatic system (congestion)"
        },
        "dosha_map": {"A": "Vata", "B": "Pitta", "C": "Kapha"}
      }
    }
  };

  return diseaseMap[disease] || {};
}

// Ayurvedic Doctor AI Class
class AyurvedicDoctor {
  constructor() {
    this.kb_general_questions = getGeneralQuestions();
    this.kb_disease_questions = {};
    DISEASE_LIST.forEach(disease => {
      this.kb_disease_questions[disease] = getDiseaseQuestions(disease);
    });
    
    // Load advice blocks and answer map
    try {
      this.kb_advice_blocks = require('./adviceBlocks.json');
      this.kb_answer_map = require('./answerToAdviceMap.json');
    } catch (error) {
      console.error('Error loading advice blocks:', error);
      this.kb_advice_blocks = {};
      this.kb_answer_map = {};
    }
    
    this.user_data = {};
    this.analysis = {};
  }

  analyzeImbalance(generalAnswers, diseaseAnswers, diseases) {
    const score = { Vata: 0, Pitta: 0, Kapha: 0 };
    const symptomFlags = new Set();

    // Score General Questions
    for (const [qid, answer] of Object.entries(generalAnswers)) {
      const flag = `${qid}_${answer}`;
      symptomFlags.add(flag);
      
      const question = this.kb_general_questions[qid];
      if (question && question.dosha_map) {
        const dosha = question.dosha_map[answer];
        if (dosha) {
          score[dosha]++;
        }
      }
    }

    // Score Disease-Specific Questions
    diseases.forEach(disease => {
      const diseaseQbank = this.kb_disease_questions[disease];
      const diseaseAnswersForDisease = diseaseAnswers[disease] || {};
      
      for (const [qid, answer] of Object.entries(diseaseAnswersForDisease)) {
        const flag = `${qid}_${answer}`;
        symptomFlags.add(flag);
        
        const question = diseaseQbank[qid];
        if (question && question.dosha_map) {
          const dosha = question.dosha_map[answer];
          if (dosha) {
            score[dosha] += 1.5; // Weigh disease questions more
          }
        }
      }
    });

    // Determine dominant dosha
    let dominantVikriti = "Vata";
    let maxScore = 0;
    for (const [dosha, doshaScore] of Object.entries(score)) {
      if (doshaScore > maxScore) {
        maxScore = doshaScore;
        dominantVikriti = dosha;
      }
    }

    this.analysis = {
      vikriti_scores: score,
      dominant_vikriti: dominantVikriti,
      symptom_flags: Array.from(symptomFlags)
    };
  }

  generateDiagnosticRationale(prakriti, disease, vikriti, scores) {
    let rationale = `Thank you for sharing. Here is my analysis:\n\n`;
    rationale += `Your base constitution (Prakriti) is **${prakriti}**, but your answers show a clear current imbalance (Vikriti) in **${vikriti}** (Scores: ${JSON.stringify(scores)}). `;

    // Disease-specific rationales
    const rationaleMap = {
      "Obesity": {
        "Kapha": "This **Kapha imbalance** is the classic root cause of weight gain. It creates a 'Manda Agni' (slow digestive fire), which means food is not processed efficiently and is stored as fat and water instead of being used as energy.",
        "Pitta": "This **Pitta imbalance** is driving your weight by creating 'Tikshna Agni' (sharp, intense fire). This leads to intense cravings, overeating, and inflammation, which stores fat (especially in the abdomen).",
        "Vata": "This **Vata imbalance** is likely causing your weight issues through *irregularity*. Your 'Visham Agni' (irregular digestion), constant snacking, and high anxiety mean your body is in 'storage mode'."
      },
      "Diabetes": {
        "Kapha": "This **Kapha imbalance** is the classic 'Madhumeha' (Type 2). It's caused by a slow, heavy 'Manda Agni' (digestion) and excess Kapha (mucus, fat) blocking the body's channels, leading to insulin resistance, weight gain, and lethargy.",
        "Pitta": "This **Pitta imbalance** is a 'hot' type of diabetes, often linked to liver stress, inflammation, and intensity. This 'Tikshna Agni' (sharp fire) can 'burn out' the pancreas, and your symptoms (thirst, burning) are classic Pitta.",
        "Vata": "This **Vata imbalance** is the classic 'Dhatukshaya' (Type 1 or severe Type 2). It's caused by high anxiety and 'Visham Agni' (irregular digestion) *burning up* the body's tissues (Ojas), leading to unexpected weight *loss*, fatigue, and dryness."
      },
      "Hypertension": {
        "Vata": "This **Vata imbalance** drives hypertension through the nervous system. High anxiety, worry, and irregularity ('Visham Agni') put your body in a constant state of 'fight-or-flight', constricting blood vessels and causing erratic BP spikes.",
        "Pitta": "This **Pitta imbalance** drives hypertension through 'heat' and 'inflammation'. High stress, anger, and intensity (Pitta) heat the blood, causing it to 'boil over', leading to flushing, headaches, and high pressure.",
        "Kapha": "This **Kapha imbalance** drives hypertension through 'congestion'. Excess 'heavy' and 'oily' qualities (from high salt, dairy, fat) literally 'clog' the channels, narrowing the vessels and forcing the heart to work harder."
      },
      "Cholesterol/Lipid": {
        "Kapha": "This is a classic **Kapha imbalance** of 'Meda Dhatu' (fat tissue). A slow, heavy 'Manda Agni' (digestion) fails to process fats, turning them into 'Ama' (sticky toxins) that clog the channels (Shrotas).",
        "Pitta": "This **Pitta imbalance** is a 'hot' condition of the blood and liver. The liver (Pitta's site) is 'over-heated' and not processing fats correctly, leading to inflammation and high triglycerides.",
        "Vata": "This **Vata imbalance** is a 'dry' type. Your body is 'dry' and 'anxious', so it's *holding on* to fats to lubricate itself. This also makes arteries brittle."
      },
      "PCOD/PCOS": {
        "Kapha": "This is a classic **Kapha imbalance**. The 'heavy', 'cold', and 'sticky' qualities of Kapha are *blocking* the reproductive channels, leading to cysts (Kapha accumulation), weight gain, and delayed periods.",
        "Pitta": "This is a **Pitta imbalance** driven by 'heat' and 'inflammation'. Excess Pitta 'overheats' the blood and hormones, leading to inflammatory symptoms like acne, hair loss (hirsutism), and heavy/painful periods.",
        "Vata": "This is a **Vata imbalance** driven by 'irregularity' and 'dryness'. High Vata (anxiety, irregular routine) disrupts the hormonal axis, leading to *erratic*, *painful*, or *scanty* periods and dryness."
      },
      "Asthma": {
        "Kapha": "This is a 'wet' type of asthma, a classic **Kapha imbalance**. Excess mucus and phlegm (Kapha) are 'clogging' the bronchial tubes, leading to a productive, 'congestive' cough.",
        "Pitta": "This is a 'hot', allergic type of asthma, a **Pitta imbalance**. The airways are *inflamed*, not just clogged. Allergens and heat trigger an inflammatory response, leading to a 'burning' cough.",
        "Vata": "This is a 'dry' type of asthma, a **Vata imbalance**. The airways are 'dry' and 'constricted' (spasm). This is triggered by cold, dry air and anxiety, leading to a dry, wheezing cough."
      },
      "Cardiac": {
        "Vata": "This **Vata imbalance** is affecting your heart via the nervous system, causing 'erratic' symptoms like palpitations, anxiety, and irregular rhythms.",
        "Pitta": "This **Pitta imbalance** is affecting your heart via 'inflammation'. High stress, anger, and 'heat' are inflaming the heart muscle and blood, leading to 'burning' sensations and intensity.",
        "Kapha": "This **Kapha imbalance** is 'congesting' the heart. Excess 'heavy' and 'oily' qualities (from cholesterol, edema) are physically burdening the heart, forcing it to work harder."
      },
      "Cancer (Breast/Prostate)": {
        "Vata": "This **Vata imbalance** is related to the side effects you are experiencing (fatigue, anxiety, insomnia, dryness, nerve pain). This is a *supportive plan only*.",
        "Pitta": "This **Pitta imbalance** is related to the side effects you are experiencing (inflammation, nausea, hot flashes, skin rashes, anger). This is a *supportive plan only*.",
        "Kapha": "This **Kapha imbalance** is related to the side effects you are experiencing (lethargy, heaviness, low appetite, congestion, water retention). This is a *supportive plan only*."
      },
      "Tobacco/Alcohol": {
        "Vata": "This **Vata imbalance** is driving the 'anxiety' and 'restlessness' that can lead to cravings. The substance then creates more 'dryness' and anxiety, a vicious cycle.",
        "Pitta": "This **Pitta imbalance** (stress, anger, intensity) is a key driver. Alcohol in particular is 'hot' and 'sharp', aggravating Pitta, inflaming the liver, and leading to 'hot' emotions.",
        "Kapha": "This **Kapha imbalance** (lethargy, boredom, congestion) is the driver. The 'dullness' of Kapha seeks a 'sharp' stimulus (like tobacco). This then creates *more* congestion in the lungs."
      },
      "Physical inactivity": {
        "Vata": "Your inactivity is driven by a **Vata imbalance**: restlessness, boredom, and 'wired-and-tired' fatigue.",
        "Pitta": "Your inactivity is driven by a **Pitta imbalance**: a 'workaholic' mindset ('no time') and 'all-or-nothing' perfectionism.",
        "Kapha": "Your inactivity is driven by a **Kapha imbalance**: classic 'lethargy' and 'lack of motivation'. The 'heavy' quality of Kapha makes it hard to start."
      },
      "Unhealthy diet": {
        "Vata": "Your diet is aggravating **Vata** through 'irregularity' ('Visham Agni'). Snacking, grazing, and eating cold/dry foods has weakened your digestion.",
        "Pitta": "Your diet is aggravating **Pitta** through 'intensity' ('Tikshna Agni'). Too much 'hot', 'spicy', and 'fried' food is inflaming your system.",
        "Kapha": "Your diet is aggravating **Kapha** through 'heaviness' ('Manda Agni'). Too much 'sweet', 'oily', and 'cold' food (dairy, sugar) has *extinguished* your digestive fire."
      },
      "Climate or air pollution": {
        "Vata": "You are having a **Vata reaction**: 'dryness' and 'constriction'. The 'dry' pollution is aggravating your Vata, leading to dry cough, dry sinuses, and anxiety.",
        "Pitta": "You are having a **Pitta reaction**: 'inflammation'. The 'hot', sharp pollutants are inflaming your blood and skin, leading to 'burning' eyes, skin rashes, and headaches.",
        "Kapha": "You are having a **Kapha reaction**: 'congestion'. The 'heavy' pollutants are creating mucus and phlegm, 'clogging' your sinuses and lungs."
      }
    };

    if (rationaleMap[disease] && rationaleMap[disease][vikriti]) {
      rationale += rationaleMap[disease][vikriti];
    } else {
      rationale += `This imbalance is directly related to the **${disease}** you've selected. Our plan will focus on pacifying **${vikriti}** to address the root cause of your symptoms.`;
    }

    return rationale;
  }

  buildPlan(vikriti, disease, flags) {
    const plan = {
      Yoga: [],
      Diet_Philosophy: "",
      Foods_To_Eat: [],
      Foods_To_Avoid: [],
      Lifestyle_Advice: [],
      Home_Remedies: [],
      Cautions: []
    };

    // 1. Add base plan items for dominant dosha & disease
    console.log(`Building plan for Vikriti: ${vikriti}, Disease: ${disease}`);
    console.log(`Available advice blocks: ${Object.keys(this.kb_advice_blocks).length}`);
    
    for (const [key, block] of Object.entries(this.kb_advice_blocks)) {
      // Match dosha first
      if (block.dosha === vikriti) {
        // If block has disease array, check if disease is in it
        // If no disease array, it's a general dosha-specific block (like Diet_Philosophy)
        const diseaseMatches = !block.disease || block.disease.length === 0 || block.disease.includes(disease);
        
        if (diseaseMatches) {
          if (block.category === "Yoga") {
            plan.Yoga.push(block);
          } else if (block.category === "Diet_Philosophy") {
            plan.Diet_Philosophy = block.details;
          } else if (block.category === "Foods_To_Eat") {
            plan.Foods_To_Eat.push(block);
          } else if (block.category === "Foods_To_Avoid") {
            plan.Foods_To_Avoid.push(block);
          } else if (block.category === "Lifestyle_Advice") {
            plan.Lifestyle_Advice.push(block);
          } else if (block.category === "Home_Remedies") {
            plan.Home_Remedies.push(block);
          } else if (block.category === "Cautions") {
            plan.Cautions.push(block.advice);
          }
        }
      }
    }
    
    console.log(`Plan built - Yoga: ${plan.Yoga.length}, Foods_To_Eat: ${plan.Foods_To_Eat.length}, Foods_To_Avoid: ${plan.Foods_To_Avoid.length}, Lifestyle: ${plan.Lifestyle_Advice.length}, Remedies: ${plan.Home_Remedies.length}`);

    // 2. Add tailored items based on answer flags
    console.log(`Processing ${flags.length} answer flags for personalized recommendations`);
    let addedFromFlags = 0;
    
    flags.forEach(flag => {
      if (this.kb_answer_map[flag]) {
        this.kb_answer_map[flag].forEach(adviceKey => {
          const block = this.kb_advice_blocks[adviceKey];
          if (!block) {
            console.warn(`Warning: Advice block "${adviceKey}" referenced in answer map but not found in advice blocks`);
            return;
          }

          if (block.category === "Yoga" && !plan.Yoga.find(b => b.advice === block.advice)) {
            plan.Yoga.push(block);
            addedFromFlags++;
          } else if (block.category === "Lifestyle_Advice" && !plan.Lifestyle_Advice.find(b => b.advice === block.advice)) {
            plan.Lifestyle_Advice.push(block);
            addedFromFlags++;
          } else if (block.category === "Home_Remedies" && !plan.Home_Remedies.find(b => b.advice === block.advice)) {
            plan.Home_Remedies.push(block);
            addedFromFlags++;
          } else if (block.category === "Foods_To_Eat" && !plan.Foods_To_Eat.find(b => b.advice === block.advice)) {
            plan.Foods_To_Eat.push(block);
            addedFromFlags++;
          } else if (block.category === "Foods_To_Avoid" && !plan.Foods_To_Avoid.find(b => b.advice === block.advice)) {
            plan.Foods_To_Avoid.push(block);
            addedFromFlags++;
          } else if (block.category === "Cautions" && !plan.Cautions.includes(block.advice)) {
            plan.Cautions.push(block.advice);
            addedFromFlags++;
          }
        });
      }
    });
    
    console.log(`Added ${addedFromFlags} items from answer flags`);
    console.log(`Final plan counts - Yoga: ${plan.Yoga.length}, Foods_To_Eat: ${plan.Foods_To_Eat.length}, Foods_To_Avoid: ${plan.Foods_To_Avoid.length}, Lifestyle: ${plan.Lifestyle_Advice.length}, Remedies: ${plan.Home_Remedies.length}, Cautions: ${plan.Cautions.length}`);

    return plan;
  }

  generatePersonalizedPlan(userData) {
    const {
      prakritiType,
      diseases,
      generalAnswers,
      diseaseAnswers,
      dietaryPreferences,
      stressLevel
    } = userData;

    // Analyze imbalance
    this.analyzeImbalance(generalAnswers, diseaseAnswers, diseases);
    
    const vikriti = this.analysis.dominant_vikriti;
    const flags = this.analysis.symptom_flags;
    const primaryDisease = diseases[0]; // Use first disease as primary

    // Build the plan
    const detailedPlan = this.buildPlan(vikriti, primaryDisease, flags);

    // Generate diagnostic rationale
    const diagnosticRationale = this.generateDiagnosticRationale(
      prakritiType,
      primaryDisease,
      vikriti,
      this.analysis.vikriti_scores
    );

    // Convert to web format
    console.log('Converting plan to web format...');
    console.log(`Detailed plan has: Yoga=${detailedPlan.Yoga.length}, Foods_To_Eat=${detailedPlan.Foods_To_Eat.length}, Lifestyle=${detailedPlan.Lifestyle_Advice.length}, Remedies=${detailedPlan.Home_Remedies.length}`);
    
    const webPlan = {
      yogaPoses: detailedPlan.Yoga.map(block => ({
        name: block.advice.split('(')[0].trim(),
        sanskritName: block.advice.includes('(') ? block.advice.split('(')[1].replace(')', '') : '',
        description: block.details || "",
        instructions: [block.details || ""],
        benefits: [block.advice],
        whyAyurvedic: block.details || "Based on your dosha and condition",
        duration: "As recommended"
      })),
      dietPlan: {
        foodsToEat: detailedPlan.Foods_To_Eat.map(block => ({
          name: block.advice,
          reason: block.rationale || block.details || "",
          timing: "As needed"
        })),
        foodsToAvoid: detailedPlan.Foods_To_Avoid.map(block => ({
          name: block.advice,
          reason: block.rationale || block.details || ""
        })),
        mealSchedule: [
          { meal: "Breakfast", time: "7-9 AM", suggestions: ["Follow dosha-specific guidelines"] },
          { meal: "Lunch", time: "12-1 PM", suggestions: ["Main meal of the day"] },
          { meal: "Dinner", time: "6-7 PM", suggestions: ["Light and early"] }
        ]
      },
      lifestyleTips: detailedPlan.Lifestyle_Advice.map(block => ({
        tip: block.advice,
        reason: block.rationale || block.details || "",
        category: "Daily Routine"
      })),
      dosAndDonts: {
        dos: [],
        donts: []
      },
      herbalRecommendations: detailedPlan.Home_Remedies.map(block => ({
        herbName: block.advice,
        benefits: [block.rationale || block.details || ""],
        usage: block.details || "As recommended",
        precautions: detailedPlan.Cautions.join("; ") || "Consult your physician"
      })),
      diagnosticRationale,
      priorityActions: [
        detailedPlan.Diet_Philosophy ? "Follow the diet philosophy: " + detailedPlan.Diet_Philosophy : "Follow dosha-specific dietary guidelines",
        detailedPlan.Yoga.length > 0 ? "Practice recommended yoga poses daily" : "Incorporate daily movement and exercise",
        detailedPlan.Lifestyle_Advice.length > 0 ? "Follow lifestyle advice consistently" : "Maintain a regular daily routine"
      ],
      cautions: detailedPlan.Cautions
    };
    
    console.log('Final web plan structure:', {
      yogaPoses: webPlan.yogaPoses.length,
      dietPlan: { 
        foodsToEat: webPlan.dietPlan.foodsToEat.length,
        foodsToAvoid: webPlan.dietPlan.foodsToAvoid.length
      },
      lifestyleTips: webPlan.lifestyleTips.length,
      herbalRecommendations: webPlan.herbalRecommendations.length,
      hasDiagnosticRationale: !!webPlan.diagnosticRationale,
      cautions: webPlan.cautions.length
    });
    
    return webPlan;
  }
}

module.exports = { AyurvedicDoctor, getGeneralQuestions, getDiseaseQuestions, DISEASE_LIST };

