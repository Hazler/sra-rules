import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'fi.luukas.sra',
  appName: 'SRA säännöt',
  webDir: 'dist/sra-rules/browser',  
  backgroundColor: '#eee',
  ios: {
    "preferredContentMode": "mobile"
  }
};

export default config;
