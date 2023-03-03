import Taro, { setStorageSync, getStorageSync } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtButton, AtInput, AtDivider, AtMessage } from "taro-ui";
import { useState, useEffect, useRef } from "react";
import md5 from "md5";
import "./index.scss";
import Itemlist from "./Itemlist";
import { StorageItem } from "./types";

const STORAGE_KEY: string = "taro-dotolist-storage";

export default () => {
  const allDataRef = useRef<StorageItem[]>();

  const [inputValue, setInputValue] = useState<any>("");
  const [todoArray, setTodoArray] = useState<StorageItem[]>([]);
  const [completeArray, setComplateArray] = useState<StorageItem[]>([]);

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
  };

  //获取保存的数据并过滤出两个列表
  useEffect(() => {
    const allData: StorageItem[] = getStorageSync(STORAGE_KEY) || [];
    allDataRef.current = allData;
    filterData();
  }, []);

  //设置输入框内容
  const handleChange = (newVal: string) => {
    setInputValue(newVal);
  };

  //添加一个项目到todoList
  const handleAdd = () => {
    if (!inputValue) {
      (Taro as any).atMessage({
        message: "啥都没输入啊",
        type: "error"
      });
      return;
    }
    const id = md5(Date.now());
    const newItem: StorageItem = {
      id,
      isComplete: false,
      value: inputValue,
      time: Date.now()
    };
    allDataRef.current?.push(newItem);
    setStorageSync(STORAGE_KEY, allDataRef.current);
    filterData();
    handleChange("");
  };

  //删除一个项目
  const handleDeleteItem = (item: StorageItem) => {
    const foundIndex = allDataRef.current!.findIndex(it => item.id === it.id);
    if (foundIndex !== -1) {
      allDataRef.current?.splice(foundIndex, 1);
      setStorageSync(STORAGE_KEY, allDataRef.current);
      filterData();
    }
  };

  //当切换开关时候的回调
  const itemSwitchChangeHandle = (item: StorageItem, newValue: boolean) => {
    item.isComplete = newValue;
    setStorageSync(STORAGE_KEY, allDataRef.current);
    filterData();
  };

  return (
    <View className="index">
      <AtMessage />
      <Text className="title">输入一个新的todo项</Text>
      <AtInput
        name="value"
        placeholder="在这里填一个要新增的项"
        value={inputValue}
        onChange={handleChange}
      ></AtInput>
      <AtButton type="primary" size="small" onClick={handleAdd}>
        添加
      </AtButton>
      <AtDivider />
      <Text>未完成：</Text>
      <Itemlist
        dataList={todoArray}
        handleDelete={handleDeleteItem}
        handleSwitch={itemSwitchChangeHandle}
      ></Itemlist>
      <AtDivider />
      <Text>已完成：</Text>
      <Itemlist
        dataList={completeArray}
        handleDelete={handleDeleteItem}
        handleSwitch={itemSwitchChangeHandle}
      ></Itemlist>
    </View>
  );
};
