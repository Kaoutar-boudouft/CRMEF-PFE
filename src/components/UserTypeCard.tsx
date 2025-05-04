import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

interface UserTypeCardProps {
  type: 'teacher' | 'student';
  imageUrl: string;
  title: string;
  description: string;
  onSelect: () => void;
}

const UserTypeCard: React.FC<UserTypeCardProps> = ({ 
  type, 
  imageUrl,
  title,
  description,
  onSelect
}) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 w-full max-w-xs"
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 border-b border-gray-100 text-center">
      <h2 className="text-xl font-bold text-navy-900 truncate">{title}</h2>
      </div>
      
      <div className="p-4">
      <div className="flex justify-center mb-2">
      <img src={imageUrl} alt={title} className="w-full h-40 object-contain" />
      </div>
      <p className="text-gray-600 mb-4 text-center text-sm line-clamp-3">{description}</p>
      <Button 
        variant="outline" 
        onClick={onSelect} 
        fullWidth
        className="bg-black text-white hover:bg-yellow-500 hover:text-black"
      >
        Login
      </Button>
      </div>
    </motion.div>
  );
};

export default UserTypeCard;