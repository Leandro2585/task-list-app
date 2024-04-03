import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, Button, TouchableOpacity, Text } from 'react-native';
import { TaskContext } from '../context/task-context';
import { Ionicons } from '@expo/vector-icons';
import * as Crypto from 'expo-crypto';

export default function AddTaskForm() {
	const { addTask, editTask, currentTask } = useContext(TaskContext);
 	const [title, setTitle] = useState('');
 	const [description, setDescription] = useState('');

	const handleSubmit = () => {
		if(currentTask) {
			editTask(currentTask.id, { ...currentTask, title, description })
		} else {
			const currentDate = new Date();
			const createdDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`
			addTask({ 
				id: Crypto.randomUUID(), 
				title, 
				description, 
				completed: false, 
				created_at:  createdDate
			});
		}
		
		setTitle('');
		setDescription('');
	};

	useEffect(() => {
		if(currentTask?.title && currentTask?.description) {
			setTitle(currentTask?.title)
			setDescription(currentTask?.description)
		}
	}, [currentTask])

 return (
    <View className='p-4'>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder='Título'
				className='border p-2 rounded-md mb-4'
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder='Descrição'
				multiline={true}
				textAlignVertical='top'
				className='border p-2 rounded-md mb-4 h-24'
      />
      <TouchableOpacity onPress={handleSubmit} className='bg-blue-500 flex-row justify-center items-center p-2 rounded-md mb-4'>
        <Text className='text-white mr-2'>{currentTask ? 'Editar' : 'Adicionar' } Tarefa</Text>
        <Ionicons name={currentTask ? 'create-outline' : 'add-circle-outline'} size={24} color='white' className='text-white'/>
      </TouchableOpacity>
    </View>
 );
};