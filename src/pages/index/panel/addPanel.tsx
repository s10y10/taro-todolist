import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";
import { AtButton, AtInput, AtMessage } from "taro-ui";

function AddPanel({ addItemCB }) {
  const [inputValue, setInputValue] = useState<any>("");
  const handleChange = (newVal: string) => {
    setInputValue(newVal);
    return newVal;
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
    addItemCB(inputValue);
    return handleChange("");
  };

  return (
    <View className="panel add">
      <AtMessage />
      <AtInput
        name="value"
        placeholder="在这里填一个要新增的项"
        value={inputValue}
        onChange={handleChange}
      ></AtInput>
      <AtButton type="primary" size="small" onClick={handleAdd}>
        添加
      </AtButton>
    </View>
  );
}

export default AddPanel;
