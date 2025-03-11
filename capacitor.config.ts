import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'PhotoGallery',
  webDir: 'www',
  server:{
    cleartext: true
  }
};

export default config;
