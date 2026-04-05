import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface AssessmentCardProps {
  assessment: any;
  onPress: () => void;
}

export default function AssessmentCard({ assessment, onPress }: AssessmentCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.headerRow}>
        <Text style={styles.codeBadge}>{assessment.assessment_code}</Text>
        <Text style={styles.ageBadge}>Độ tuổi: {assessment.target_age}</Text>
      </View>
      <Text style={styles.title}>{assessment.name}</Text>
      <Text style={styles.description} numberOfLines={3}>
        {assessment.description}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  codeBadge: {
    backgroundColor: '#6366F1',
    color: '#FFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 'bold',
  },
  ageBadge: {
    backgroundColor: '#334155',
    color: '#94A3B8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 20,
  },
});
