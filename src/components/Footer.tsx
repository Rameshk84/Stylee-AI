import { Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/rameshk12/',
      icon: Linkedin,
      hoverColor: 'hover:text-primary'
    },
    {
      name: 'Instagram', 
      url: 'https://www.instagram.com/ai.ramesh/',
      icon: Instagram,
      hoverColor: 'hover:text-primary'
    }
  ];

  return (
    <footer className="relative mt-24 border-t border-border/30 bg-gradient-to-br from-background via-secondary/30 to-background backdrop-blur-xl overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      
      <div className="relative container mx-auto px-6 py-16">
        <div className="flex flex-col items-center space-y-10 max-w-2xl mx-auto">
          {/* Brand Section */}
          <div className="text-center animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="relative">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 bg-primary/30 rounded-full animate-ping"></div>
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent">
                StyleAI
              </h3>
              <div className="relative">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute inset-0 w-3 h-3 bg-primary/30 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
            <p className="text-lg text-muted-foreground font-light">
              AI-powered style analysis for the modern wardrobe
            </p>
          </div>

          {/* Connect Section */}
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h4 className="text-xl font-semibold text-foreground mb-6">Let's Connect</h4>
            
            {/* Social Links */}
            <div className="flex items-center justify-center space-x-8 animate-slide-in-up">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-5 rounded-2xl bg-gradient-to-br from-secondary/80 via-background/50 to-secondary/80 backdrop-blur-sm border border-border/40 text-muted-foreground transition-all duration-500 hover:scale-125 hover:shadow-2xl hover:bg-gradient-to-br hover:from-primary/10 hover:via-primary/5 hover:to-primary/10 hover:text-foreground hover:border-primary/30 active:scale-110 animate-float"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    aria-label={`Visit ${social.name} profile`}
                  >
                    <IconComponent className="w-8 h-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12" />
                    
                    {/* Enhanced Tooltip */}
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl">
                      Follow on {social.name}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-primary"></div>
                    </div>
                    
                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm -z-10"></div>
                    
                    {/* Ripple Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-primary/10 scale-0 group-hover:scale-150 transition-transform duration-700 -z-10"></div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-border to-transparent animate-fade-in" style={{ animationDelay: '0.3s' }}></div>

          {/* Copyright */}
          <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="text-sm text-muted-foreground font-light">
              &copy; {new Date().getFullYear()} StyleAI • Crafted with precision and care
            </p>
            <div className="flex items-center justify-center gap-2 mt-2 text-xs text-muted-foreground/70">
              <div className="w-1 h-1 bg-current rounded-full"></div>
              <span>Powered by AI</span>
              <div className="w-1 h-1 bg-current rounded-full"></div>
              <span>Built for Style</span>
              <div className="w-1 h-1 bg-current rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;