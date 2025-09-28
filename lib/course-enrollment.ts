// Course Enrollment Management
import { db } from './firebase';
import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';

export interface CourseEnrollment {
  courseId: string;
  userId: string;
  courseTitle: string;
  provider: string;
  enrolledAt: Date;
  status: 'enrolled' | 'in-progress' | 'completed';
  progress: number;
  timeSpent: number; // in hours
  lastAccessed?: Date;
  externalUrl: string;
}

/**
 * Track course enrollment when user clicks external link
 */
export async function trackCourseEnrollment(
  userId: string,
  courseId: string,
  courseTitle: string,
  provider: string,
  externalUrl: string
): Promise<void> {
  try {
    const enrollmentId = `${userId}_${courseId}`;
    const enrollmentRef = doc(db, 'enrollments', enrollmentId);
    
    // Check if already enrolled
    const existingEnrollment = await getDoc(enrollmentRef);
    
    if (!existingEnrollment.exists()) {
      // Create new enrollment record
      await setDoc(enrollmentRef, {
        courseId,
        userId,
        courseTitle,
        provider,
        enrolledAt: new Date(),
        status: 'enrolled',
        progress: 0,
        timeSpent: 0,
        externalUrl,
      });
    } else {
      // Update last accessed time
      await updateDoc(enrollmentRef, {
        lastAccessed: new Date(),
      });
    }
  } catch (error) {
    console.error('Error tracking enrollment:', error);
    throw error;
  }
}

/**
 * Get user's course enrollments
 */
export async function getUserEnrollments(userId: string): Promise<CourseEnrollment[]> {
  try {
    const q = query(
      collection(db, 'enrollments'),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      ...doc.data(),
      enrolledAt: doc.data().enrolledAt.toDate(),
      lastAccessed: doc.data().lastAccessed?.toDate(),
    })) as CourseEnrollment[];
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    return [];
  }
}

/**
 * Update course progress
 */
export async function updateCourseProgress(
  userId: string,
  courseId: string,
  progress: number,
  timeSpent: number,
  status?: 'in-progress' | 'completed'
): Promise<void> {
  try {
    const enrollmentId = `${userId}_${courseId}`;
    const enrollmentRef = doc(db, 'enrollments', enrollmentId);
    
    const updateData: any = {
      progress,
      timeSpent,
      lastAccessed: new Date(),
    };
    
    if (status) {
      updateData.status = status;
    }
    
    await updateDoc(enrollmentRef, updateData);
  } catch (error) {
    console.error('Error updating progress:', error);
    throw error;
  }
}

/**
 * Check if user is enrolled in a course
 */
export async function isUserEnrolled(userId: string, courseId: string): Promise<boolean> {
  try {
    const enrollmentId = `${userId}_${courseId}`;
    const enrollmentRef = doc(db, 'enrollments', enrollmentId);
    const enrollment = await getDoc(enrollmentRef);
    
    return enrollment.exists();
  } catch (error) {
    console.error('Error checking enrollment:', error);
    return false;
  }
}