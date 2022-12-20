import { useNavigation, useRoute } from "@react-navigation/native";
import { Icon, Input } from "@rneui/base";
import { Text } from "@rneui/themed";
import { useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import _ from "lodash";
import React, { useEffect, useState, useRef, useContext, createContext } from "react";
import { FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import Video from "react-native-video";
import tw from 'twrnc';

import { AppStackPropsWithParams, DrawerStackProps } from "../../../../navigation";
import commentService from "../../../../services/sub-services/comment-service/comment.service";
import contentService from "../../../../services/sub-services/content-service/content.service";
import images from "../../../../theme/images";
import { Colors } from "../../../../theme/variables";
import { CharacterCard } from "../../../molecules/character-card/character-card";
import { UserComment } from "../../../molecules/user-comment/user-comment";
import appConfig from '../../../../config';
import storageService from "../../../../services/sub-services/storage-service/storage.service";
import { getItem, saveItem } from "../../../../services/sub-services/storage-service/storage.service.utils";
import { VideoTime } from "./types";

export const ContentPage: React.FC = () => {
    const route: AppStackPropsWithParams<"Content"> = useRoute<AppStackPropsWithParams<'Content'>>();
    const contentRef: UseQueryResult<AxiosResponse<any, any>, unknown> = useQuery([route.params?.id], () => contentService.getContentDetail(route.params?.id))
    const commentsRef: UseQueryResult<AxiosResponse<any, any>, unknown> = useQuery([`${route.params?.id}_comments`], () => commentService.getComments(route.params?.id));

    const { hostUrl } = appConfig;
    const videoUrl = `${hostUrl}/User/Content/video/${contentRef.data?.data.content.content.id}`;


    const queryCache = useQueryClient();
    const navigation = useNavigation<DrawerStackProps>();

    const timespan = contentRef.data?.data.content.content.duration;
    const [minutes, setMinutes] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const [accessToken, setAccessToken] = useState<string>('');
    const [watchedProgress, setWatchedProgress] = useState<number>(0);
    const videoPlayerRef = useRef<Video>(null);

    const _goToHome = () => {
        saveWatchedProgress();
        navigation.navigate('Home')
    };

    const getWatchedTimes = async () => {
        return getItem(appConfig.videoTimesKey);
    }

    useEffect(() => {
        storageService.getAccessToken().then((token) => setAccessToken(token));
        getWatchedTimes().then((watchedTimes: VideoTime[]) => {
            if (watchedTimes) {
                let currentVideo = watchedTimes.find((videoTime: { id: string; }) => {
                    return videoTime.id === route.params?.id;
                })
                if(currentVideo?.watchedTime){
                    setWatchedProgress(currentVideo.watchedTime);
                }
                    
            }
        })
    }, [])

    useEffect(() => {
        if (timespan) {
            const hms = timespan.split(':');
            setMinutes(parseInt((hms[0] * 60 + (hms[1]))));
        }
    }, [timespan]);

    const [isFavourited, setFavourited] = useState<boolean>(contentRef.data?.data.isFavourited);
    const [isLiked, setLiked] = useState<boolean>(contentRef.data?.data.isLiked);

    useEffect(() => {
        setFavourited(contentRef.data?.data.isFavourited);
    }, [contentRef.data?.data.isFavourited])


    const videoConfig = {
        uri: videoUrl,
        headers: {
            accept: `*/*`,
            Authorization: `bearer ${accessToken}`,
            range: 'bytes=0-'
        }
    }

    const sendComment = (comment: string) => () => {
        if (comment == '') {
            Toast.show({ type: 'error', text1: 'Cannot Send Message' })
        } else {
            commentService.sendComment(contentRef.data?.data.content.content.id, comment).then(() => {
                setComment('');
                Toast.show({ type: 'success', text1: 'Comment Successfully Sent!' })
                queryCache.refetchQueries({ queryKey: [`${route.params?.id}_comments`] });
            });
            
        }
    }

    const favouriteVideo = () => {
        setFavourited(!isFavourited);
        contentService.favouriteVideo(contentRef.data?.data.content.content.id).then(() => {
            queryCache.refetchQueries({ queryKey: [route.params?.id] })
        });
    }

    const likeVideo = () => {
        setLiked(!isLiked);
        contentService.likeVideo(contentRef.data?.data.content.content.id).then(() => {
            queryCache.refetchQueries({ queryKey: [route.params?.id] })
        });
    }

    const updateWatchedProgress = (progress: { currentTime: React.SetStateAction<number>; }) => {
        setWatchedProgress(progress.currentTime);
    }

    const saveWatchedProgress = async () => {
        getWatchedTimes().then((cachedVideoTimes: VideoTime[]) => {
            let videoTimes = cachedVideoTimes;
            if (videoTimes) {
                if (videoTimes.some((item: { id: string; }) => item.id === route.params?.id)) {
                    videoTimes = videoTimes.filter((item: { id: string; }) => {
                        return item.id !== route.params?.id
                    })
                }
                videoTimes.push({
                    id: route.params?.id,
                    watchedTime: watchedProgress,
                });
                saveItem(appConfig.videoTimesKey, videoTimes);
            } else {
                const newVideoTimes = [{
                    id: route.params?.id,
                    watchedTime: watchedProgress,
                }];
                saveItem(appConfig.videoTimesKey, newVideoTimes);
            }
        });
        await contentService.trackWatchedTime(contentRef.data?.data.content.content.id, Math.floor(watchedProgress));
    }

    return (
        <View style={tw`bg-white h-full`}>
            <View style={tw`flex-1 bg-white`}>
                <View style={tw`h-[80%] bg-black pt-8`}>
                    <TouchableOpacity style={tw`flex flex-row mb-4 mt-0 ml-4 z-50 w-16`} onPress={_goToHome}>
                        <Image source={images.back} resizeMode="contain" style={tw`h-8 w-16 mt-1`} />
                    </TouchableOpacity>
                    <Video source={videoConfig}
                        ref={videoPlayerRef}
                        resizeMode="contain"
                        style={styles.backgroundVideo}
                        controls
                        onProgress={updateWatchedProgress}
                        onPlaybackStalled={saveWatchedProgress}
                        onLoad={() => videoPlayerRef.current?.seek(watchedProgress)}
                    />
                </View>
                <View style={tw`flex flex-row ml-2 mt-2 px-2`}>
                    <Text style={tw`flex-1 text-xl`}>{contentRef.data?.data.content.content.heading}</Text>
                    <TouchableOpacity style={tw`mr-4`} onPress={likeVideo}>
                        <Icon name={isLiked ? "thumb-up" : "thumb-up-outline"} type="material-community" />
                    </TouchableOpacity>
                    <TouchableOpacity style={tw`mr-4`} onPress={favouriteVideo}>
                        <Icon name={isFavourited ? "bookmark" : "bookmark-o"} type="font-awesome" />
                    </TouchableOpacity>
                    <Text style={tw`text-sm text-gray-500 mt-1`}>{contentRef.data?.data.content.content.uploadedDate.substring(0, 10)}</Text>
                </View>
                <Text style={tw`text-sm text-gray-500 ml-2 px-2`}>{contentRef.data?.data.content.content.subheading} | {minutes} min</Text>
                <FlatList
                    data={contentRef.data?.data.content.tags}
                    renderItem={({ item }) => (
                        <Text style={tw`text-sm text-gray-500 mr-4`}>{item.name}</Text>
                    )}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    style={tw`px-4`} />
            </View>
            <ScrollView style={tw`flex-1 mt-2 mb-4 px-2`}>
                <Text style={tw`text-sm ml-2 mt-2`}>{contentRef.data?.data.content.content.description}</Text>
                <Text style={tw`text-xl ml-2 mt-2`}>Who is in the video</Text>
                <FlatList
                    data={contentRef.data?.data.content.characters}
                    horizontal={true}
                    renderItem={({ item }) => (
                        <CharacterCard
                            id={item.id}
                            name={item.name}
                            surname={item.surname}
                            role={item.role}
                            location={item.location} />
                    )}
                />
                <View style={[tw`border-2 rounded-xl mt-4 pt-4 border-green-200 mx-2 mb-6`]}>
                    <Input
                        value={comment}
                        onChangeText={setComment}
                        style={[tw`rounded-lg bg-white my-1 mr-1 h-0`]}
                        placeholder="Start the discussion"
                        placeholderTextColor={Colors.grey}
                        selectionColor={Colors.green}
                        inputContainerStyle={tw`border-b-0 h-1 pl-2 pt-2`}
                        inputStyle={tw`text-[4]`}
                        rightIcon={<TextInput.Icon
                            name="send"
                            color={Colors.green}
                            onPress={sendComment(comment)}
                            style={tw`mr-8`}
                        />}
                    />
                </View>
                <Text style={tw`mx-2 text-lg`}>Comments</Text>
                <FlatList
                    data={commentsRef.data?.data}
                    renderItem={({ item }) => (
                        <UserComment commentId={item.id} userId={item.ownerId} comment={item.message} commentTime={item.commentTime} />
                    )}
                />
            </ScrollView>
            {/* <View style={tw`mb-20`}/>  */}
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundVideo: {
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
    },
});