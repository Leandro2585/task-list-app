import { Text, View } from 'react-native';
import { TaskProvider } from '../context/task-context';
import AddTaskForm from '../components/add-task-form';
import TaskList from '../components/task-list';

export default function Home() {
	return (
		<TaskProvider>
      <View className='flex-1 justify-center p-2'>
        <TaskList />
        <AddTaskForm />
      </View>
    </TaskProvider>
	)
}