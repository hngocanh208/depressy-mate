import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import assessmentsData from '../../clinical_scales_seed.json';
import AssessmentCard from '../components/AssessmentCard';
import QuestionnaireModal from '../components/QuestionnaireModal';
import ResultGauge from '../components/ResultGauge';
import api from '../services/api';

export default function HomeScreen() {
  const { user } = useAuth();
  
  // Lọc ra danh sách các bài test thật, loại bỏ object cấu hình scales
  const assessments = assessmentsData.filter((item: any) => item.questions);

  const [selectedAssessment, setSelectedAssessment] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'single' | 'history'>('list');
  const [singleResult, setSingleResult] = useState<any>(null);
  const [historyResults, setHistoryResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Lấy lịch sử tất cả các bài đã làm (lấy kết quả gần nhất của mỗi bài)
  const handleFetchHistory = async () => {
    setLoading(true);
    try {
      const res = await api.get('/assessments/history');
      if (res.data.data && res.data.data.length > 0) {
        const history = res.data.data;
        const latestPerTest: any[] = [];
        const seen = new Set();
        
        for (const r of history) {
            if (!seen.has(r.assessment_code)) {
                seen.add(r.assessment_code);
                latestPerTest.push(r);
            }
        }
        
        setHistoryResults(latestPerTest);
        setViewMode('history');
      } else {
        Alert.alert('Thông báo', 'Bạn chưa có kết quả bài test nào.');
      }
    } catch (e) {
      console.log('Error fetching history:', e);
      Alert.alert('Lỗi', 'Không thể lấy lịch sử bài test');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAssessment = (asm: any) => {
    setSelectedAssessment(asm);
    setModalVisible(true);
  };

  const handleSubmitAssessment = async (answers: any[]) => {
    setModalVisible(false); // Ẩn modal trước
    setSubmitting(true);
    try {
      const payload = {
        assessment_code: selectedAssessment.assessment_code,
        user_answers: answers,
      };
      
      const res = await api.post('/assessments/calculate', payload);
      setSingleResult(res.data.data);
      setViewMode('single'); // Chuyển sang chế độ xem kết quả vừa test
      Alert.alert('Thành công', 'Kết quả bài test đã được lưu');
    } catch (e: any) {
      Alert.alert('Lỗi', e.response?.data?.error || 'Có lỗi khi nộp bài');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}>Xin chào, {user?.fullName || 'bạn'} 👋</Text>
      <Text style={styles.subtitle}>Chào mừng bạn đến với Depressy Mate</Text>

      {loading || submitting ? (
        <ActivityIndicator size="large" color="#6366F1" style={{marginTop: 50}} />
      ) : viewMode === 'history' ? (
        // HIỂN THỊ KẾT QUẢ CỦA TẤT CẢ CÁC BÀI ĐÃ TEST
        <View style={{flex: 1}}>
          <View style={styles.headerRow}>
             <Text style={styles.sectionTitle}>Kết quả các bài đã làm</Text>
             <TouchableOpacity onPress={() => setViewMode('list')}>
                <Text style={styles.historyBtn}>Trở lại</Text>
             </TouchableOpacity>
          </View>
          <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
            {historyResults.map((result, index) => (
              <View key={index} style={{ marginBottom: 20 }}>
                <ResultGauge result={result} />
              </View>
            ))}
            <View style={{height: 40}} />
          </ScrollView>
        </View>
      ) : viewMode === 'single' ? (
        // HIỂN THỊ KẾT QUẢ VỪA SUBMIT
        <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
          <ResultGauge result={singleResult} onClose={() => setViewMode('list')} />
        </ScrollView>
      ) : (
        // HIỂN THỊ DANH SÁCH BÀI TEST
        <>
          <View style={styles.headerRow}>
             <Text style={styles.sectionTitle}>Các bài đánh giá tâm lý</Text>
             <TouchableOpacity onPress={handleFetchHistory}>
                <Text style={styles.historyBtn}>Kết quả gần nhất</Text>
             </TouchableOpacity>
          </View>
          <ScrollView style={styles.scrollArea} showsVerticalScrollIndicator={false}>
            {assessments.map((asm: any) => (
              <AssessmentCard 
                key={asm.assessment_code} 
                assessment={asm} 
                onPress={() => handleOpenAssessment(asm)} 
              />
            ))}
            <View style={{height: 40}} />
          </ScrollView>
        </>
      )}

      {/* MODAL LÀM BÀI */}
      <QuestionnaireModal
        visible={modalVisible}
        assessment={selectedAssessment}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmitAssessment}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingHorizontal: 20,
    // paddingTop: 60, Removed to let SafeAreaView handle spacing
  },
  greeting: {
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E2E8F0',
  },
  historyBtn: {
    color: '#6366F1',
    fontWeight: 'bold',
  },
  scrollArea: {
    flex: 1,
  }
});
