import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  targetRole?: string;
  experience?: string;
  preferences?: {
    learningStyle: string;
    timeCommitment: string;
    budget: string;
  };
  hasUploadedResume: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResumeAnalysis {
  id: string;
  userId: string;
  fileName: string;
  uploadedAt: Date;
  skills: Array<{
    name: string;
    category: string;
    confidence: number;
    proficiency: string;
    experience: string;
    marketDemand: string;
    trend: string;
    salaryImpact: string;
    isStrength: boolean;
    isGap?: boolean;
  }>;
  gaps: Array<{
    skill: string;
    currentLevel: number;
    targetLevel: number;
    priority: string;
    marketDemand: number;
    salaryImpact: string;
    timeToTarget: string;
    recommendedCourses: number;
  }>;
  recommendations: Array<{
    id: string;
    title: string;
    provider: string;
    url: string;
    price: string;
    rating: number;
    skillsAddressed: string[];
    matchScore: number;
  }>;
}

export interface CourseEnrollment {
  courseId: string;
  userId: string;
  enrolledAt: Date;
  status: 'enrolled' | 'in-progress' | 'completed';
  progress: number;
  timeSpent: number;
  lastAccessed?: Date;
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    if (!db) {
      console.warn('Firestore not initialized. Running in demo mode.');
      return null;
    }
    
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

export async function createUserProfile(profile: Omit<UserProfile, 'createdAt' | 'updatedAt'>): Promise<void> {
  try {
    if (!db) {
      console.warn('Firestore not initialized. Cannot create user profile.');
      return;
    }
    
    const docRef = doc(db, 'users', profile.uid);
    await setDoc(docRef, {
      ...profile,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
}

export async function updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<void> {
  try {
    if (!db) {
      console.warn('Firestore not initialized. Cannot update user profile.');
      return;
    }
    
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

export async function getLatestResumeAnalysis(userId: string): Promise<ResumeAnalysis | null> {
  try {
    if (!db) {
      console.warn('Firestore not initialized. Cannot fetch resume analysis.');
      return null;
    }
    
    const q = query(
      collection(db, 'analyses'),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    // Get the most recent analysis
    const analyses = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ResumeAnalysis[];
    
    return analyses.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())[0];
  } catch (error) {
    console.error('Error fetching resume analysis:', error);
    return null;
  }
}

export async function getUserEnrollments(userId: string): Promise<CourseEnrollment[]> {
  try {
    if (!db) {
      console.warn('Firestore not initialized. Cannot fetch enrollments.');
      return [];
    }
    
    const q = query(
      collection(db, 'enrollments'),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      ...doc.data()
    })) as CourseEnrollment[];
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    return [];
  }
}