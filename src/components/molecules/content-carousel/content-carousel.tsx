import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FlatList } from "react-native";
import tw from 'twrnc';

import categoryService from "../../../services/sub-services/category-service/category.service";
import { VideoThumbnail } from "../../atoms/video-thumbnail/video-thumbnail";
import { ContentCarouselProps } from "./types";

export const ContentCarousel: React.FC<ContentCarouselProps> = ({categoryId}) => {
    const categoryRef = useQuery([{categoryId}], () => categoryService.getCategory(categoryId));

    const renderVideoThumbnail = (itemData: { item: { thumbnailId: string; heading: string; id: string}; }) => {
      return(
        <>
          <VideoThumbnail thumbnailId={itemData.item.thumbnailId} title={itemData.item.heading} id={itemData.item.id}/>
        </>
      )
    }

    return (
      <>
        <FlatList
          data={categoryRef.data?.data.contents}
          horizontal={true}
          renderItem={renderVideoThumbnail}
          style={tw`pl-4`}
        />
      </>
    )
}