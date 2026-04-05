import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Spacing, BorderRadius, Shadows } from '../../constants/theme';

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Register'>;
};

export default function RegisterScreen({ navigation }: Props) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleRegister = async () => {
    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp.');
      return;
    }

    setLoading(true);
    try {
      await register(email.trim(), password, fullName.trim());
    } catch (err: any) {
      const message = err.response?.data?.error || 'Đăng ký thất bại. Vui lòng thử lại.';
      Alert.alert('Lỗi', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appName}>🧠 Depressy Mate</Text>
          <Text style={styles.subtitle}>Tạo tài khoản để bắt đầu hành trình</Text>
        </View>

        {/* Form */}
        <View style={[styles.form, Shadows.ambient]}>
          <Text style={styles.title}>Đăng ký</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Họ và tên</Text>
            <TextInput
              style={styles.input}
              placeholder="Nguyễn Văn A"
              placeholderTextColor={Colors.light.outlineVariant}
              value={fullName}
              onChangeText={setFullName}
              autoComplete="name"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="example@email.com"
              placeholderTextColor={Colors.light.outlineVariant}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mật khẩu</Text>
            <TextInput
              style={styles.input}
              placeholder="Tối thiểu 6 ký tự"
              placeholderTextColor={Colors.light.outlineVariant}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Xác nhận mật khẩu</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập lại mật khẩu"
              placeholderTextColor={Colors.light.outlineVariant}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
               <ActivityIndicator color={Colors.light.surfaceContainerLowest} />
            ) : (
              <Text style={styles.buttonText}>Đăng ký</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.linkText}>
              Đã có tài khoản? <Text style={styles.linkBold}>Đăng nhập</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  appName: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.light.primary,
    letterSpacing: -0.5,
    fontFamily: 'Manrope',
  },
  subtitle: {
    fontSize: 14,
    color: Colors.light.onSurfaceVariant,
    marginTop: 8,
    textAlign: 'center',
    fontFamily: 'Manrope',
  },
  form: {
    backgroundColor: Colors.light.surfaceContainerLowest,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.onSurface,
    marginBottom: Spacing.lg,
    fontFamily: 'Manrope',
  },
  inputContainer: {
    marginBottom: Spacing.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.onSurfaceVariant,
    marginBottom: Spacing.sm,
    fontFamily: 'Manrope',
  },
  input: {
    backgroundColor: Colors.light.surfaceContainerLow,
    borderRadius: BorderRadius.md,
    padding: 14,
    fontSize: 16,
    color: Colors.light.onSurface,
    fontFamily: 'Manrope',
  },
  button: {
    backgroundColor: Colors.light.primary,
    borderRadius: BorderRadius.full,
    padding: 16,
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: Colors.light.surfaceContainerLowest,
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Manrope',
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: Colors.light.onSurfaceVariant,
    fontSize: 14,
    fontFamily: 'Manrope',
  },
  linkBold: {
    color: Colors.light.primary,
    fontWeight: 'bold',
  },
});
