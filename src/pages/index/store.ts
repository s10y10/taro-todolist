import { create } from "zustand";
import { StorageItem } from "./types";

interface State {
  allData: StorageItem[];
  todoArray: StorageItem[];
  completeArray: StorageItem[];
  tabList: { title: string; text?: string }[];
  filterData: () => void;
}

export const useStore = create<State>(set => ({
  allData: [],
  todoArray: [],
  completeArray: [],
  tabList: [],
  filterData: () =>
    set(state => {
      const filterTodoItems = state.allData.filter(item => !item.isComplete);
      const filterCompleteItems = state.allData.filter(item => item.isComplete);
      return {
        todoArray: filterTodoItems,
        completeArray: filterCompleteItems,
        tabList: [
          { title: "待办事项", text: `${filterTodoItems.length || ""}` },
          { title: "已办事项", text: `${filterCompleteItems.length || ""}` },
          { title: "新增" }
        ]
      };
    })
}));
