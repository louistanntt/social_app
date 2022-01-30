import {useEffect, useState} from 'react';
import {Dimensions, Keyboard} from 'react-native';

const useKeyboard = () => {
  const windowWidth = Dimensions.get('window').width;
  const [keyboardShown, setKeyboardShown] = useState<boolean>(false);
  const [floating, setFloating] = useState<boolean>(false);

  useEffect(() => {
    const onKeyboardDidShow = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardShown(true),
    );
    const onKeyboardDidHide = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardShown(false),
    );

    const onKeyboardWillChangeFrame = Keyboard.addListener(
      'keyboardWillChangeFrame',
      (event: KeyboardEvent & {endCoordinates: any}) => {
        setFloating(event.endCoordinates.width !== windowWidth);
      },
    );

    return () => {
      onKeyboardDidShow.remove();
      onKeyboardDidHide.remove();
      onKeyboardWillChangeFrame.remove();
    };
  }, []);

  return {keyboardShown, floating};
};

export default useKeyboard;