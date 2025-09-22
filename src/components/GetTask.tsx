import type { TaskList } from "../types/TaskTypes"
import { useUpdateTaskState, useUpdateTaskDepend, useDeleteTaskDepend, useDeleteTask } from "../hooks/useTask";

type TaskListProps = {
  tasks: TaskList[]
}

function converDateTime(dateTime: string){
    const date = new Date(dateTime)

    return date.toLocaleString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // 24-hour format
    })
}

export function GetTask({tasks} : TaskListProps){
    const { mutate: updateState} = useUpdateTaskState()
    const { mutate: updateDependents} = useUpdateTaskDepend()
    const { mutate: deleteTaskDependents} = useDeleteTaskDepend()
    const { mutate: deleteTask, isPending: isDeleteTaskPending} = useDeleteTask()

    function checkOriDependArr(taskId: number, dependArr: number) {
        const task = tasks.find(t => t.id === taskId);
        const reqObject = {id: taskId, dependId:dependArr};
        if (task && task.blockers.includes(dependArr)) {
            deleteTaskDependents(reqObject)
        }else{
            updateDependents(reqObject)
        }
    }

    function deleteTaskClick(taskId: number){
        if(isDeleteTaskPending){
            return
        }
        deleteTask({id: taskId})
    }

    return(
        <div>
            {tasks?.map((oneTask: TaskList) => (
                <div key={oneTask.id} className="flex gap-4 p-2 mb-2 w-full justify-center items-center border rounded-2xl">
                    <div>{oneTask.title}</div>

                    <div className="flex-1">{oneTask.description}</div>
                    
                    <div className="font-bold">{converDateTime(oneTask.due_date)}</div>
                    
                    <select className="bg-[#242424]" name="state" value={oneTask.state} onChange={(e) => updateState({ id: oneTask.id, state: e.target.value})}>
                        <option value="">Select state</option>
                        <option value="TODO">To Do</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="DONE">Done</option>
                        <option value="BLOCKED">Blocked</option>
                        <option value="BACKLOG">Backlog</option>
                    </select>

                    <select className="bg-[#242424] flex-1 text-center" name="blocker" multiple value={oneTask.blockers.map(String)} onChange={(e) => checkOriDependArr(oneTask.id, parseInt(e.target.value))}>
                        {/* <option value="">Select Dependencies</option> */}
                        {tasks.filter((t) => t.id !== oneTask.id)
                            .map((t) => (
                            <option key={t.id} value={t.id}>
                                {t.title}
                            </option>
                        ))}
                    </select>

                    <button onClick={() => deleteTaskClick(oneTask.id)}>
                        {isDeleteTaskPending ? "Deleting Task..." : "Delete Task"}
                    </button>
                </div>
            ))}
        </div>
    )
}