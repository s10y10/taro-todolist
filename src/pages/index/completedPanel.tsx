import { View } from "@tarojs/components";
import Itemlist from "./Itemlist";

function CompletedPanel({ data, deleteItemCB, itemSwitchCB }) {
  return (
    <View className="panel completed">
      <Itemlist
        dataList={data}
        handleDelete={deleteItemCB}
        handleSwitch={itemSwitchCB}
        checked
      ></Itemlist>
    </View>
  );
}

export default CompletedPanel;
