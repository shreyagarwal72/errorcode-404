import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Skull, Ghost, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | 404 SOULS</title>
        <meta name="description" content="Lost in the void? This page doesn't exist in the realm of 404 SOULS. Return to the nightmare or explore our horror puzzle game." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://404souls.lovable.app" />
        <meta property="og:title" content="404 - Lost Soul | 404 SOULS" />
        <meta property="og:description" content="You've wandered into the void. Return to 404 SOULS horror puzzle game." />
        <meta property="og:url" content="https://404souls.lovable.app" />
      </Helmet>

      <main className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/20 to-black animate-pulse" />
          <div className="absolute inset-0 opacity-10 animate-flicker" style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255, 0, 0, 0.3) 2px,
              rgba(255, 0, 0, 0.3) 4px
            )`
          }} />
        </div>

        {/* Floating ghosts */}
        {[...Array(3)].map((_, i) => (
          <Ghost
            key={i}
            className="absolute text-red-600/20 animate-float"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
              width: `${40 + i * 15}px`,
              height: `${40 + i * 15}px`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${5 + i}s`
            }}
          />
        ))}

        {/* Main content */}
        <div className="text-center space-y-8 z-10 px-6 max-w-2xl">
          {/* Animated skull */}
          <div className="relative animate-scale-in">
            <div className="absolute inset-0 bg-red-600/30 rounded-full blur-[120px] animate-pulse-glow" />
            <Skull className="h-32 w-32 text-red-600 mx-auto animate-float drop-shadow-[0_0_60px_rgba(220,38,38,1)]" />
          </div>

          {/* 404 heading */}
          <header>
            <h1 className="text-8xl md:text-9xl font-nosifer text-red-600 glitch drop-shadow-[0_0_40px_rgba(220,38,38,1)] animate-pulse">
              404
            </h1>
            <p className="text-3xl md:text-4xl text-gray-300 font-creepster animate-flicker mt-4">
              Lost Soul Detected
            </p>
          </header>

          {/* Horror-themed message */}
          <article className="space-y-4 p-6 bg-black/50 border border-red-900/30 rounded-lg backdrop-blur-sm animate-fade-in">
            <p className="text-lg text-gray-400 font-creepster leading-relaxed">
              You've wandered into the void between pages. This realm doesn't exist... 
              or perhaps it never did.
            </p>
            <p className="text-base text-red-500/80 font-creepster animate-pulse">
              The spirits whisper that your path has led you astray. 
              Return to the realm of 404 SOULS before you're trapped here forever.
            </p>
          </article>

          {/* Breadcrumb navigation */}
          <nav aria-label="Breadcrumb" className="text-sm text-gray-500 font-creepster">
            <ol className="flex items-center justify-center gap-2">
              <li><Link to="/" className="hover:text-red-500 transition-colors">Home</Link></li>
              <li className="text-red-800">›</li>
              <li className="text-red-600" aria-current="page">404 Not Found</li>
            </ol>
          </nav>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              asChild
              size="lg"
              className="font-creepster text-lg shadow-[0_0_30px_rgba(234,179,8,0.5)] hover:shadow-[0_0_50px_rgba(234,179,8,0.8)] bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Link to="/">
                <Home className="mr-2 h-5 w-5" />
                Return to Nightmare
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-creepster text-lg border-red-600/30 text-red-500 hover:bg-red-950/20 hover:text-red-400"
            >
              <Link to="/home">
                <Search className="mr-2 h-5 w-5" />
                Explore Puzzles
              </Link>
            </Button>
          </div>

          {/* Decorative divider */}
          <div className="space-y-2 animate-float">
            <div className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-red-600 to-transparent animate-pulse-glow" />
            <div className="h-px w-48 mx-auto bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
          </div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-red-600/20 animate-pulse" />
        <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-red-600/20 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-red-600/20 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-red-600/20 animate-pulse" />

        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black pointer-events-none opacity-80" />
      </main>
    </>
  );
};

export default NotFound;
