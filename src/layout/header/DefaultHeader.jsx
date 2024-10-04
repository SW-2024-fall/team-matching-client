import { useNavigation } from '@react-navigation/native';
import { View, Text, Pressable } from 'react-native';
import { PAGES } from '@navigation/constant';
import BaseHeader from '@layout/header/BaseHeader';

function GoBackButton({ canGoBack, goBack }) {
  if (canGoBack) {
    return (
      <Pressable
        onPress={() => {
          goBack();
        }}
      >
        <Text>뒤로가기</Text>
      </Pressable>
    );
  } else {
    return <View />;
  }
}

function Logo({ goHome }) {
  return (
    <Pressable onPress={() => goHome()}>
      <Text>시대생 모여라</Text>
    </Pressable>
  );
}

export default function DefaultHeader({ title = '', hasLogo = true, isLogoCenter = false }) {
  const navigation = useNavigation();

  const canGoBack = navigation.canGoBack();
  const goBack = () => {
    navigation.goBack();
  };
  const goHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: PAGES.MAIN }],
    });
  };

  return (
    <BaseHeader
      left={<GoBackButton canGoBack={canGoBack} goBack={goBack} />}
      center={isLogoCenter && hasLogo ? <Logo goHome={goHome} /> : <Text>{title}</Text>}
      right={isLogoCenter == false && hasLogo ? <Logo goHome={goHome} /> : null}
    />
  );
}
