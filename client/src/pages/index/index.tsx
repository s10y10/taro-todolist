import { View } from "@tarojs/components";
import { getStorageSync } from "@tarojs/taro";
import { useEffect, useState } from "react";
import { AtTabBar } from "taro-ui";
import { shallow } from "zustand/shallow";
import { STORAGE_KEY } from "./consts";
import useOperate from "./hooks/useOperate";
import "./index.scss";
import AddPanel from "./panel/addPanel";
import CompletedPanel from "./panel/completedPanel";
import TodoPanel from "./panel/todoPanel";
import { useStore } from "./store";
import { StorageItem } from "./types";

export default () => {
  const [currentTab, setCurrentTab] = useState(0);
  const { filterData, addItemCB, deleteItemCB, itemSwitchCB } = useOperate();

  const { completeArray, todoArray, tabList } = useStore(
    state => ({
      todoArray: state.todoArray,
      completeArray: state.completeArray,
      tabList: state.tabList
    }),
    shallow
  );

  //获取保存的数据并过滤出两个列表
  useEffect(() => {
    const allData: StorageItem[] = getStorageSync(STORAGE_KEY) || [];
    useStore.setState(() => ({ allData }));
    filterData();
  }, []);

  return (
    <View className="index">
      <>{currentTab === 2 && <AddPanel addItemCB={addItemCB} />}</>
      <>
        {currentTab === 1 && (
          <CompletedPanel
            data={completeArray}
            deleteItemCB={deleteItemCB}
            itemSwitchCB={itemSwitchCB}
          />
        )}
      </>
      <>
        {currentTab === 0 && (
          <TodoPanel
            data={todoArray}
            deleteItemCB={deleteItemCB}
            itemSwitchCB={itemSwitchCB}
          />
        )}
      </>
      <AtTabBar
        fixed
        tabList={tabList}
        onClick={value => {
          setCurrentTab(value);
        }}
        current={currentTab}
      />
    </View>
  );
};
