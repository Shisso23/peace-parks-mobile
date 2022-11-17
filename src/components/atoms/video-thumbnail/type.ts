import { GestureResponderEvent, ImageSourcePropType } from "react-native"

export type VideoThumbnailProps = {
    thumbnailId: string,
    onPress?: (event: GestureResponderEvent) => void
    title: string
}