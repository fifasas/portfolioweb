import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './layouts/Layout';
import LoadingScreen from './components/LoadingScreen';
import GravityStars from './components/GravityStars';
import { AnimatePresence } from 'framer-motion';

const Home = React.lazy(() => import('./pages/Home'));
const WebCreation = React.lazy(() => import('./pages/WebCreation'));
const Marketing = React.lazy(() => import('./pages/Marketing'));
const Photography = React.lazy(() => import('./pages/Photography'));
const AI = React.lazy(() => import('./pages/AI'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Links = React.lazy(() => import('./pages/Links'));
const Works = React.lazy(() => import('./pages/Works'));
const FullGallery = React.lazy(() => import('./pages/FullGallery'));
const ProjectDetail = React.lazy(() => import('./pages/ProjectDetail'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLanguageSwitching, setIsLanguageSwitching] = React.useState(false);
  const [canExitLanguageLoader, setCanExitLanguageLoader] = React.useState(false);
  const [isRevealed] = React.useState(true);
  const [appReady, setAppReady] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  const languageSwitchStartRef = React.useRef(0);
  const languageExitTimerRef = React.useRef(null);
  const location = useLocation();
  const isLinktree = location.pathname === '/links';

  React.useEffect(() => {
    const MIN_LANGUAGE_LOADER_MS = 260;

    const handleLanguageSwitchStart = () => {
      if (languageExitTimerRef.current) {
        window.clearTimeout(languageExitTimerRef.current);
      }
      languageSwitchStartRef.current = performance.now();
      setIsLanguageSwitching(true);
      setCanExitLanguageLoader(false);
    };

    const handleLanguageSwitchFinish = () => {
      const elapsed = performance.now() - languageSwitchStartRef.current;
      const remaining = Math.max(0, MIN_LANGUAGE_LOADER_MS - elapsed);
      languageExitTimerRef.current = window.setTimeout(() => {
        setCanExitLanguageLoader(true);
      }, remaining);
    };

    window.addEventListener('app-language-switch-start', handleLanguageSwitchStart);
    window.addEventListener('app-language-switch-finish', handleLanguageSwitchFinish);
    return () => {
      window.removeEventListener('app-language-switch-start', handleLanguageSwitchStart);
      window.removeEventListener('app-language-switch-finish', handleLanguageSwitchFinish);
      if (languageExitTimerRef.current) {
        window.clearTimeout(languageExitTimerRef.current);
      }
    };
  }, []);

  const handleLangLoaderComplete = () => {
    setIsLanguageSwitching(false);
    setCanExitLanguageLoader(false);
  };

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateReducedMotion = () => setPrefersReducedMotion(mediaQuery.matches);
    const updateMobile = () => setIsMobile(window.innerWidth < 768);

    updateReducedMotion();
    updateMobile();

    mediaQuery.addEventListener('change', updateReducedMotion);
    window.addEventListener('resize', updateMobile);

    return () => {
      mediaQuery.removeEventListener('change', updateReducedMotion);
      window.removeEventListener('resize', updateMobile);
    };
  }, []);

  React.useEffect(() => {
    let cancelled = false;

    const preloadImage = (src) =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = src;
        if (img.complete) {
          resolve();
        }
      });

    const waitForWindowLoad = new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
        return;
      }
      window.addEventListener('load', resolve, { once: true });
    });

    const preloadCriticalChunks = Promise.all([
      import('./pages/Home'),
      import('./components/CircularGallery'),
      import('./components/MagicBento'),
      import('./components/MotionCarousel'),
    ]);

    const preloadCriticalImages = Promise.all([
      preloadImage('/images/logo_white.png'),
      preloadImage('/images/profile.jpg'),
      preloadImage('/images/gallery/MatraceLetoviceMockup-scaled.webp'),
      preloadImage('/images/gallery/JakubHesMockUpt-scaled.webp'),
      preloadImage('/images/gallery/veronica.webp'),
      preloadImage('/images/gallery/paska.jpg'),
      preloadImage('/images/gallery/bird.webp'),
      preloadImage('/images/gallery/Angry_cat.webp'),
      preloadImage('/images/gallery/double_vasek.webp'),
      preloadImage('/images/gallery/goose.webp'),
      preloadImage('/images/gallery/mourek.webp'),
      preloadImage('/images/gallery/richasti.webp'),
      preloadImage('/images/gallery/THIS IS MAX.webp'),
      preloadImage('/images/gallery/vasek_sax.webp'),
    ]);

    Promise.all([waitForWindowLoad, preloadCriticalChunks, preloadCriticalImages]).then(() => {
      if (!cancelled) {
        setAppReady(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const starsCount = prefersReducedMotion ? 45 : isMobile ? 80 : 125;

  const mainContent = isLinktree ? (
    <React.Suspense fallback={<div className="min-h-screen" />}>
      <Routes>
        <Route path="/links" element={<Links />} />
      </Routes>
    </React.Suspense>
  ) : (
    <Layout>
      <React.Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          <Route path="/" element={<Home isRevealed={isRevealed} preloadReady={appReady} />} />
          <Route path="/web-creation" element={<WebCreation />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/photography" element={<Photography />} />
          <Route path="/ai" element={<AI />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/works" element={<Works />} />
          <Route path="/gallery" element={<FullGallery />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </React.Suspense>
    </Layout>
  );

  return (
    <>
      <ScrollToTop />
      {!isLinktree && (
        <GravityStars
          className="fixed inset-0 z-0"
          starsCount={starsCount}
          starsInteraction={false}
          mouseInfluence={prefersReducedMotion ? 0 : 160}
        />
      )}
      
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen
            key="initial-loader"
            variant="initial"
            canExit={appReady}
            onLoadingComplete={() => {
              setIsLoading(false);
            }}
          />
        )}
        {isLanguageSwitching && (
          <LoadingScreen
            key="lang-loader"
            variant="transition"
            canExit={canExitLanguageLoader}
            onLoadingComplete={handleLangLoaderComplete}
          />
        )}
      </AnimatePresence>

      <div className="relative min-h-screen">
        {mainContent}
      </div>
    </>
  );
}

export default App;
