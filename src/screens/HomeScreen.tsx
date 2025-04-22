import React, { useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { AuthContext } from '../services/AuthContext';
import Button from '../components/Button';
import { colors, spacing, typography } from '../styles/theme';

const HomeScreen = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.email?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          <View>
            <Text style={styles.welcomeText}>Hello!</Text>
            <Text style={styles.emailText}>{user?.email}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>Weekly Stats</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Activities</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Ranking</Text>
            </View>
          </View>
        </View>

        <View style={styles.activitiesSection}>
          <Text style={styles.sectionTitle}>Activities</Text>
          <Text style={styles.sectionSubtitle}>
            Record your physical activities to earn points
          </Text>

          <View style={styles.activityCard}>
            <View style={styles.activityIconContainer}>
              <Text style={styles.activityIcon}>🏃</Text>
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityName}>Running</Text>
              <Text style={styles.activityPoints}>+10 points per 10min</Text>
            </View>
            <Button 
              title="+" 
              onPress={() => {/* Implement activity registration */}}
              style={styles.addButton}
            />
          </View>

          <View style={styles.activityCard}>
            <View style={styles.activityIconContainer}>
              <Text style={styles.activityIcon}>🚶</Text>
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityName}>Walking</Text>
              <Text style={styles.activityPoints}>+5 points per 10min</Text>
            </View>
            <Button 
              title="+" 
              onPress={() => {/* Implement activity registration */}}
              style={styles.addButton}
            />
          </View>

          <View style={styles.activityCard}>
            <View style={styles.activityIconContainer}>
              <Text style={styles.activityIcon}>🥋</Text>
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityName}>Jiu-Jitsu</Text>
              <Text style={styles.activityPoints}>+15 points per 10min</Text>
            </View>
            <Button 
              title="+" 
              onPress={() => {/* Implement activity registration */}}
              style={styles.addButton}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.m,
    backgroundColor: colors.white,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.m,
  },
  avatarText: {
    color: colors.white,
    fontSize: typography.fontSize.l,
    fontFamily: typography.fontFamily.bold,
  },
  welcomeText: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.m,
    color: colors.textDark,
  },
  emailText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.s,
    color: colors.darkGray,
  },
  logoutButton: {
    padding: spacing.s,
  },
  logoutText: {
    color: colors.blue,
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.m,
  },
  scrollContent: {
    padding: spacing.l,
  },
  statsCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.l,
    marginBottom: spacing.l,
  },
  cardTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.l,
    color: colors.textDark,
    marginBottom: spacing.m,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: typography.fontFamily.extraBold,
    fontSize: typography.fontSize.xxl,
    color: colors.primary,
  },
  statLabel: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.s,
    color: colors.darkGray,
  },
  activitiesSection: {
    marginBottom: spacing.l,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.l,
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  sectionSubtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.s,
    color: colors.darkGray,
    marginBottom: spacing.m,
  },
  activityCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.m,
    marginBottom: spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.m,
  },
  activityIcon: {
    fontSize: 20,
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.m,
    color: colors.textDark,
  },
  activityPoints: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.s,
    color: colors.darkGray,
  },
  addButton: {
    width: 40,
    height: 40,
    padding: 0,
  },
});

export default HomeScreen; 