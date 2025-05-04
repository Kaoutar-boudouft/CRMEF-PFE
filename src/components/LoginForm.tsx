import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import Button from './Button';

interface LoginFormProps {
  userType: 'teacher' | 'student';
  onLogin: (email: string, password: string) => void;
}

  const LoginForm: React.FC<LoginFormProps> = ({ userType, onLogin }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onLogin(email, password);
    };
  
    return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md animate-fadeIn">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-navy-100 mb-4">
          <User className="h-8 w-8 text-navy-600" />
        </div>
        <h2 className="text-2xl font-bold text-navy-900 mb-1">
          {userType === 'teacher' ? 'Connexion Enseignant' : 'Connexion Apprenant'}
        </h2>
        <p className="text-gray-600">
          {userType === 'teacher' 
            ? 'Accédez à votre tableau de bord enseignant' 
            : 'Poursuivez votre parcours d\'apprentissage'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
              placeholder="your@email.com"
              required
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Mot de passe
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500"
              placeholder="••••••••"
              required
            />
          </div>
        </div>
        
        <Button type="submit" variant="primary" className="bg-black text-white hover:bg-yellow-500 hover:text-black"
 fullWidth  onClick={() => navigate('/dashboard')}>
          Se connecter
        </Button>
      </form>
      
      <div className="mt-4 text-center">
        <a href="#" className="text-sm text-navy-600 hover:text-navy-800 transition-colors">
        Mot de passe oublié ?
        </a>
      </div>
    </div>
  );
};

export default LoginForm;


