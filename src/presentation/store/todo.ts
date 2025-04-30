import { create } from "zustand";
import { readData, storeData } from "../../config/storageHelpers";
import { filterTask } from "../../config/helpers";

export interface Todo {
    id: number;
    name:string;
    completed:boolean;
    deleted:boolean;
}

export enum Filter{
    all = "All",
    todo = "Todo",
    completed = "Completed",
}

interface TodoState{
    todos: Todo[],
    todosFilter: Todo[],
    filter: Filter,
    addTodo: (todo:Todo) => void;
    deleteTodo: (id:number) => void;
    completeTodo: (id:number, status: boolean) => void;
    changeFilter: (filer: Filter) => void;
    loadTodos: () => void;
}

const useTodo = create<TodoState>()((set, get) => ({
    todos: [],
    todosFilter: [],
    filter: Filter.all,
    addTodo: (todo: Todo)=>{
        set({todos:[...get().todos,todo]});
        storeData([...get().todos,todo], "TODOS");
    },
    deleteTodo: (id: number)=>{
        const filterTodos = [...get().todos.filter((todo) => todo.id != id)];
        const filterTodoByFilter = filterTask(get().filter, filterTodos);
        set({
            todos: filterTodos,
            filter: get().filter != Filter.all ? filterTodoByFilter.length == 0 ? Filter.all : get().filter : get().filter,
            todosFilter: filterTodoByFilter,
        });

        storeData(filterTodos, "TODOS");

    },
    completeTodo: (id: number, status: boolean)=>{
        let todos = get().todos;
        let index = (todos.findIndex((x) => x.id == id));

        todos[index] = {...todos[index], completed: status,} ;
        const filterTodoByFilter = filterTask(get().filter, [...todos]);

        set((state) => ({todos: [...todos], 
            filter: get().filter != Filter.all ? filterTodoByFilter.length == 0 ? Filter.all : get().filter: get().filter,
            todosFilter: filterTodoByFilter}));
        storeData(todos, "TODOS");
    },
    changeFilter: (filter: Filter) => {
        if(filter != Filter.all){
            set((state) => ({
                filter: filter,
                todosFilter: filterTask(filter, state.todos),
            }));
            return;
        }

        set((state) => ({
            todosFilter: [],
            filter: Filter.all,
        }))

    },
    loadTodos: async ()=> {
        const savedTodos = await readData('TODOS');
        console.log(savedTodos);
        set(({todos: [...savedTodos]}));
    },
}));

export default useTodo;