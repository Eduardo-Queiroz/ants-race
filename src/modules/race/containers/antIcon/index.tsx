import React from 'react';
import {View} from 'react-native';
import AntSvg from '../../../../../assets/icons/ant';
import {SvgXml} from 'react-native-svg';
import {mapAntToColor} from '../../../../util/mapper/mapAntToColor';
import {styles} from './styles';

export const AntIconContainer = ({color}: {color: string}) => {
  return (
    <View
      style={[
        styles.containerIcon,
        {
          backgroundColor: mapAntToColor(color),
        },
      ]}>
      <SvgXml height={20} width={20} color="#555" xml={AntSvg} />
    </View>
  );
};
