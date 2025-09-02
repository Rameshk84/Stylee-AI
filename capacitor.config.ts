import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.72a582d2900c42f881f07763ce5d1df0',
  appName: 'dress-whisperer-ai',
  webDir: 'dist',
  server: {
    url: 'https://72a582d2-900c-42f8-81f0-7763ce5d1df0.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ["camera", "photos"]
    }
  }
};

export default config;