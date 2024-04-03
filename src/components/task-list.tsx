import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Task, TaskContext } from '../context/task-context';
import { Ionicons } from '@expo/vector-icons';

export default function TaskList() {
 const { tasks, removeTask, selectTask, editTask } = useContext(TaskContext);
 const toggleCompleted = (id: string) => {
	const taskToToggle = tasks.find(task => task.id === id);
	if (taskToToggle) {
		editTask(id, { ...taskToToggle, completed: !taskToToggle.completed });
	}
};

 const renderItem = ({ item }: { item: Task }) => (
	<TouchableOpacity onPress={() => selectTask(item.id)}>
    <View className='p-4 border-b border-gray-100 d-flex flex-row justify-between'>
			<View className='flex-1 max-w-[90%]'>
				<Text className='font-bold'>{item.title}</Text>
				<Text>{item.description}</Text>
				<Text>{item.created_at}</Text> 
			</View>
			<TouchableOpacity onPress={() => toggleCompleted(item.id)} style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
        <Ionicons name={item.completed ? "checkmark-circle-outline" : "ellipse-outline"} size={32} color={item.completed ? "green" : "#ccc"} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => removeTask(item.id)} className='w-10 h-10 flex items-center justify-center'>
				<Ionicons name="trash-outline" size={32} color="red" />
      </TouchableOpacity>
    </View>
	</TouchableOpacity>
 );

 return (
    <FlatList
      data={tasks}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
 );
};
