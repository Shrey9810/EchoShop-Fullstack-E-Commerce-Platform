
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About EchoShop</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-700 mb-6">
            EchoShop was founded in 2023 with a simple mission: to provide high-quality products 
            at affordable prices while delivering an exceptional shopping experience. What started as a 
            small online store has grown into a trusted marketplace offering a wide range of products 
            across multiple categories.
          </p>
          <p className="text-gray-700 mb-6">
            We believe that shopping should be easy, enjoyable, and accessible to everyone. 
            Our team works tirelessly to curate the best products and ensure that your 
            shopping experience with us is seamless from browsing to delivery.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-brand-purple-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality</h3>
              <p className="text-gray-600">
                We never compromise on quality. Every product on our platform undergoes 
                rigorous quality checks.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-brand-purple-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Customer First</h3>
              <p className="text-gray-600">
                Our customers are at the heart of everything we do. We're committed to 
                providing exceptional service.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-brand-purple-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Sustainability</h3>
              <p className="text-gray-600">
                We're committed to reducing our environmental impact and promoting 
                sustainable practices.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Our Team</h2>
          <p className="text-gray-700 mb-6">
            Our dedicated team of professionals works around the clock to ensure that 
            EchoShop provides the best shopping experience. From product curation to 
            customer support, every team member plays a vital role in making EchoShop 
            what it is today.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-20 h-20 rounded-full bg-gray-300 mr-4"></div>
              <div>
                <h3 className="font-semibold">Sarah Johnson</h3>
                <p className="text-gray-600">Founder & CEO</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-20 h-20 rounded-full bg-gray-300 mr-4"></div>
              <div>
                <h3 className="font-semibold">Michael Chen</h3>
                <p className="text-gray-600">Head of Operations</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-brand-purple-light rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Shop?</h2>
          <p className="text-gray-700 mb-6">
            Explore our wide range of products and experience the EchoShop difference.
          </p>
          <Button asChild className="bg-brand-purple hover:bg-brand-purple-dark">
            <Link to="/shop">Shop Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
