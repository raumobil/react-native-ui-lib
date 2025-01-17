import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors} from '../../style';
import {BaseComponent} from '../../commons';
import TouchableOpacity from '../../components/touchableOpacity';
import View from '../view';
import ListItemPart from './ListItemPart';

/**
 * @description: List item component to render inside a List component
 * @extends: TouchableOpacity
 * @gif: https://media.giphy.com/media/l1IBjHowyPcOTWAY8/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/BasicListScreen.js
 */
class ListItem extends BaseComponent {
  static displayName = 'ListItem';

  static propTypes = {
    /**
     * the list item height
     */
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * action for when pressing the item
     */
    onPress: PropTypes.func,
    /**
     * action for when long pressing the item
     */
    onLongPress: PropTypes.func,
    /**
     * Additional styles for the top container
     */
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * The container element to wrap the ListItem
     */
    containerElement: PropTypes.elementType
  };

  static defaultProps = {
    height: 63,
    containerElement: TouchableOpacity,
    underlayColor: Colors.dark70
  };

  constructor(props) {
    super(props);
    this.state = {
      pressed: false
    };
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  onHideUnderlay() {
    this.setPressed(false);
  }
  onShowUnderlay() {
    this.setPressed(true);
  }
  setPressed(isPressed) {
    this.setState({pressed: isPressed});
  }

  render() {
    const {
      containerElement,
      containerStyle,
      style,
      onPress,
      onLongPress,
      underlayColor,
      testID,
      ...others
    } = this.props;
    const {pressed} = this.state;
    const pressedStyle = {backgroundColor: underlayColor};
    const Container = onPress || onLongPress ? containerElement : View;

    return (
      <Container
        activeOpacity={1}
        style={[this.styles.container, containerStyle]}
        onPress={onPress}
        onLongPress={onLongPress}
        onHideUnderlay={this.onHideUnderlay}
        onShowUnderlay={this.onShowUnderlay}
        testID={testID}
        {...others}
      >
        <View style={[this.styles.innerContainer, style, pressed && pressedStyle]}>{this.props.children}</View>
      </Container>
    );
  }
}

function createStyles({height}) {
  return StyleSheet.create({
    container: {
      backgroundColor: Colors.white
    },
    innerContainer: {
      flexDirection: 'row',
      height
    }
  });
}

ListItem.Part = ListItemPart;

export default ListItem;
