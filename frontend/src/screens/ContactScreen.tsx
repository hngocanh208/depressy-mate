import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ContactScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📞 Liên hệ</Text>
      <Text style={styles.subtitle}>Tìm bác sĩ và phòng khám gần bạn</Text>

      <View style={styles.card}>
        <Text style={styles.cardEmoji}>🏥</Text>
        <Text style={styles.cardText}>Tính năng đang được phát triển...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#F1F5F9',
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
  },
});
