"""
Kalachakra — Celestial Computation Engine Configuration
========================================================
Constants, lookup tables, and reference data for Vedic astronomical calculations.
"""

import math

# ---------------------------------------------------------------------------
# Ayanamsha Configuration
# ---------------------------------------------------------------------------
# Lahiri (Chitrapaksha) ayanamsha is the Indian government standard (N.C. Lahiri).
# swisseph constant: SE_SIDM_LAHIRI = 1
AYANAMSHA_MODE = 1  # Lahiri / Chitrapaksha

# ---------------------------------------------------------------------------
# Default Location — Ujjain (उज्जैन)
# ---------------------------------------------------------------------------
# The Tropic of Cancer passes through Ujjain, making it the traditional
# prime meridian of Indian astronomy (Ujjayini meridian).
DEFAULT_LATITUDE = 23.1793
DEFAULT_LONGITUDE = 75.7849
DEFAULT_TIMEZONE = "Asia/Kolkata"
DEFAULT_CITY = "Ujjain (उज्जैन)"

# ---------------------------------------------------------------------------
# Vikram Samvat Offset
# ---------------------------------------------------------------------------
# Vikram Samvat = Gregorian Year + 57 (approximately; the new year starts
# around Chaitra Shukla Pratipada, typically March/April).
SAMVAT_OFFSET = 57

# ---------------------------------------------------------------------------
# Rashi (Zodiac Sign) Names — Sidereal
# ---------------------------------------------------------------------------
RASHI_NAMES = [
    {"index": 1,  "english": "Aries",       "sanskrit": "मेष",    "hindi": "Mesh"},
    {"index": 2,  "english": "Taurus",      "sanskrit": "वृषभ",   "hindi": "Vrishabh"},
    {"index": 3,  "english": "Gemini",      "sanskrit": "मिथुन",  "hindi": "Mithun"},
    {"index": 4,  "english": "Cancer",      "sanskrit": "कर्क",   "hindi": "Kark"},
    {"index": 5,  "english": "Leo",         "sanskrit": "सिंह",   "hindi": "Simha"},
    {"index": 6,  "english": "Virgo",       "sanskrit": "कन्या",  "hindi": "Kanya"},
    {"index": 7,  "english": "Libra",       "sanskrit": "तुला",   "hindi": "Tula"},
    {"index": 8,  "english": "Scorpio",     "sanskrit": "वृश्चिक", "hindi": "Vrishchik"},
    {"index": 9,  "english": "Sagittarius", "sanskrit": "धनु",    "hindi": "Dhanu"},
    {"index": 10, "english": "Capricorn",   "sanskrit": "मकर",    "hindi": "Makar"},
    {"index": 11, "english": "Aquarius",    "sanskrit": "कुम्भ",   "hindi": "Kumbh"},
    {"index": 12, "english": "Pisces",      "sanskrit": "मीन",    "hindi": "Meen"},
]

# ---------------------------------------------------------------------------
# Nakshatra (Lunar Mansion) Names — 27 Nakshatras
# ---------------------------------------------------------------------------
NAKSHATRA_NAMES = [
    {"index": 1,  "english": "Ashwini",       "sanskrit": "अश्विनी",      "deity": "Ashwini Kumars"},
    {"index": 2,  "english": "Bharani",       "sanskrit": "भरणी",        "deity": "Yama"},
    {"index": 3,  "english": "Krittika",      "sanskrit": "कृत्तिका",     "deity": "Agni"},
    {"index": 4,  "english": "Rohini",        "sanskrit": "रोहिणी",       "deity": "Brahma"},
    {"index": 5,  "english": "Mrigashira",    "sanskrit": "मृगशिरा",     "deity": "Soma"},
    {"index": 6,  "english": "Ardra",         "sanskrit": "आर्द्रा",       "deity": "Rudra"},
    {"index": 7,  "english": "Punarvasu",     "sanskrit": "पुनर्वसु",     "deity": "Aditi"},
    {"index": 8,  "english": "Pushya",        "sanskrit": "पुष्य",        "deity": "Brihaspati"},
    {"index": 9,  "english": "Ashlesha",      "sanskrit": "आश्लेषा",      "deity": "Naga"},
    {"index": 10, "english": "Magha",         "sanskrit": "मघा",         "deity": "Pitris"},
    {"index": 11, "english": "Purva Phalguni","sanskrit": "पूर्वा फाल्गुनी","deity": "Bhaga"},
    {"index": 12, "english": "Uttara Phalguni","sanskrit":"उत्तरा फाल्गुनी","deity": "Aryaman"},
    {"index": 13, "english": "Hasta",         "sanskrit": "हस्त",         "deity": "Savitar"},
    {"index": 14, "english": "Chitra",        "sanskrit": "चित्रा",        "deity": "Tvashtar"},
    {"index": 15, "english": "Swati",         "sanskrit": "स्वाती",        "deity": "Vayu"},
    {"index": 16, "english": "Vishakha",      "sanskrit": "विशाखा",       "deity": "Indra-Agni"},
    {"index": 17, "english": "Anuradha",      "sanskrit": "अनुराधा",      "deity": "Mitra"},
    {"index": 18, "english": "Jyeshtha",      "sanskrit": "ज्येष्ठा",      "deity": "Indra"},
    {"index": 19, "english": "Mula",          "sanskrit": "मूल",          "deity": "Nirriti"},
    {"index": 20, "english": "Purva Ashadha", "sanskrit": "पूर्वाषाढा",    "deity": "Apas"},
    {"index": 21, "english": "Uttara Ashadha","sanskrit": "उत्तराषाढा",   "deity": "Vishve Devas"},
    {"index": 22, "english": "Shravana",      "sanskrit": "श्रवण",        "deity": "Vishnu"},
    {"index": 23, "english": "Dhanishtha",    "sanskrit": "धनिष्ठा",      "deity": "Vasu"},
    {"index": 24, "english": "Shatabhisha",   "sanskrit": "शतभिषा",      "deity": "Varuna"},
    {"index": 25, "english": "Purva Bhadrapada","sanskrit":"पूर्वभाद्रपदा","deity": "Aja Ekapada"},
    {"index": 26, "english": "Uttara Bhadrapada","sanskrit":"उत्तरभाद्रपदा","deity": "Ahir Budhnya"},
    {"index": 27, "english": "Revati",        "sanskrit": "रेवती",        "deity": "Pushan"},
]

# ---------------------------------------------------------------------------
# Tithi Names — 30 Tithis (15 Shukla + 15 Krishna)
# ---------------------------------------------------------------------------
TITHI_NAMES = [
    "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
    "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
    "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima",
    "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami",
    "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami",
    "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Amavasya",
]

TITHI_NAMES_SANSKRIT = [
    "प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पञ्चमी",
    "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी",
    "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "पूर्णिमा",
    "प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पञ्चमी",
    "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी",
    "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "अमावस्या",
]

TITHI_DEITIES = [
    "Agni", "Brahma", "Gauri", "Ganesh", "Sarpa",
    "Kartikeya", "Surya", "Shiva", "Durga", "Yama",
    "Vishvedeva", "Vishnu", "Kamadeva", "Shiva", "Chandra",
    "Agni", "Brahma", "Gauri", "Ganesh", "Sarpa",
    "Kartikeya", "Surya", "Shiva", "Durga", "Yama",
    "Vishvedeva", "Vishnu", "Kamadeva", "Shiva", "Pitris",
]

# ---------------------------------------------------------------------------
# Yoga Names — 27 Yogas
# ---------------------------------------------------------------------------
YOGA_NAMES = [
    {"english": "Vishkambha", "sanskrit": "विष्कम्भ"},
    {"english": "Priti",      "sanskrit": "प्रीति"},
    {"english": "Ayushman",   "sanskrit": "आयुष्मान्"},
    {"english": "Saubhagya",  "sanskrit": "सौभाग्य"},
    {"english": "Shobhana",   "sanskrit": "शोभन"},
    {"english": "Atiganda",   "sanskrit": "अतिगण्ड"},
    {"english": "Sukarma",    "sanskrit": "सुकर्मा"},
    {"english": "Dhriti",     "sanskrit": "धृति"},
    {"english": "Shula",      "sanskrit": "शूल"},
    {"english": "Ganda",      "sanskrit": "गण्ड"},
    {"english": "Vriddhi",    "sanskrit": "वृद्धि"},
    {"english": "Dhruva",     "sanskrit": "ध्रुव"},
    {"english": "Vyaghata",   "sanskrit": "व्याघात"},
    {"english": "Harshana",   "sanskrit": "हर्षण"},
    {"english": "Vajra",      "sanskrit": "वज्र"},
    {"english": "Siddhi",     "sanskrit": "सिद्धि"},
    {"english": "Vyatipata",  "sanskrit": "व्यतीपात"},
    {"english": "Variyan",    "sanskrit": "वरीयान्"},
    {"english": "Parigha",    "sanskrit": "परिघ"},
    {"english": "Shiva",      "sanskrit": "शिव"},
    {"english": "Siddha",     "sanskrit": "सिद्ध"},
    {"english": "Sadhya",     "sanskrit": "साध्य"},
    {"english": "Shubha",     "sanskrit": "शुभ"},
    {"english": "Shukla",     "sanskrit": "शुक्ल"},
    {"english": "Brahma",     "sanskrit": "ब्रह्म"},
    {"english": "Indra",      "sanskrit": "इन्द्र"},
    {"english": "Vaidhriti",  "sanskrit": "वैधृति"},
]

# ---------------------------------------------------------------------------
# Karana Names — 11 Karanas (4 fixed + 7 repeating)
# ---------------------------------------------------------------------------
KARANA_NAMES = [
    {"english": "Bava",      "sanskrit": "बव"},
    {"english": "Balava",    "sanskrit": "बालव"},
    {"english": "Kaulava",   "sanskrit": "कौलव"},
    {"english": "Taitila",   "sanskrit": "तैतिल"},
    {"english": "Garaja",    "sanskrit": "गरज"},
    {"english": "Vanija",    "sanskrit": "वणिज"},
    {"english": "Vishti",    "sanskrit": "विष्टि"},
    # Fixed Karanas (occur only once per lunar month):
    {"english": "Shakuni",   "sanskrit": "शकुनि"},
    {"english": "Chatushpada","sanskrit": "चतुष्पाद"},
    {"english": "Nagava",    "sanskrit": "नागव"},
    {"english": "Kimstughna","sanskrit": "किंस्तुघ्न"},
]

# ---------------------------------------------------------------------------
# Vaara (Weekday) Names
# ---------------------------------------------------------------------------
VAARA_NAMES = [
    {"index": 0, "english": "Monday",    "sanskrit": "सोमवार",    "deity": "Chandra (Moon)",    "planet": "Moon"},
    {"index": 1, "english": "Tuesday",   "sanskrit": "मंगलवार",   "deity": "Mangala (Mars)",    "planet": "Mars"},
    {"index": 2, "english": "Wednesday", "sanskrit": "बुधवार",    "deity": "Budha (Mercury)",   "planet": "Mercury"},
    {"index": 3, "english": "Thursday",  "sanskrit": "गुरुवार",    "deity": "Guru (Jupiter)",    "planet": "Jupiter"},
    {"index": 4, "english": "Friday",    "sanskrit": "शुक्रवार",   "deity": "Shukra (Venus)",    "planet": "Venus"},
    {"index": 5, "english": "Saturday",  "sanskrit": "शनिवार",    "deity": "Shani (Saturn)",    "planet": "Saturn"},
    {"index": 6, "english": "Sunday",    "sanskrit": "रविवार",     "deity": "Surya (Sun)",       "planet": "Sun"},
]

# ---------------------------------------------------------------------------
# Lunar Month Names (Chandra Masa)
# ---------------------------------------------------------------------------
LUNAR_MONTHS = [
    {"index": 1,  "english": "Chaitra",     "sanskrit": "चैत्र"},
    {"index": 2,  "english": "Vaishakha",   "sanskrit": "वैशाख"},
    {"index": 3,  "english": "Jyeshtha",    "sanskrit": "ज्येष्ठ"},
    {"index": 4,  "english": "Ashadha",     "sanskrit": "आषाढ"},
    {"index": 5,  "english": "Shravana",    "sanskrit": "श्रावण"},
    {"index": 6,  "english": "Bhadrapada",  "sanskrit": "भाद्रपद"},
    {"index": 7,  "english": "Ashwina",     "sanskrit": "आश्विन"},
    {"index": 8,  "english": "Kartika",     "sanskrit": "कार्तिक"},
    {"index": 9,  "english": "Margashirsha","sanskrit": "मार्गशीर्ष"},
    {"index": 10, "english": "Pausha",      "sanskrit": "पौष"},
    {"index": 11, "english": "Magha",       "sanskrit": "माघ"},
    {"index": 12, "english": "Phalguna",    "sanskrit": "फाल्गुन"},
]

# ---------------------------------------------------------------------------
# Ritu (Season) Names
# ---------------------------------------------------------------------------
RITU_NAMES = [
    {"english": "Vasanta (Spring)",   "sanskrit": "वसन्त ऋतु",   "months": [1, 2]},
    {"english": "Grishma (Summer)",   "sanskrit": "ग्रीष्म ऋतु",  "months": [3, 4]},
    {"english": "Varsha (Monsoon)",   "sanskrit": "वर्षा ऋतु",    "months": [5, 6]},
    {"english": "Sharad (Autumn)",    "sanskrit": "शरद् ऋतु",    "months": [7, 8]},
    {"english": "Hemanta (Pre-winter)","sanskrit":"हेमन्त ऋतु",  "months": [9, 10]},
    {"english": "Shishira (Winter)",  "sanskrit": "शिशिर ऋतु",   "months": [11, 12]},
]

# ---------------------------------------------------------------------------
# Planet Constants for Swiss Ephemeris
# ---------------------------------------------------------------------------
# swisseph planet IDs
PLANET_SUN     = 0
PLANET_MOON    = 1
PLANET_MARS    = 4
PLANET_MERCURY = 2
PLANET_JUPITER = 5
PLANET_VENUS   = 3
PLANET_SATURN  = 6
# Rahu and Ketu are calculated from the Moon's True Node
PLANET_RAHU    = 10  # SE_TRUE_NODE (mean node = 10, true node = 11 in some builds)
# Ketu = Rahu + 180°

GRAHA_INFO = [
    {"id": "sun",     "swe_id": PLANET_SUN,     "english": "Sun",     "sanskrit": "सूर्य",  "symbol": "☉"},
    {"id": "moon",    "swe_id": PLANET_MOON,    "english": "Moon",    "sanskrit": "चन्द्र", "symbol": "☽"},
    {"id": "mars",    "swe_id": PLANET_MARS,    "english": "Mars",    "sanskrit": "मंगल",  "symbol": "♂"},
    {"id": "mercury", "swe_id": PLANET_MERCURY, "english": "Mercury", "sanskrit": "बुध",   "symbol": "☿"},
    {"id": "jupiter", "swe_id": PLANET_JUPITER, "english": "Jupiter", "sanskrit": "गुरु",   "symbol": "♃"},
    {"id": "venus",   "swe_id": PLANET_VENUS,   "english": "Venus",   "sanskrit": "शुक्र",  "symbol": "♀"},
    {"id": "saturn",  "swe_id": PLANET_SATURN,  "english": "Saturn",  "sanskrit": "शनि",   "symbol": "♄"},
    {"id": "rahu",    "swe_id": PLANET_RAHU,    "english": "Rahu",    "sanskrit": "राहु",   "symbol": "☊"},
    {"id": "ketu",    "swe_id": -1,             "english": "Ketu",    "sanskrit": "केतु",   "symbol": "☋"},
]

# ---------------------------------------------------------------------------
# Samvat Year Name Cycle — 60-year Jovian (Brihaspati) cycle
# ---------------------------------------------------------------------------
SAMVAT_YEAR_NAMES = [
    "Prabhava (प्रभव)", "Vibhava (विभव)", "Shukla (शुक्ल)", "Pramodoota (प्रमोदूत)", "Prajothpatti (प्रजोत्पत्ति)",
    "Angirasa (आंगिरस)", "Shrimukha (श्रीमुख)", "Bhava (भाव)", "Yuva (युव)", "Dhatu (धातु)",
    "Ishvara (ईश्वर)", "Bahudhanya (बहुधान्य)", "Pramathi (प्रमाथी)", "Vikrama (विक्रम)", "Vrisha (वृष)",
    "Chitrabhanu (चित्रभानु)", "Subhanu (सुभानु)", "Tarana (तारण)", "Parthiva (पार्थिव)", "Vyaya (व्यय)",
    "Sarvajitu (सर्वजितु)", "Sarvadhari (सर्वधारी)", "Virodhi (विरोधी)", "Vikrita (विकृति)", "Khara (खर)",
    "Nandana (नन्दन)", "Vijaya (विजय)", "Jaya (जय)", "Manmatha (मन्मथ)", "Durmukhi (दुर्मुखी)",
    "Hevilambi (हेविलम्बी)", "Vilambi (विलम्बी)", "Vikari (विकारी)", "Sharvari (शार्वरी)", "Plava (प्लव)",
    "Shubhakruti (शुभकृतु)", "Shobhakruti (शोभकृतु)", "Krodhi (क्रोधी)", "Vishvavasu (विश्वावसु)", "Parabhava (पराभव)",
    "Plavanga (प्लवंग)", "Kilaka (कीलक)", "Saumya (सौम्य)", "Sadharana (साधारण)", "Virodhikruti (विरोधिकृतु)",
    "Paridhavi (परीधावी)", "Pramadicha (प्रमादीच)", "Ananda (आनन्द)", "Rakshasa (राक्षस)", "Nala (नल)",
    "Pingala (पिंगल)", "Kalayukti (कालयुक्ति)", "Siddharthi (सिद्धार्थी)", "Raudri (रौद्री)", "Durmathi (दुर्मति)",
    "Dundubhi (दुन्दुभि)", "Rudhirodgari (रुधिरोद्गारी)", "Raktakshi (रक्ताक्षी)", "Krodhana (क्रोधन)", "Akshaya (अक्षय)",
]

# ---------------------------------------------------------------------------
# Utility: Arc-degree span per unit
# ---------------------------------------------------------------------------
DEGREES_PER_RASHI = 30.0
DEGREES_PER_NAKSHATRA = 360.0 / 27.0  # 13°20'
DEGREES_PER_TITHI = 12.0
DEGREES_PER_YOGA = 360.0 / 27.0  # 13°20'
DEGREES_PER_KARANA = 6.0
