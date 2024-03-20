// services/todoService.js

import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export async function createTodo(todo) {
    try {
        const docRef = await addDoc(collection(db, 'todos'), todo);
        return docRef.id;
    } catch (error) {
        console.error('Error adding document: ', error);
        throw error; // Propagar o erro para ser tratado no componente
    }
}

export async function getTodos() {
    const todosCollection = collection(db, 'todos');
    const todosSnapshot = await getDocs(todosCollection);
    return todosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function updateTodo(todoId, updatedTodo) {
    try {
        const todoRef = doc(db, 'todos', todoId);
        await updateDoc(todoRef, updatedTodo);
    } catch (error) {
        console.error('Error updating document: ', error);
        throw error; // Propagar o erro para ser tratado no componente
    }
}

export async function deleteTodo(todoId) {
    try {
        const todoRef = doc(db, 'todos', todoId);
        await deleteDoc(todoRef);
    } catch (error) {
        console.error('Error deleting document: ', error);
        throw error; // Propagar o erro para ser tratado no componente
    }
}
