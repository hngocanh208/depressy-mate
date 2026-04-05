import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import AssessmentFlow from '../components/AssessmentFlow';

export default function HomeScreen() {
  const { user } = useAuth();
  
  const [showAssessments, setShowAssessments] = useState(false);

  const renderHomeLayout = () => (
    <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
      {/* Top App Bar / Welcome Section */}
      <View style={styles.welcomeSection}>
        <View style={styles.headerRow}>
          <Text style={styles.greetingTitle}>Chào buổi sáng</Text>
          <View style={styles.profileAvatarContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80' }} 
              style={styles.profileAvatar} 
            />
          </View>
        </View>
        <Text style={styles.greetingSubtitle}>Hôm nay bạn cảm thấy thế nào?</Text>
      </View>

      {/* Hero Card - Start your journey */}
      <View style={styles.heroCardContainer}>
        <View style={[styles.heroCard, Shadows.ambient]}>
          <View style={styles.heroCardContent}>
            <View style={styles.heroTopRow}>
              <View>
                <Text style={styles.heroTitle}>Bắt đầu hành trình</Text>
                <Text style={styles.heroSubtitle}>Khám phá sự bình yên trong tâm trí bạn hôm nay.</Text>
              </View>
              <View style={styles.heroIconWrap}>
                 <Ionicons name="rocket-outline" size={28} color={Colors.light.surfaceContainerLowest} />
              </View>
            </View>
            <TouchableOpacity 
              style={styles.heroButton} 
              activeOpacity={0.8}
              onPress={() => setShowAssessments(true)}
            >
              <Text style={styles.heroButtonText}>Bắt đầu ngay</Text>
              <Ionicons name="arrow-forward" size={18} color={Colors.light.primary} style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Quick Actions Grid */}
      <Text style={styles.sectionHeading}>Hành động nhanh</Text>
      <View style={styles.gridContainer}>
        {[
          { id: 'breathe', title: 'Hít thở', sub: '2 phút thực hành', icon: 'water-outline', bg: 'rgba(167,243,208, 0.4)', iconCol: Colors.light.secondary },
          { id: 'checkin', title: 'Ghi nhận', sub: 'Bạn ổn không?', icon: 'heart-outline', bg: 'rgba(221,214,254, 0.4)', iconCol: Colors.light.primary },
          { id: 'reflect', title: 'Suy ngẫm', sub: 'Câu hỏi hằng ngày', icon: 'sparkles-outline', bg: 'rgba(191,219,254, 0.4)', iconCol: '#3B82F6' },
          { id: 'sleep', title: 'Giấc ngủ', sub: 'Thư giãn', icon: 'moon-outline', bg: '#FFF3E0', iconCol: '#FB923C' }
        ].map((item) => (
          <TouchableOpacity key={item.id} style={[styles.gridItem, { backgroundColor: item.bg }]} onPress={() => {}} activeOpacity={0.7}>
            <View style={styles.gridIconBox}>
              <Ionicons name={item.icon as any} size={24} color={item.iconCol} />
            </View>
            <View>
              <Text style={styles.gridTitle}>{item.title}</Text>
              <Text style={styles.gridSub}>{item.sub}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Community Section */}
      <View style={styles.communityHeader}>
        <View>
          <Text style={styles.sectionHeading}>Cộng đồng</Text>
          <Text style={styles.communitySubtitle}>Chia sẻ và lan tỏa năng lượng</Text>
        </View>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.seeAllText}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.reelScroll}>
        {[
          { id: 1, name: 'Minh Anh', time: '5p trước', title: 'Cách tôi vượt qua những ngày tệ nhất...', img: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', fav: '1.2k', chat: '245' },
          { id: 2, name: 'Linh Chi', time: '1h trước', title: 'Thử thách chánh niệm 7 ngày', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80', fav: '850', chat: '112' }
        ].map((item) => (
          <TouchableOpacity key={item.id} style={styles.reelCard} onPress={() => {}} activeOpacity={0.9}>
            <Image source={{ uri: item.img }} style={styles.reelImg} />
            <View style={styles.reelOverlay}>
              <View style={styles.playIconBox}>
                <Ionicons name="play" size={24} color="#FFF" />
              </View>
              <View style={styles.reelBottomInfo}>
                <View style={styles.reelAuthorRow}>
                  <Image source={{ uri: item.avatar }} style={styles.reelAvatar} />
                  <View>
                    <Text style={styles.reelAuthorName}>{item.name}</Text>
                    <Text style={styles.reelTime}>{item.time}</Text>
                  </View>
                </View>
                <Text style={styles.reelTitle} numberOfLines={2}>{item.title}</Text>
                <View style={styles.reelStatsRow}>
                  <View style={styles.statBox}>
                    <Ionicons name="heart" size={12} color="rgba(255,255,255,0.9)" />
                    <Text style={styles.statText}>{item.fav}</Text>
                  </View>
                  <View style={styles.statBox}>
                    <Ionicons name="chatbubble" size={12} color="rgba(255,255,255,0.9)" />
                    <Text style={styles.statText}>{item.chat}</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={{height: Spacing.xl}} />
    </ScrollView>
  );

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
  fullFlex: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingHorizontal: Spacing.lg,
  },
  scrollArea: {
    flex: 1,
  },
  welcomeSection: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  greetingTitle: {
    fontSize: 28,
    fontFamily: 'Manrope',
    fontWeight: '800',
    color: Colors.light.onSurface,
    letterSpacing: -0.5,
  },
  greetingSubtitle: {
    fontSize: 16,
    fontFamily: 'Manrope',
    fontWeight: '500',
    color: Colors.light.onSurfaceVariant,
  },
  profileAvatarContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: Colors.light.surfaceContainerLowest,
    overflow: 'hidden',
  },
  profileAvatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroCardContainer: {
    marginBottom: Spacing.xl,
  },
  heroCard: {
    backgroundColor: Colors.light.primary,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  heroCardContent: {
    padding: Spacing.lg,
    minHeight: 180,
    justifyContent: 'space-between',
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  heroTitle: {
    fontSize: 24,
    fontFamily: 'Manrope',
    fontWeight: 'bold',
    color: Colors.light.surfaceContainerLowest,
    marginBottom: Spacing.sm,
  },
  heroSubtitle: {
    fontSize: 14,
    fontFamily: 'Manrope',
    color: 'rgba(255,255,255,0.9)',
    maxWidth: 200,
  },
  heroIconWrap: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  heroButton: {
    backgroundColor: Colors.light.surfaceContainerLowest,
    paddingVertical: 12,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
    marginTop: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroButtonText: {
    color: Colors.light.primary,
    fontWeight: 'bold',
    fontFamily: 'Manrope',
  },
  subHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
    marginTop: Spacing.md,
  },
  sectionHeading: {
    fontSize: 20,
    fontFamily: 'Manrope',
    fontWeight: 'bold',
    color: Colors.light.onSurface,
    marginBottom: Spacing.md,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '47%',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: 8,
  },
  gridIconBox: {
    width: 48,
    height: 48,
    backgroundColor: Colors.light.surfaceContainerLowest,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  gridTitle: {
    fontFamily: 'Manrope',
    fontWeight: 'bold',
    color: Colors.light.onSurface,
    fontSize: 15,
  },
  gridSub: {
    fontFamily: 'Manrope',
    fontSize: 12,
    color: Colors.light.onSurfaceVariant,
    marginTop: 2,
  },
  communityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: Spacing.md,
  },
  communitySubtitle: {
    fontSize: 14,
    fontFamily: 'Manrope',
    color: Colors.light.onSurfaceVariant,
    marginTop: -8,
  },
  seeAllText: {
    color: Colors.light.primary,
    fontWeight: 'bold',
    fontFamily: 'Manrope',
    fontSize: 14,
  },
  reelScroll: {
    paddingBottom: Spacing.md,
    paddingRight: Spacing.lg,
    gap: Spacing.md,
  },
  reelCard: {
    width: 150,
    height: 200,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
    marginRight: Spacing.md,
  },
  reelImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  reelOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIconBox: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reelBottomInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.sm,
  },
  reelAuthorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 6,
  },
  reelAvatar: {
    width: 24,
    height: 24,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  reelAuthorName: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  reelTime: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 8,
  },
  reelTitle: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  reelStatsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 9,
    fontWeight: 'bold',
  }
});
