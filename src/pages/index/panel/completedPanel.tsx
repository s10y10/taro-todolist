import { View } from "@tarojs/components";
import Itemlist from "../Itemlist";

function CompletedPanel({ data, deleteItemCB, itemSwitchCB }) {
  return (
    <View className="panel completed">
      {data.length === 0 ? (
        <View>一个完成的都没有</View>
      ) : (
        <Itemlist
          dataList={data}
          handleDelete={deleteItemCB}
          handleSwitch={itemSwitchCB}
          checked
        ></Itemlist>
      )}
    </View>
  );
}

export default CompletedPanel;
