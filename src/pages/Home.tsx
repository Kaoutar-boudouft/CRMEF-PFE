import React, { useState } from 'react';
import { motion } from 'framer-motion';
// import Logo from '../components/Logo';
import UserTypeCard from '../components/UserTypeCard';
import LoginForm from '../components/LoginForm';
// import LanguageSelector from '../components/LanguageSelector';
import IllustrationBanner from '../components/IllustrationBanner';

const HomePage: React.FC = () => {
  const [selectedUserType, setSelectedUserType] = useState<'teacher' | 'student' | null>(null);
  
  const handleLogin = (email: string, password: string) => {
    console.log(`Login attempt as ${selectedUserType}:`, { email, password });
    // In a real application, this would handle authentication
  };
  
  const resetSelection = () => {
    setSelectedUserType(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <button onClick={resetSelection} className="flex items-center focus:outline-none">
          </button>
          <div className="flex items-center space-x-3">
            <button 
              onClick={resetSelection} 
              className="flex items-center focus:outline-none text-2xl font-bold"
            >
              <span className="text-black">اونلاين</span> <span className="text-yellow-500">قسمي</span>
            </button>
            <img 
              src="/graduation-cap-svg-icon-free-graduation-cap-icon-11553393846gq7rcr1qsx.png" 
              alt="Graduation Cap Icon" 
              className="w-14 h-14 rounded-full shadow-lg border-2 border-yellow-500"
            />
          </div>
          {/* <LanguageSelector /> */}
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-8"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-3xl font-bold text-navy-900 mb-2"
          >
            Votre environnement pédagogique pour
          </motion.h1>
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold text-navy-700 mb-6"
          >
            l'enseignement-apprentissage de l'informatique au collège
          </motion.h2>
        </motion.div>
        
        {!selectedUserType ? (
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center mb-12">
            <UserTypeCard
              type="teacher"
              title="ENSEIGNANT"
              imageUrl="\Codingworkshop-bro.png"
              description="Commencer votre parcours d'enseignement"
              onSelect={() => setSelectedUserType('teacher')}
            />
            <UserTypeCard
              type="student"
              title="APPRENANT"
              imageUrl="\Dictionary-pana.png"
              description="Commencer votre parcours d'apprentissage"
              onSelect={() => setSelectedUserType('student')}
            />
          </div>
        ) : (
          <div className="flex justify-center my-8">
            <LoginForm 
              userType={selectedUserType} 
              onLogin={handleLogin} 
            />
          </div>
        )}
        
        <div className="mt-12 bg-white text-black py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex flex-col items-center">
              <img
                src="\Image1.jpg"
                alt="Illustration"
                className="w-52 h-auto"
              />
              <p className="text-sm font-semibold">
                Centre Régional des Métiers de l'Education et de la Formation - Tanger-Tétouan-Al Hoceima
              </p>
              <p className="text-sm font-semibold mt-2">
                المركز الجهوي لمهن التربية والتكوين لجهة طنجة تطوان الحسيمة
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-black text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
            <span className="text-white">قسمي</span> <span className="text-yellow-500"> اونلاين</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-300">
                © 2025 Tous droits réservés.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;