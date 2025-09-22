import { useState } from "react"
import { useCreateTask } from "../hooks/useTask";
import type { TaskForm } from "../types/TaskTypes";

export function CreateTask(){
    const [form, setForm] = useState<TaskForm>({
        title: "",
        description: "",
        state: "",
        due_date: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const validate = (): boolean => {
        if (!form.title.trim()) return false
        if (!form.description.trim()) return false
        if (!form.state.trim()) return false
        if (!form.due_date.trim()) return false
        return true
    }

    const { mutate, isPending, isError } = useCreateTask()


    const handleSubmit = (e: React.FormEvent) => {
        if(isPending){
            return;
        }
        e.preventDefault()
        if (!validate()) {
            alert("Please fill all fields")
            return
        }
        console.log("Form submitted", form)
        const newForm = {
            ...form,
            "due_date": new Date(form.due_date).toISOString(),
        }
        mutate(newForm)
        if(!isError){
            setForm({
                title: "",
                description: "",
                state: "",
                due_date: "",
            })
        }
    }
    return(
        <form onSubmit={handleSubmit} className="flex gap-2 p-4 mb-4 border rounded-2xl">
            <input
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                className="border rounded-2xl text-center"
            />
            <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="border rounded-2xl text-center"
            />
            <select name="state" className="bg-[#242424] border rounded-2xl" value={form.state} onChange={handleChange}>
                <option value="">Select state</option>
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
                <option value="BLOCKED">Blocked</option>
                <option value="BACKLOG">Backlog</option>
            </select>
            <input name="due_date" 
                type="datetime-local" 
                value={form.due_date}
                onChange={handleChange}
                className="border rounded-2xl text-center"
            />
            <button type="submit">
                {isPending ? "Creating Task..." : "Create Task"}
            </button>
        </form>
    )
}