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
    <footer className="border-t border-border/50 bg-gradient-card backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Brand */}
          <div className="text-center animate-fade-in">
            <h3 className="text-lg font-semibold text-foreground mb-2">StyleAI</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered style analysis for the modern wardrobe
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6 animate-slide-in-up">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative p-3 rounded-full bg-secondary/50 backdrop-blur-sm border border-border/30 text-muted-foreground transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-primary hover:text-primary-foreground hover:border-primary/20 active:scale-95`}
                  aria-label={`Visit ${social.name} profile`}
                >
                  <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
                    {social.name}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary"></div>
                  </div>
                  
                  {/* Ripple effect */}
                  <div className="absolute inset-0 rounded-full bg-primary/20 scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="text-center text-xs text-muted-foreground animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <p>&copy; {new Date().getFullYear()} StyleAI. Crafted with precision and care.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;