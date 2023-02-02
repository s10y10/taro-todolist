import Taro, { setStorageSync, getStorageSync } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import {
  AtButton,
  AtInput,
  AtList,
  AtDivider,
  AtIcon,
  AtSwitch,
  AtMessage
} from "taro-ui";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "./index.scss";

type StorageItem = {
  id: string;
  value: string;
  isComplete: boolean;
};

const STORAGE_KEY = "taro-dotolist-storage";

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
    const allData: StorageItem[] = getStorageSync(STORAGE_KEY);
    allDataRef.current = allData;
    filterData();
  }, []);

  //设置输入框内容
  const handleChange = newVal => {
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
    const uid = uuidv4();
    const newItem: StorageItem = {
      id: uid,
      isComplete: false,
      value: inputValue
    };
    allDataRef.current?.push(newItem);
    setStorageSync(STORAGE_KEY, allDataRef.current);
    filterData();
  };

  //删除一个项目
  const handleDeleteItem = item => {
    const foundIndex = allDataRef.current!.findIndex(it => item.id === it.id);
    if (foundIndex !== -1) {
      allDataRef.current?.splice(foundIndex, 1);
      setStorageSync(STORAGE_KEY, allDataRef.current);
      filterData();
    }
  };

  //当切换开关时候的回调
  const itemSwitchChangeHandle = (item: StorageItem, newValue) => {
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
      <AtList>
        {todoArray.map(item => {
          return (
            <View className="todo-item" key={item.id}>
              <Text>{item.value}</Text>
              <View className="operate">
                <AtIcon
                  value="trash"
                  size="30"
                  color="#F00"
                  onClick={() => {
                    handleDeleteItem(item);
                  }}
                ></AtIcon>
                <AtSwitch
                  checked={false}
                  onChange={event => {
                    itemSwitchChangeHandle(item, event);
                  }}
                />
              </View>
            </View>
          );
        })}
      </AtList>
      <AtDivider />
      <Text>已完成：</Text>
      <AtList>
        {completeArray.map(item => {
          return (
            <View className="todo-item" key={item.id}>
              <Text>{item.value}</Text>
              <View className="operate">
                <AtIcon
                  value="trash"
                  size="30"
                  color="#F00"
                  onClick={() => {
                    handleDeleteItem(item);
                  }}
                ></AtIcon>
                <AtSwitch
                  checked
                  onChange={event => {
                    itemSwitchChangeHandle(item, event);
                  }}
                />
              </View>
            </View>
          );
        })}
      </AtList>
    </View>
  );
};
