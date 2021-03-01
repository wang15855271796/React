import {Dimensions} from 'react-native'

export const screenWidth = Dimensions.get('window').width
export const screenheight = Dimensions.get('window').height

export const pxToDp = (ele)=> screenWidth * ele/375
