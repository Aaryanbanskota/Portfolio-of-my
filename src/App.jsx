import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import { MacDock } from './components/layout/MacDock';
import { Preloader } from './components/layout/Preloader';
import details from './data/details.json';

import ProjectDetail from './pages/ProjectDetail';

function App() {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);

  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = details.profile.avatarUrl;
    document.title = `${details.profile.name} | Portfolio`;
  }, []);

  return (
    <BrowserRouter>
      <Preloader onComplete={() => setIsPreloaderDone(true)} />
      <div className="relative min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-zinc-800 pb-32">
        <Routes>
          <Route path="/" element={<LandingPage isPreloaderDone={isPreloaderDone} />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <MacDock />
      </div>
    </BrowserRouter>
  );
}

export default App;
