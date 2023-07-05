import { View } from "@tarojs/components";
import Itemlist from "../Itemlist";

function TodoPanel({ data, deleteItemCB, itemSwitchCB }) {
  return (
    <View className="panel todo">
      {data.length === 0 ? (
        <View>没有待办事项,去新增一个吧</View>
      ) : (
        <Itemlist
          dataList={data}
          handleDelete={deleteItemCB}
          handleSwitch={itemSwitchCB}
          checked={false}
        ></Itemlist>
      )}
    </View>
  );
}

export default TodoPanel;
