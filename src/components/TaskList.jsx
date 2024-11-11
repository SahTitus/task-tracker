import { EmptyTasks } from "./EmptyTasks";
import { TaskItem } from "./TaskItem";

export const TaskList = ({ tasks, toggleForm, handleOnEditClick, deleteTask, toggleCheckTask }) => {
	return (
		<div className="flex flex-col gap-3">
			{tasks?.length === 0 ? (
				<EmptyTasks toggleForm={toggleForm} />
			) : (tasks?.map((task) => (
				<TaskItem
					task={task}
					key={task.id}
					deleteTask={deleteTask}
					toggleCheckTask={toggleCheckTask}
					handleOnEditClick={handleOnEditClick}
				/>
			))
			)}
		</div>
	);
};
