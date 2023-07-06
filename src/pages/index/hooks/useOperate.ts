import { setStorageSync } from "@tarojs/taro";
import { useStore } from "../store";
import { STORAGE_KEY } from "../consts";
import { StorageItem } from "../types";

export default () => {
  const allData = useStore(state => state.allData);
  const filterData = useStore(state => state.filterData);

  // 添加一个项目
  const addItemCB = inputValue => {
    const id = `${Date.now()}`;
    const newItem: StorageItem = {
      id,
      isComplete: false,
      value: inputValue,
      time: Date.now()
    };
    allData.push(newItem);
    setStorageSync(STORAGE_KEY, allData);
    filterData();
  };

  //删除一个项目
  const deleteItemCB = (item: StorageItem) => {
    const foundIndex = allData.findIndex(it => item.id === it.id);
    if (foundIndex !== -1) {
      allData.splice(foundIndex, 1);
      setStorageSync(STORAGE_KEY, allData);
      filterData();
    }
  };

  //当切换开关时候的回调
  const itemSwitchCB = (item: StorageItem, newValue: boolean) => {
    item.isComplete = newValue;
    setStorageSync(STORAGE_KEY, allData);
    filterData();
  };

  return {
    filterData,
    addItemCB,
    deleteItemCB,
    itemSwitchCB
  };
};
