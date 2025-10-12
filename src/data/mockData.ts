export const posts = [
  {
    id: 1,
    author: "Society Secretary",
    role: "Admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    content: "📢 Important Notice: The annual general meeting will be held on Saturday, 15th June at 10 AM in the community hall. All residents are requested to attend. Agenda includes budget discussion, upcoming maintenance work, and new security protocols.",
    timestamp: "2 hours ago",
    isPinned: true,
    likes: 45,
    comments: 3,
    translatedContent: "📢 महत्वपूर्ण सूचना: वार्षिक आम बैठक शनिवार, 15 जून को सुबह 10 बजे सामुदायिक हॉल में आयोजित की जाएगी।",
    userId: 2,
    showTranslation: false
  },
  {
    id: 2,
    author: "Rajesh Kumar",
    role: "Resident",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh",
    content: "Good morning everyone! The lift in Block A has been making strange noises since yesterday. Has anyone else noticed this? Should we report it to maintenance?",
    timestamp: "5 hours ago",
    isPinned: false,
    likes: 23,
    comments: 2,
    translatedContent: "सभी को सुप्रभात! ब्लॉक ए की लिफ्ट कल से अजीब आवाजें कर रही है। क्या किसी और ने इसे देखा है?",
    userId: 1,
    showTranslation: false
  },
  {
    id: 3,
    author: "Priya Sharma",
    role: "Resident",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
    content: "Thanks to whoever organized the kids' art workshop last weekend! My daughter loved it and made some beautiful paintings. Looking forward to more such events! 🎨",
    timestamp: "1 day ago",
    isPinned: false,
    likes: 67,
    comments: 4,
    translatedContent: "पिछले सप्ताहांत में बच्चों की कला कार्यशाला का आयोजन करने वाले को धन्यवाद! मेरी बेटी ने इसे बहुत पसंद किया।",
    userId: 1,
    showTranslation: false
  },
  {
    id: 4,
    author: "Amit Patel",
    role: "Resident",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=amit",
    content: "Does anyone know a good plumber? Need to fix a leaking tap in my kitchen. Please share contact details if you have any recommendations.",
    timestamp: "2 days ago",
    isPinned: false,
    likes: 12,
    comments: 5,
    translatedContent: "क्या किसी को अच्छा प्लंबर पता है? मेरी रसोई में नल से पानी टपक रहा है।",
    userId: 1,
    showTranslation: false
  },
  {
    id: 5,
    author: "Neha Gupta",
    role: "Resident",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=neha",
    content: "Reminder: Garbage collection timings have changed. Now it's 7 AM instead of 8 AM. Please keep your bins ready by 6:45 AM. 🗑️",
    timestamp: "3 days ago",
    isPinned: false,
    likes: 34,
    comments: 1,
    translatedContent: "अनुस्मारक: कचरा संग्रहण का समय बदल गया है। अब यह 8 बजे के बजाय 7 बजे है।",
    userId: 1,
    showTranslation: false
  }
];

export const complaints = [
  {
    id: 1,
    title: "Street Light Not Working",
    description: "The street light near Block C gate has been non-functional for the past week. It's causing safety concerns during night time.",
    status: "In Progress",
    category: "Maintenance",
    priority: "High",
    submittedBy: "Amit Verma",
    submittedOn: "2024-06-10",
    location: "Block C Gate",
    imageUrl: null
  },
  {
    id: 2,
    title: "Water Leakage in Common Area",
    description: "There is continuous water leakage in the ground floor corridor near the mailboxes.",
    status: "Resolved",
    category: "Plumbing",
    priority: "Medium",
    submittedBy: "Neha Patel",
    submittedOn: "2024-06-08",
    location: "Ground Floor Corridor",
    imageUrl: null
  },
  {
    id: 3,
    title: "Parking Space Issue",
    description: "Visitors are parking in reserved spots. Need better signage and enforcement.",
    status: "Pending",
    category: "Management",
    priority: "Low",
    submittedBy: "Vikram Singh",
    submittedOn: "2024-06-12",
    location: "Parking Area",
    imageUrl: null
  }
];

export const buyAndSell = [
  {
    id: 1,
    title: "Washing Machine - Front Load",
    price: "₹8,500",
    description: "Samsung 6kg front load washing machine in excellent condition. Used for 2 years.",
    seller: "Kavya Reddy",
    contact: "9876543210",
    imageUrl: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400",
    postedOn: "2 days ago"
  },
  {
    id: 2,
    title: "Study Table with Chair",
    price: "₹2,000",
    description: "Wooden study table with matching chair. Perfect for kids or home office.",
    seller: "Manish Gupta",
    contact: "9765432109",
    imageUrl: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=400",
    postedOn: "1 week ago"
  },
  {
    id: 3,
    title: "Bicycle - Mountain Bike",
    price: "₹5,000",
    description: "Hero Sprint mountain bike, 21 gears, good condition.",
    seller: "Arjun Nair",
    contact: "9654321098",
    imageUrl: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400",
    postedOn: "3 days ago"
  }
];

export const resourceSharing = [
  {
    id: 1,
    title: "Looking to borrow a ladder",
    description: "Need a ladder for 2-3 hours this weekend to fix a ceiling fan. Will return in perfect condition.",
    requester: "Rohit Malhotra",
    status: "Open",
    responses: 3
  },
  {
    id: 2,
    title: "Car wash equipment available",
    description: "Have a portable car wash system. Anyone can borrow on weekends.",
    provider: "Deepak Joshi",
    status: "Available",
    responses: 7
  }
];

export const skillExchange = [
  {
    id: 1,
    title: "Guitar Lessons for Math Tutoring",
    description: "I can teach guitar (5 years experience) in exchange for help with Class 10 mathematics.",
    offerer: "Sanjay Mehta",
    seeking: "Math Tutoring",
    responses: 4
  },
  {
    id: 2,
    title: "Web Design for Cooking Classes",
    description: "Professional web designer willing to create a website in exchange for cooking lessons.",
    offerer: "Ananya Das",
    seeking: "Cooking Classes",
    responses: 2
  }
];

export const members = [
  { id: 1, name: "Rajesh Kumar", flat: "A-101", phone: "9876543210", email: "rajesh@email.com" },
  { id: 2, name: "Priya Sharma", flat: "A-203", phone: "9876543211", email: "priya@email.com" },
  { id: 3, name: "Amit Verma", flat: "B-105", phone: "9876543212", email: "amit@email.com" },
  { id: 4, name: "Neha Patel", flat: "B-207", phone: "9876543213", email: "neha@email.com" },
  { id: 5, name: "Vikram Singh", flat: "C-301", phone: "9876543214", email: "vikram@email.com" },
  { id: 6, name: "Kavya Reddy", flat: "C-404", phone: "9876543215", email: "kavya@email.com" },
];

export const vendors = [
  {
    id: 1,
    name: "QuickFix Plumbing",
    category: "Plumber",
    phone: "9123456789",
    rating: 4.5,
    approved: true
  },
  {
    id: 2,
    name: "Spark Electricals",
    category: "Electrician",
    phone: "9123456788",
    rating: 4.8,
    approved: true
  },
  {
    id: 3,
    name: "Green Thumb Gardens",
    category: "Gardener",
    phone: "9123456787",
    rating: 4.2,
    approved: true
  },
  {
    id: 4,
    name: "CleanSweep Services",
    category: "Cleaning",
    phone: "9123456786",
    rating: 4.6,
    approved: true
  }
];

export const polls = [
  {
    id: 1,
    question: "Should we organize a community cricket tournament?",
    options: [
      { id: 1, text: "Yes, definitely!", votes: 45 },
      { id: 2, text: "Maybe, depends on timing", votes: 23 },
      { id: 3, text: "No, not interested", votes: 8 }
    ],
    totalVotes: 76,
    endDate: "2024-06-20",
    active: true
  },
  {
    id: 2,
    question: "Preferred timing for yoga classes?",
    options: [
      { id: 1, text: "Morning (6-7 AM)", votes: 34 },
      { id: 2, text: "Evening (6-7 PM)", votes: 52 },
      { id: 3, text: "Weekend mornings", votes: 28 }
    ],
    totalVotes: 114,
    endDate: "2024-06-18",
    active: true
  }
];

export const pendingMembers = [
  {
    id: 1,
    name: "Rahul Sharma",
    flat: "D-502",
    email: "rahul@email.com",
    phone: "9988776655",
    appliedOn: "2024-06-10",
    documents: "ID Proof, Address Proof"
  },
  {
    id: 2,
    name: "Sneha Iyer",
    flat: "D-603",
    email: "sneha@email.com",
    phone: "9988776656",
    appliedOn: "2024-06-11",
    documents: "ID Proof, Address Proof"
  }
];

export const pendingCommunities = [
  {
    id: 1,
    name: "Green Valley Apartments",
    secretary: "Mohan Das",
    location: "Sector 12, Noida",
    members: 150,
    email: "secretary@greenvalley.com",
    appliedOn: "2024-06-08",
    documents: "Society Registration, Secretary ID"
  },
  {
    id: 2,
    name: "Sunrise Heights",
    secretary: "Lakshmi Pillai",
    location: "Sector 18, Gurugram",
    members: 200,
    email: "admin@sunriseheights.com",
    appliedOn: "2024-06-09",
    documents: "Society Registration, Secretary ID"
  }
];

export const chatbotResponses: Record<string, string> = {
  "maintenance": "🔧 The next maintenance is scheduled for Friday, June 14th at 11 AM. The team will be working on plumbing and electrical inspections.",
  "meeting": "📅 The next general body meeting is on Saturday, June 15th at 10 AM in the community hall.",
  "payment": "💳 Monthly maintenance payments are due by the 5th of each month. You can pay online through the society's payment portal or UPI.",
  "complaint": "📝 To file a complaint, please visit the Complaint Box section and click on 'File New Complaint'. You can track the status there.",
  "contact": "📞 Society Office: 011-12345678 | Secretary: 9876543210 | Security: 9876543211",
  "emergency": "🚨 For emergencies, use the SOS button in the header or call: Medical: 102 | Fire: 101 | Police: 100"
};
