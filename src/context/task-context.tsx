import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';

export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
};

interface TaskContextData {
  tasks: Task[];
  currentTask?: Task;
  addTask: (task: Task) => void;
  editTask: (id: string, updatedTask: Task) => void;
  selectTask: (id: string) => void;
  removeTask: (id: string) => void;
}

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskContext = createContext<TaskContextData>({} as TaskContextData);

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task>();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const savedTasks = await SecureStore.getItemAsync('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const saveTasks = async (newTasks: Task[]) => {
    try {
      await SecureStore.setItemAsync('tasks', JSON.stringify(newTasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const addTask = (task: Task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const editTask = (id: string, updatedTask: Task) => {
    const newTasks = tasks.map(task => (task.id === id ? updatedTask : task));
    setTasks(newTasks);
    saveTasks(newTasks);
    setCurrentTask(undefined);
  };

  const selectTask = (id: string) => {
    setCurrentTask(tasks.find(x => x.id === id));
  };

  const removeTask = (id: string) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, editTask, removeTask, selectTask, currentTask }}>
      {children}
    </TaskContext.Provider>
  );
};