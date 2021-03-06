import COLORS from './colors';
import DECOR from './decor';
import FONTS from './font';
import SPACINGS from './spacing';

const text = {
  errorText: {
    ...FONTS.STYLE.normal,
    fontSize: FONTS.SIZE.superSmall,
    color: COLORS.red
  },
  defaultTextStyle: {
    ...FONTS.STYLE.normal,
    color: COLORS.dark1,
    fontSize: FONTS.SIZE.regular,
    letterSpacing: 0
  },
  defaultSize: FONTS.SIZE.regular,
  largeTitleSize: FONTS.SIZE.superLarge
};

const header = {
  headerHeight:  DECOR.scaleInApp(55),
  backgroundColor: COLORS.dark4,
  headerTintColor: COLORS.dark1
};
const opacityButton = {
  button: {
    backgroundColor: COLORS.blue,
    paddingHorizontal: 5,
    borderRadius: 6,
    borderWidth: DECOR.borderWidth,
    borderColor: COLORS.transparent,
    height: DECOR.buttonHeight,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    ...text.defaultTextStyle,
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 18,
    letterSpacing: 0
  },
  disabled: {
    backgroundColor: COLORS.blue3,
  }
};

const indicator = {
  color: COLORS.blue
};

const container = {
  padding: SPACINGS.small,
  backgroundColor: COLORS.grey
};

const toast = {
  error: {
    backgroundColor: COLORS.red,
    textColor: COLORS.white
  },
  warning: {
    backgroundColor: COLORS.orange,
    textColor: COLORS.white
  },
  info: {
    backgroundColor: COLORS.primary,
    textColor: COLORS.white
  }
};

const textInput = {
  ...text.defaultTextStyle,
  borderBottomWidth: DECOR.borderWidth,
  borderColor: COLORS.lightGrey4
};

const divider = {
  color: COLORS.black,
  height: 1
};

const modal = {
  headerHeight: DECOR.scaleInApp(44)
};

export default {
  header,
  opacityButton,
  text,
  indicator,
  container,
  textInput,
  toast,
  divider,
  modal,
  Button: {
    containerStyle: {
      backgroundColor: 'red'
    }
  }
};
