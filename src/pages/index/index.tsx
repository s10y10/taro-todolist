import { View } from "@tarojs/components";
import { getStorageSync, setStorageSync } from "@tarojs/taro";
import { useEffect, useRef, useState } from "react";
import { AtTabBar } from "taro-ui";
import AddPanel from "./addPanel";
import CompletedPanel from "./completedPanel";
import "./index.scss";
import TodoPanel from "./todoPanel";
import type { StorageItem } from "./types";

const STORAGE_KEY: string = "taro-dotolist-storage";

export default () => {
  const allDataRef = useRef<StorageItem[]>();
  const [todoArray, setTodoArray] = useState<StorageItem[]>([]);
  const [tabList,setTabList] = useState<any>([]);
  const [completeArray, setComplateArray] = useState<StorageItem[]>([]);
  const [current, setCurrent] = useState(0);

    
  const handleClick = value => {
    setCurrent(value);
  };

  //过滤两个列表的数据
  const filterData = () => {
    const filterTodoItems = allDataRef.current!.filter(
      item => !item.isComplete
    );
    const filterCompleteItems = allDataRef.current!.filter(
      item => item.isComplete
    );
    setTodoArray(filterTodoItems);
    setComplateArray(filterCompleteItems);
    setTabList([
      { title: "待办事项",text:filterTodoItems.length || '' },
      { title: "已办事项",text:filterCompleteItems.length || '' },
      { title: "新增" }
    ])
  };

  //获取保存的数据并过滤出两个列表
  useEffect(() => {
    const allData: StorageItem[] = getStorageSync(STORAGE_KEY) || [];
    allDataRef.current = allData;
    filterData();
  }, []);


  const addItemCB = (inputValue) => {
    const id = `${Date.now()}`;
    const newItem: StorageItem = {
      id,
      isComplete: false,
      value: inputValue,
      time: Date.now()
    };
    allDataRef.current?.push(newItem);
    setStorageSync(STORAGE_KEY, allDataRef.current);
    filterData();
  };

    //删除一个项目
    const deleteItemCB = (item: StorageItem) => {
      const foundIndex = allDataRef.current!.findIndex(it => item.id === it.id);
      if (foundIndex !== -1) {
        allDataRef.current?.splice(foundIndex, 1);
        setStorageSync(STORAGE_KEY, allDataRef.current);
        filterData();
      }
    };

      //当切换开关时候的回调
  const itemSwitchCB = (item: StorageItem, newValue: boolean) => {
    item.isComplete = newValue;
    setStorageSync(STORAGE_KEY, allDataRef.current);
    filterData();
  };

  return (
    <View className="index">
      <>{current === 2 && <AddPanel addItemCB={addItemCB} />}</>
      <>{current === 1 && <CompletedPanel data={completeArray} deleteItemCB={deleteItemCB} itemSwitchCB={itemSwitchCB} />}</>
      <>{current === 0 && <TodoPanel data={todoArray}  deleteItemCB={deleteItemCB} itemSwitchCB={itemSwitchCB} />}</>
      <AtTabBar
        fixed
        tabList={tabList}
        onClick={handleClick.bind(this)}
        current={current}
      />
    </View>
  );
};
