import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ToolsSection } from './components/ToolsSection';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { ToolModal } from './components/ToolModal';
import { BlogModal } from './components/BlogModal';
import { LanguageProvider } from './contexts/LanguageContext';
import { Tool } from './types';

function AppContent() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [isToolModalOpen, setIsToolModalOpen] = useState(false);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);

  const handleOpenTool = (tool: Tool) => {
    setSelectedTool(tool);
    setIsToolModalOpen(true);
  };

  const handleReadBlog = (blogId: string) => {
    setSelectedBlogId(blogId);
    setIsBlogModalOpen(true);
  };

  const closeToolModal = () => {
    setIsToolModalOpen(false);
    setSelectedTool(null);
  };

  const closeBlogModal = () => {
    setIsBlogModalOpen(false);
    setSelectedBlogId(null);
  };

  // Offline support
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(() => console.log('SW registered'))
          .catch(() => console.log('SW registration failed'));
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-primary">
      <Header />
      <Hero />
      <ToolsSection onOpenTool={handleOpenTool} onReadBlog={handleReadBlog} />
      <BlogSection onReadBlog={handleReadBlog} />
      <Footer />
      
      <ToolModal
        tool={selectedTool}
        isOpen={isToolModalOpen}
        onClose={closeToolModal}
      />
      
      <BlogModal
        blogId={selectedBlogId}
        isOpen={isBlogModalOpen}
        onClose={closeBlogModal}
        onOpenTool={handleOpenTool}
      />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
