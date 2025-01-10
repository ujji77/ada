// src/utils/iconSetup.js
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { registerIcons } from '@fluentui/react/lib/Styling';
import { 
  ChevronDownRegular,
  ChevronRightRegular,
  DashboardRegular,
  AnalyticsRegular,
  CopyRegular,
  InfoRegular
} from '@fluentui/react-icons';

export const setupIcons = () => {
  initializeIcons();
  
  registerIcons({
    icons: {
      'dashboard': DashboardRegular,
      'analytics': AnalyticsRegular,
      'chevrondown': ChevronDownRegular,
      'chevronright': ChevronRightRegular,
      'copy': CopyRegular,
      'info': InfoRegular
    }
  });
};