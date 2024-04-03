import { StatusBar } from 'expo-status-bar'
import '../styles/global.css'

import { Slot } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Layout() {
	return (
		<SafeAreaView style={{ flex: 1 }} className='bg-gray-100'>
      <StatusBar style='light' />
      <Slot />
    </SafeAreaView>
	)
}