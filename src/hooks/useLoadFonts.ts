import * as Font from 'expo-font';
import { useCallback, useEffect, useState } from 'react';

export default function useLoadFonts() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = useCallback(async () => {
    try {
      await Font.loadAsync({
        'Nunito-Regular': require('../../assets/fonts/Nunito-Regular.ttf'),
        'Nunito-Medium': require('../../assets/fonts/Nunito-Medium.ttf'),
        'Nunito-Bold': require('../../assets/fonts/Nunito-Bold.ttf'),
        'Nunito-ExtraBold': require('../../assets/fonts/Nunito-ExtraBold.ttf'),
      });
      setFontsLoaded(true);
    } catch (error) {
      console.log('Error loading fonts:', error);
      // Fallback to system fonts if custom fonts fail to load
      setFontsLoaded(true);
    }
  }, []);

  useEffect(() => {
    loadFonts();
  }, [loadFonts]);

  return { fontsLoaded };
} 