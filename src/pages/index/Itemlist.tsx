import { View, Text } from "@tarojs/components";
import { AtList, AtIcon, AtSwitch } from "taro-ui";
import { TransitionGroup, CSSTransition } from "react-transition-group";

export default ({ dataList, handleDelete, handleSwitch, checked = true }) => {
  return (
    <TransitionGroup component={AtList}>
      {dataList.map(item => {
        return (
          <CSSTransition timeout={500} classNames="fade" key={item.id}>
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
                  checked={checked}
                  onChange={event => {
                    handleSwitch(item, event);
                  }}
                />
              </View>
            </View>
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};
