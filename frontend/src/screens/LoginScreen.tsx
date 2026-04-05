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
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ email và mật khẩu.');
      return;
    }

    setLoading(true);
    try {
      await login(email.trim(), password);
    } catch (err: any) {
      const message = err.response?.data?.error || 'Đăng nhập thất bại. Vui lòng thử lại.';
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
          <Text style={styles.subtitle}>Hỗ trợ thăm khám & điều trị trầm cảm</Text>
        </View>

        {/* Form */}
        <View style={[styles.form, Shadows.ambient]}>
          <Text style={styles.title}>Đăng nhập</Text>

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
              placeholder="Nhập mật khẩu"
              placeholderTextColor={Colors.light.outlineVariant}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
            />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
               <ActivityIndicator color={Colors.light.surfaceContainerLowest} />
            ) : (
              <Text style={styles.buttonText}>Đăng nhập</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.linkText}>
              Chưa có tài khoản? <Text style={styles.linkBold}>Đăng ký ngay</Text>
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
    marginBottom: 40,
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
