import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import { Colors, Spacing } from '../../constants/theme';
import AssessmentFlow from '../components/AssessmentFlow';
import BreathingExerciseScreen from './Home/BreathingExerciseScreen';
import SleepScreen from './Home/SleepScreen';
import CheckinScreen from './Home/CheckinScreen';

// Sub-components
import { HomeHeader } from '../components/home/HomeHeader';
import { HeroBanner } from '../components/home/HeroBanner';
import { ActionGrid } from '../components/home/ActionGrid';
import { CommunitySection } from '../components/home/CommunitySection';

export default function HomeScreen() {
  const { user } = useAuth();

  const [showAssessments, setShowAssessments] = useState(false);
  const [showBreathe, setShowBreathe] = useState(false);
  const [showSleep, setShowSleep] = useState(false);
  const [showCheckin, setShowCheckin] = useState(false);

  const handleAction = (id: string) => {
    switch (id) {
      case 'breathe':
        setShowBreathe(true);
        break;
      case 'sleep':
        setShowSleep(true);
        break;
      case 'checkin':
        setShowCheckin(true);
        break;
      default:
        console.log(`Action ${id} not implemented`);
    }
  };

  const renderHomeLayout = () => (
    <ScrollView 
      style={styles.scrollArea} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Top App Bar / Welcome Section */}
      <HomeHeader 
        userName={user?.fullName || 'Người dùng'} 
        avatarUrl={user?.avatarUrl} 
      />

      {/* Hero Card - Start your journey */}
      <HeroBanner onPress={() => setShowAssessments(true)} />

      {/* Quick Actions Grid */}
      <ActionGrid onAction={handleAction} />

      {/* Community Section */}
      <CommunitySection />

      <View style={{ height: Spacing.xl }} />
    </ScrollView>
  );

  if (showCheckin) {
    return <CheckinScreen onClose={() => setShowCheckin(false)} />;
  }

  if (showSleep) {
    return <SleepScreen onClose={() => setShowSleep(false)} />;
  }

  if (showBreathe) {
    return <BreathingExerciseScreen onClose={() => setShowBreathe(false)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {showAssessments ? (
        <AssessmentFlow onClose={() => setShowAssessments(false)} />
      ) : (
        renderHomeLayout()
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
  },
});

