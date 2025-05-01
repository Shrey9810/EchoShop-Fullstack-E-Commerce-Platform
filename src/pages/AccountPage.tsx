
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/sonner";
import { User, Mail, Package, LogOut } from "lucide-react";

const AccountPage: React.FC = () => {
  const { user, isAuthenticated, logout, updateUserProfile } = useAuth();
  
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    try {
      await updateUserProfile(profileData.name, profileData.email);
      toast.success("Profile updated successfully");
      setProfileData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
      }));
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (profileData.newPassword !== profileData.confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate password update
    setTimeout(() => {
      toast.success("Password updated successfully");
      setProfileData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
      }));
      setIsSubmitting(false);
    }, 800);
  };
  
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <div className="flex flex-col sm:flex-row lg:flex-col items-center mb-6">
              <div className="w-20 h-20 bg-brand-purple-light rounded-full flex items-center justify-center mb-4 sm:mb-0 lg:mb-4 sm:mr-4 lg:mr-0">
                <span className="text-2xl font-bold text-brand-purple">
                  {user?.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="text-center sm:text-left lg:text-center">
                <p className="font-medium text-lg">{user?.name}</p>
                <p className="text-gray-500 text-sm">{user?.email}</p>
              </div>
            </div>
            
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/account">
                  <User className="mr-2 h-4 w-4" />
                  Account Details
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link to="/orders">
                  <Package className="mr-2 h-4 w-4" />
                  Orders
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Profile Information</h2>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="bg-brand-purple hover:bg-brand-purple-dark"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Updating..." : "Update Profile"}
                  </Button>
                </form>
              </div>
            </TabsContent>
            
            <TabsContent value="security">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Change Password</h2>
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={profileData.currentPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={profileData.newPassword}
                      onChange={handleInputChange}
                      required
                      minLength={8}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                    <Input
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      type="password"
                      value={profileData.confirmNewPassword}
                      onChange={handleInputChange}
                      required
                      minLength={8}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="bg-brand-purple hover:bg-brand-purple-dark"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Updating..." : "Update Password"}
                  </Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
