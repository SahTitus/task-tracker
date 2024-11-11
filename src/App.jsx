import './App.css'
import { useState } from 'react'
import { TaskList } from './components/TaskList'
import { Header } from './components/Header';
import { TaskForm } from './components/TaskForm';
import { useTasks } from './hooks/useTasks';
import { BackgroundPattern } from './components/BackgroundPattern';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const { displayedTasks, isLoading, addTask, handleSearch, handleFilter, deleteTask, editTask, toggleCheckTask } = useTasks();

  const toggleForm = () => {
    setShowForm((prevState) => !prevState);
  };

  const handleOnEditClick = (selectedTask) => {
    setTaskToEdit(selectedTask);
    toggleForm();
  };

  return (
    <div className='max-w-3xl mx-auto px-2 py-4 sm:p-8'>
      <Header
        toggleForm={toggleForm}
        handleSearch={handleSearch}
        handleFilter={handleFilter}
      />

      {isLoading && <p className='text-3xl font-bold '>Loading...</p>}

      <TaskList
        tasks={displayedTasks}
        deleteTask={deleteTask}
        toggleForm={toggleForm}
        handleOnEditClick={handleOnEditClick}
        toggleCheckTask={toggleCheckTask}
      />

      {showForm && <TaskForm
        addTask={addTask}
        showForm={showForm}
        editTask={editTask}
        taskToEdit={taskToEdit}
        toggleForm={toggleForm}
        setTaskToEdit={setTaskToEdit}
      />}

      <BackgroundPattern />
    </div>
  )
}

export default App;