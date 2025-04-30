import { Filter, Todo } from "../presentation/store/todo";

export const filterTask = (filter: Filter, todos:Todo[]) : Todo[] => {
    if(filter == Filter.all)
        return [];
    return todos.filter((item) => {
        switch (filter) {
                case Filter.todo:
                    return !item.completed;
                case Filter.completed:
                    return item.completed;
        }
    });
}