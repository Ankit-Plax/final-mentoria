import React, { useState, useRef } from 'react';
import { 
  BookOpen, Upload, MessageCircle, FileText, Search, 
  Share2, Download, User, Settings, Brain, Zap, Users, 
  Trophy, Bell, Menu, X, Calendar, Clock, Tag, ThumbsUp, School, Eye,
  GraduationCap, UserCheck
} from 'lucide-react';

const Mentoria = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user] = useState({ name: 'Ankit Nandy', email: 'ankit@student.edu', avatar: '👨‍🎓' });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'ai', content: 'Hi! I\'m your AI study assistant. How can I help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [studyMode, setStudyMode] = useState('step-by-step');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [careerAdviceType, setCareerAdviceType] = useState(null);
  const [careerMessages, setCareerMessages] = useState([]);
  const [careerInput, setCareerInput] = useState('');
  const fileInputRef = useRef(null);

  const recentNotes = [
    { id: 1, title: 'Calculus Integration Formulas', subject: 'Mathematics', uploader: 'Sarah Kim', date: '2 days ago', likes: 24 },
    { id: 2, title: 'Physics Waves & Oscillations', subject: 'Physics', uploader: 'Mike Johnson', date: '3 days ago', likes: 18 },
    { id: 3, title: 'Chemistry Organic Reactions', subject: 'Chemistry', uploader: 'Emma Davis', date: '1 week ago', likes: 31 }
  ];

  const pastPapers = [
    { id: 1, title: 'JEE Main 2024 - Physics', year: '2024', exam: 'JEE Main', subject: 'Physics', downloads: 1247 },
    { id: 2, title: 'CBSE Class 12 Math 2024', year: '2024', exam: 'CBSE', subject: 'Mathematics', downloads: 892 },
    { id: 3, title: 'NEET Biology 2024', year: '2024', exam: 'NEET', subject: 'Biology', downloads: 2103 }
  ];

  const flashcards = [
    { id: 1, front: 'What is the derivative of sin(x)?', back: 'cos(x)', subject: 'Mathematics' },
    { id: 2, front: 'Define Newton\'s Second Law', back: 'F = ma (Force equals mass times acceleration)', subject: 'Physics' },
    { id: 3, front: 'What is the pH of pure water?', back: '7 (neutral)', subject: 'Chemistry' }
  ];

  const handleLogin = () => setIsLoggedIn(true);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    
    const userMessage = { type: 'user', content: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');

    setTimeout(() => {
      let aiResponse = '';
      if (studyMode === 'simple') {
        aiResponse = 'Here\'s a simple explanation: ' + chatInput + ' can be understood as a fundamental concept that...';
      } else if (studyMode === 'step-by-step') {
        aiResponse = 'Let me break this down step by step:\n1. First, understand the basic concept\n2. Then, apply the formula or method\n3. Finally, verify your answer';
      } else {
        aiResponse = 'Here\'s a visual representation:\n```\n  Input ──→ Process\n    │         │\n    ↓         ↓\n  Data ──→ Output\n```';
      }
      setChatMessages(prev => [...prev, { type: 'ai', content: aiResponse }]);
    }, 1000);
  };

  const LoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome to <span className="text-yellow-300">Mentoria</span>
          </h1>
          <p className="text-blue-100 text-lg">Your centralized academic hub</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-white/90">
                <input type="checkbox" className="mr-2 rounded" />
                Remember me
              </label>
              <button className="text-yellow-300 hover:text-yellow-200 transition-colors">
                Forgot password?
              </button>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold py-3 px-4 rounded-lg hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Sign In
            </button>

            <div className="text-center">
              <span className="text-white/70">Don't have an account? </span>
              <button 
                onClick={handleLogin}
                className="text-yellow-300 hover:text-yellow-200 font-semibold transition-colors"
              >
                Sign Up
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white/10 text-white/70">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={handleLogin}
                className="flex items-center justify-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white hover:bg-white/30 transition-all"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button 
                onClick={handleLogin}
                className="flex items-center justify-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white hover:bg-white/30 transition-all"
              >
                <School className="w-5 h-5 mr-2" />
                School ID
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="text-white/80">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
              <FileText className="w-6 h-6" />
            </div>
            <p className="text-sm">Share Notes</p>
          </div>
          <div className="text-white/80">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
              <Brain className="w-6 h-6" />
            </div>
            <p className="text-sm">AI Assistant</p>
          </div>
          <div className="text-white/80">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2">
              <Users className="w-6 h-6" />
            </div>
            <p className="text-sm">Collaborate</p>
          </div>
        </div>
      </div>
    </div>
  );

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  const Sidebar = () => (
    <div className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Mentoria
          </h1>
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden">
            <X size={24} />
          </button>
        </div>
        
        <div className="flex items-center mb-8 p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl mr-3">{user.avatar}</div>
          <div>
            <div className="font-semibold text-gray-800">{user.name}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>

        <nav className="space-y-2">
          {[
            { id: 'dashboard', icon: BookOpen, label: 'Dashboard' },
            { id: 'notes', icon: FileText, label: 'My Notes' },
            { id: 'papers', icon: Search, label: 'Past Papers' },
            { id: 'ai-chat', icon: MessageCircle, label: 'AI Assistant' },
            { id: 'study-tools', icon: Brain, label: 'Study Tools' },
            { id: 'career-advice', icon: GraduationCap, label: 'Career Advice' },
            { id: 'collaboration', icon: Users, label: 'Collaborate' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id 
                ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon size={20} className="mr-3" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="text-blue-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-800">127</span>
          </div>
          <h3 className="text-gray-600 font-medium">Notes Uploaded</h3>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Download className="text-green-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-800">89</span>
          </div>
          <h3 className="text-gray-600 font-medium">Papers Downloaded</h3>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Brain className="text-purple-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-800">45</span>
          </div>
          <h3 className="text-gray-600 font-medium">AI Sessions</h3>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Trophy className="text-orange-600" size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-800">8.4</span>
          </div>
          <h3 className="text-gray-600 font-medium">Study Streak</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Zap className="mr-2 text-yellow-500" size={20} />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentNotes.map(note => (
              <div key={note.id} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="p-2 bg-blue-100 rounded mr-4">
                  <FileText className="text-blue-600" size={16} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800">{note.title}</h4>
                  <p className="text-sm text-gray-500">{note.subject} • {note.uploader} • {note.date}</p>
                </div>
                <div className="flex items-center text-gray-400">
                  <ThumbsUp size={14} className="mr-1" />
                  <span className="text-sm">{note.likes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Calendar className="mr-2 text-green-500" size={20} />
            Upcoming Exams
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
              <div className="font-medium text-gray-800">Physics Mid-term</div>
              <div className="text-sm text-gray-600">3 days left</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <div className="font-medium text-gray-800">Math Quiz</div>
              <div className="text-sm text-gray-600">1 week left</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
              <div className="font-medium text-gray-800">Chemistry Lab</div>
              <div className="text-sm text-gray-600">2 weeks left</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Notes = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <select 
          value={selectedSubject} 
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Subjects</option>
          <option value="mathematics">Mathematics</option>
          <option value="physics">Physics</option>
          <option value="chemistry">Chemistry</option>
          <option value="biology">Biology</option>
        </select>
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Upload size={20} className="mr-2" />
          Upload Note
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.png"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {isUploading && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-700 font-medium">Uploading files...</span>
            <span className="text-blue-600">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentNotes.map(note => (
          <div key={note.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="text-blue-600" size={24} />
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <Share2 size={20} />
              </button>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">{note.title}</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Tag size={14} className="mr-2" />
                {note.subject}
              </div>
              <div className="flex items-center">
                <User size={14} className="mr-2" />
                {note.uploader}
              </div>
              <div className="flex items-center">
                <Clock size={14} className="mr-2" />
                {note.date}
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center text-gray-500">
                <ThumbsUp size={14} className="mr-1" />
                <span className="text-sm">{note.likes}</span>
              </div>
              <button className="flex items-center text-blue-600 hover:text-blue-700">
                <Eye size={14} className="mr-1" />
                <span className="text-sm">View</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const PastPapers = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search past papers..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <select className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option>All Years</option>
          <option>2024</option>
          <option>2023</option>
          <option>2022</option>
        </select>
        <select className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option>All Exams</option>
          <option>JEE Main</option>
          <option>NEET</option>
          <option>CBSE</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paper</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Downloads</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pastPapers.map(paper => (
                <tr key={paper.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded mr-3">
                        <FileText className="text-green-600" size={16} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{paper.title}</div>
                        <div className="text-sm text-gray-500">{paper.exam}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{paper.subject}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{paper.year}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{paper.downloads.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded">
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const AIChat = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-96 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">AI Study Assistant</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Learning Style:</span>
            <select 
              value={studyMode} 
              onChange={(e) => setStudyMode(e.target.value)}
              className="text-sm border border-gray-200 rounded px-2 py-1"
            >
              <option value="simple">Simple</option>
              <option value="step-by-step">Step-by-step</option>
              <option value="visual">Visual</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((message, index) => (
          <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message.type === 'user' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-800'
            }`}>
              <pre className="whitespace-pre-wrap font-sans">{message.content}</pre>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
            placeholder="Ask me anything about your studies..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button 
            onClick={handleChatSend}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );

  const handleCareerSend = () => {
    if (!careerInput.trim()) return;
    
    const userMessage = { type: 'user', content: careerInput };
    setCareerMessages(prev => [...prev, userMessage]);
    setCareerInput('');

    setTimeout(() => {
      let response = '';
      if (careerAdviceType === 'ai') {
        response = `AI Career Advisor: Based on your question "${careerInput}", I'd recommend exploring these career paths and developing skills in...`;
      } else {
        response = `Professional Advisor: As an industry expert, I suggest you consider the practical aspects of "${careerInput}" and connect with professionals in your field of interest...`;
      }
      setCareerMessages(prev => [...prev, { type: 'advisor', content: response }]);
    }, 1000);
  };

  const StudyTools = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Brain className="mr-2 text-purple-600" size={20} />
            Flashcards
          </h3>
          <div className="bg-gray-50 rounded-lg p-6 mb-4 min-h-48 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-medium mb-4">
                {showAnswer ? flashcards[currentCard].back : flashcards[currentCard].front}
              </div>
              <button 
                onClick={() => setShowAnswer(!showAnswer)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                {showAnswer ? 'Show Question' : 'Show Answer'}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button 
              onClick={() => {
                setCurrentCard(Math.max(0, currentCard - 1));
                setShowAnswer(false);
              }}
              disabled={currentCard === 0}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-500">
              {currentCard + 1} / {flashcards.length}
            </span>
            <button 
              onClick={() => {
                setCurrentCard(Math.min(flashcards.length - 1, currentCard + 1));
                setShowAnswer(false);
              }}
              disabled={currentCard === flashcards.length - 1}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Zap className="mr-2 text-yellow-600" size={20} />
            Quick Quiz
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="font-medium text-gray-800 mb-3">
                What is the integral of 2x?
              </div>
              <div className="space-y-2">
                {['x² + C', '2x² + C', 'x² + 2C', '2x + C'].map((option, index) => (
                  <button key={index} className="w-full text-left p-3 bg-white rounded hover:bg-gray-50 transition-colors">
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
              Generate New Quiz
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <FileText className="mr-2 text-blue-600" size={20} />
          Study Summary Generator
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <textarea 
              placeholder="Paste your notes here for AI summary..."
              className="w-full h-32 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Generate Summary
            </button>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600">
              AI-generated summary will appear here...
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Collaboration = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Users className="mr-2 text-green-600" size={20} />
          Study Groups
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Physics Study Group', members: 12, subject: 'Physics', active: true },
            { name: 'Math Problem Solvers', members: 8, subject: 'Mathematics', active: false },
            { name: 'Chemistry Lab Partners', members: 15, subject: 'Chemistry', active: true }
          ].map((group, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-800">{group.name}</h4>
                <div className={`w-3 h-3 rounded-full ${group.active ? 'bg-green-400' : 'bg-gray-300'}`}></div>
              </div>
              <div className="text-sm text-gray-600 mb-3">
                {group.members} members • {group.subject}
              </div>
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Join Group
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Share2 className="mr-2 text-blue-600" size={20} />
          Real-time Collaboration
        </h3>
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-center text-gray-600">
            <MessageCircle size={48} className="mx-auto mb-4 text-blue-400" />
            <h4 className="font-medium mb-2">Start Collaborating</h4>
            <p className="text-sm mb-4">Share notes, work on problems together, and learn from peers across different schools.</p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'notes': return <Notes />;
      case 'papers': return <PastPapers />;
      case 'ai-chat': return <AIChat />;
      case 'study-tools': return <StudyTools />;
      case 'collaboration': return <Collaboration />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="lg:ml-64">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden mr-4"
              >
                <Menu size={24} />
              </button>
              <h2 className="text-xl font-semibold text-gray-800 capitalize">
                {activeTab.replace('-', ' ')}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </header>

        <main className="p-6">
          {renderActiveTab()}
        </main>
      </div>

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Mentoria;
