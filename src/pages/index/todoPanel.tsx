import { View } from "@tarojs/components";
import Itemlist from "./Itemlist";

function TodoPanel({ data, deleteItemCB, itemSwitchCB }) {
  return (
    <View className="panel todo">
      <Itemlist
        dataList={data}
        handleDelete={deleteItemCB}
        handleSwitch={itemSwitchCB}
        checked={false}
      ></Itemlist>
    </View>
  );
}

export default TodoPanel;
