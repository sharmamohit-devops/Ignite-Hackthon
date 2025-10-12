// LocalStorage Service - Backend Replacement
import { 
  posts, 
  complaints, 
  members, 
  vendors, 
  polls, 
  pendingMembers, 
  pendingCommunities,
  chatbotResponses 
} from "@/data/mockData";

// Storage Keys
const STORAGE_KEYS = {
  USERS: 'sampark_users',
  POSTS: 'sampark_posts',
  COMMENTS: 'sampark_comments',
  COMPLAINTS: 'sampark_complaints',
  MEMBERS: 'sampark_members',
  VENDORS: 'sampark_vendors',
  POLLS: 'sampark_polls',
  PENDING_MEMBERS: 'sampark_pending_members',
  PENDING_COMMUNITIES: 'sampark_pending_communities',
  BUY_SELL: 'sampark_buy_sell',
  RESOURCES: 'sampark_resources',
  SKILLS: 'sampark_skills',
  CURRENT_USER: 'sampark_current_user',
  INITIALIZED: 'sampark_initialized'
};

// User Interface
export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'resident' | 'secretary' | 'area-head';
  flat?: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

// Force clear and re-initialize (for debugging)
export const forceInitialize = () => {
  console.log('🔄 Force initializing localStorage...');
  localStorage.clear();
  localStorage.removeItem(STORAGE_KEYS.INITIALIZED);
  initializeStorage();
};

// Initialize localStorage with default data
export const initializeStorage = () => {
  const initialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
  
  console.log('🔍 Checking initialization...', initialized);
  
  if (!initialized) {
    console.log('📦 First time initialization...');
    // Default users for demo
    const defaultUsers: User[] = [
      {
        id: 1,
        email: 'resident@sampark.com',
        password: 'password123',
        name: 'Rahul Sharma',
        role: 'resident',
        flat: 'A-101',
        phone: '9876543210',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=resident',
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        email: 'secretary@sampark.com',
        password: 'password123',
        name: 'Priya Verma',
        role: 'secretary',
        phone: '9876543211',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=secretary',
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        email: 'areahead@sampark.com',
        password: 'password123',
        name: 'Amit Kumar',
        role: 'area-head',
        phone: '9876543212',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=areahead',
        createdAt: new Date().toISOString()
      }
    ];

    // Add userId to existing posts for ownership tracking
    const postsWithUserId = posts.map((post: any) => ({
      ...post,
      userId: post.userId || 1 // Default to user 1 if not set
    }));

    // Add userId to existing complaints for ownership tracking
    const complaintsWithUserId = complaints.map((complaint: any) => ({
      ...complaint,
      userId: complaint.userId || 1 // Default to user 1 if not set
    }));

    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(postsWithUserId));
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.COMPLAINTS, JSON.stringify(complaintsWithUserId));
    localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members));
    localStorage.setItem(STORAGE_KEYS.VENDORS, JSON.stringify(vendors));
    localStorage.setItem(STORAGE_KEYS.POLLS, JSON.stringify(polls));
    localStorage.setItem(STORAGE_KEYS.PENDING_MEMBERS, JSON.stringify(pendingMembers));
    localStorage.setItem(STORAGE_KEYS.PENDING_COMMUNITIES, JSON.stringify(pendingCommunities));
    localStorage.setItem(STORAGE_KEYS.BUY_SELL, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
    
    console.log('✅ LocalStorage initialized successfully!');
    console.log('📊 Posts:', postsWithUserId.length);
    console.log('📊 Complaints:', complaintsWithUserId.length);
    console.log('👥 Users:', defaultUsers.length);
  } else {
    console.log('✅ LocalStorage already initialized');
    const posts = getFromStorage(STORAGE_KEYS.POSTS);
    const complaints = getFromStorage(STORAGE_KEYS.COMPLAINTS);
    console.log('📊 Current Posts:', posts.length);
    console.log('📊 Current Complaints:', complaints.length);
  }
};

// Generic CRUD Operations
export const getFromStorage = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const saveToStorage = <T>(key: string, data: T[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const addToStorage = <T extends { id: number }>(key: string, item: Omit<T, 'id'>): T => {
  const items = getFromStorage<T>(key);
  const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
  const newItem = { ...item, id: newId } as T;
  items.push(newItem);
  saveToStorage(key, items);
  console.log(`✅ Added to ${key}:`, newItem);
  console.log(`📊 Total items in ${key}:`, items.length);
  return newItem;
};

export const updateInStorage = <T extends { id: number }>(key: string, id: number, updates: Partial<T>): T | null => {
  const items = getFromStorage<T>(key);
  const index = items.findIndex(item => item.id === id);
  
  if (index !== -1) {
    items[index] = { ...items[index], ...updates };
    saveToStorage(key, items);
    return items[index];
  }
  return null;
};

export const deleteFromStorage = <T extends { id: number }>(key: string, id: number): boolean => {
  const items = getFromStorage<T>(key);
  const filtered = items.filter(item => item.id !== id);
  
  if (filtered.length !== items.length) {
    saveToStorage(key, filtered);
    console.log(`🗑️ Deleted from ${key}, ID:`, id);
    console.log(`📊 Remaining items in ${key}:`, filtered.length);
    return true;
  }
  return false;
};

// User Management
export const getAllUsers = (): User[] => {
  return getFromStorage<User>(STORAGE_KEYS.USERS);
};

export const getUserByEmail = (email: string): User | null => {
  const users = getAllUsers();
  return users.find(u => u.email === email) || null;
};

export const createUser = (userData: Omit<User, 'id' | 'createdAt'>): User => {
  const users = getAllUsers();
  const newUser: User = {
    ...userData,
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  saveToStorage(STORAGE_KEYS.USERS, users);
  return newUser;
};

// Current User Session
export const setCurrentUser = (user: User): void => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
};

export const getCurrentUser = (): User | null => {
  const userData = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return userData ? JSON.parse(userData) : null;
};

export const clearCurrentUser = (): void => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};

// Posts
export const getPosts = () => getFromStorage(STORAGE_KEYS.POSTS);
export const getPostsByUser = (userId: number) => {
  const posts = getPosts();
  return posts.filter((p: any) => p.userId === userId);
};
export const addPost = (post: any) => addToStorage(STORAGE_KEYS.POSTS, post);
export const updatePost = (id: number, updates: any) => updateInStorage(STORAGE_KEYS.POSTS, id, updates);
export const deletePost = (id: number) => deleteFromStorage(STORAGE_KEYS.POSTS, id);

// Comments
export const getComments = () => getFromStorage(STORAGE_KEYS.COMMENTS);
export const getCommentsByPost = (postId: number) => {
  const comments = getComments();
  return comments.filter((c: any) => c.postId === postId);
};
export const addComment = (comment: any) => addToStorage(STORAGE_KEYS.COMMENTS, comment);
export const deleteComment = (id: number) => deleteFromStorage(STORAGE_KEYS.COMMENTS, id);

// Complaints
export const getComplaints = () => getFromStorage(STORAGE_KEYS.COMPLAINTS);
export const getComplaintsByUser = (userId: number) => {
  const complaints = getComplaints();
  return complaints.filter((c: any) => c.userId === userId);
};
export const addComplaint = (complaint: any) => addToStorage(STORAGE_KEYS.COMPLAINTS, complaint);
export const updateComplaint = (id: number, updates: any) => updateInStorage(STORAGE_KEYS.COMPLAINTS, id, updates);
export const deleteComplaint = (id: number) => deleteFromStorage(STORAGE_KEYS.COMPLAINTS, id);

// Members
export const getMembers = () => getFromStorage(STORAGE_KEYS.MEMBERS);
export const addMember = (member: any) => addToStorage(STORAGE_KEYS.MEMBERS, member);

// Vendors
export const getVendors = () => getFromStorage(STORAGE_KEYS.VENDORS);

// Polls
export const getPolls = () => getFromStorage(STORAGE_KEYS.POLLS);
export const updatePoll = (id: number, updates: any) => updateInStorage(STORAGE_KEYS.POLLS, id, updates);

// Pending Members
export const getPendingMembers = () => getFromStorage(STORAGE_KEYS.PENDING_MEMBERS);
export const approveMember = (id: number) => {
  const pending = getPendingMembers();
  const member = pending.find((m: any) => m.id === id);
  if (member) {
    addMember(member);
    deleteFromStorage(STORAGE_KEYS.PENDING_MEMBERS, id);
  }
};
export const rejectMember = (id: number) => deleteFromStorage(STORAGE_KEYS.PENDING_MEMBERS, id);

// Pending Communities
export const getPendingCommunities = () => getFromStorage(STORAGE_KEYS.PENDING_COMMUNITIES);
export const approveCommunity = (id: number) => deleteFromStorage(STORAGE_KEYS.PENDING_COMMUNITIES, id);
export const rejectCommunity = (id: number) => deleteFromStorage(STORAGE_KEYS.PENDING_COMMUNITIES, id);

// Buy & Sell
export const getBuySellItems = () => getFromStorage(STORAGE_KEYS.BUY_SELL);
export const addBuySellItem = (item: any) => addToStorage(STORAGE_KEYS.BUY_SELL, item);

// Resources
export const getResourceItems = () => getFromStorage(STORAGE_KEYS.RESOURCES);
export const addResourceItem = (item: any) => addToStorage(STORAGE_KEYS.RESOURCES, item);

// Skills
export const getSkillItems = () => getFromStorage(STORAGE_KEYS.SKILLS);
export const addSkillItem = (item: any) => addToStorage(STORAGE_KEYS.SKILLS, item);

// Clear all data (for testing)
export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};

// Export storage keys for direct access if needed
export { STORAGE_KEYS };

// Debug helper - expose to window for console access
if (typeof window !== 'undefined') {
  (window as any).debugStorage = {
    init: initializeStorage,
    forceInit: forceInitialize,
    getPosts: getPosts,
    getComments: getComments,
    getComplaints: getComplaints,
    getUsers: getAllUsers,
    getCurrentUser: getCurrentUser,
    clear: () => {
      localStorage.clear();
      console.log('🗑️ LocalStorage cleared');
    },
    reset: () => {
      console.log('🔄 Resetting to fresh mock data...');
      localStorage.clear();
      initializeStorage();
      console.log('✅ Reset complete! Refresh page to see changes.');
    },
    status: () => {
      console.log('=== LocalStorage Status ===');
      console.log('Initialized:', localStorage.getItem(STORAGE_KEYS.INITIALIZED));
      console.log('Posts:', getPosts().length);
      console.log('Comments:', getComments().length);
      console.log('Complaints:', getComplaints().length);
      console.log('Users:', getAllUsers().length);
      console.log('Current User:', getCurrentUser()?.email || 'Not logged in');
      console.log('All Keys:', Object.keys(localStorage).filter(k => k.startsWith('sampark_')));
    }
  };
  console.log('🔧 Debug tools available: window.debugStorage');
  console.log('   - debugStorage.status() - Check status');
  console.log('   - debugStorage.reset() - Reset to fresh data');
  console.log('   - debugStorage.forceInit() - Force re-initialize');
  console.log('   - debugStorage.clear() - Clear all data');
}
