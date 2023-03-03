import { View, Text } from "@tarojs/components";
import { AtList, AtIcon, AtSwitch } from "taro-ui";

export default ({ dataList, handleDelete, handleSwitch }) => {
  return (
    <AtList>
      {dataList.map(item => {
        return (
          <View className="todo-item" key={item.id}>
            <Text>{item.value}</Text>
            <View className="operate">
              <AtIcon
                value="trash"
                size="30"
                color="#F00"
                onClick={() => {
                  handleDelete(item);
                }}
              ></AtIcon>
              <AtSwitch
                checked={false}
                onChange={event => {
                  handleSwitch(item, event);
                }}
              />
            </View>
          </View>
        );
      })}
    </AtList>
  );
};
