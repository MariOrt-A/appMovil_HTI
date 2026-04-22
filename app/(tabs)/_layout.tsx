import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Calculadora' }} />
      <Tabs.Screen name="explore" options={{ title: 'Explorar' }} />
    </Tabs>
  );
}