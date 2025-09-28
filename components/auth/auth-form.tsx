"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mail, Lock, User, Loader as Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { createUserProfile } from '@/lib/user-data';

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async (type: 'signin' | 'signup', formData: FormData) => {
    setIsLoading(true);
    
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;
    
    try {
      if (type === 'signup') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        // Create user profile in Firestore
        await createUserProfile({
          uid: userCredential.user.uid,
          name: name || 'User',
          email: email,
          hasUploadedResume: false,
        });
        
        toast.success('Account created successfully!');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('Successfully signed in!');
      }
      
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Authentication error:', error);
      toast.error(error.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tabs defaultValue="signin" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signin">Sign In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      
      <TabsContent value="signin" className="space-y-4">
        <form action={(formData) => handleAuth('signin', formData)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signin-email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="signin-email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="signin-password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="signin-password"
                name="password"
                type="password"
                placeholder="Enter your password"
                className="pl-10"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
      </TabsContent>
      
      <TabsContent value="signup" className="space-y-4">
        <form action={(formData) => handleAuth('signup', formData)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signup-name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="signup-name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                className="pl-10"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="signup-email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="signup-password"
                name="password"
                type="password"
                placeholder="Create a password"
                className="pl-10"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              'Sign Up'
            )}
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  );
}