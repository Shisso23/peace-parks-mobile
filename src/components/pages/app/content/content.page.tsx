import { useNavigation, useRoute } from "@react-navigation/native";
import { Input } from "@rneui/base";
import { Text } from "@rneui/themed";
import { useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import tw from 'twrnc';

import { AppStackPropsWithParams, DrawerStackProps } from "../../../../navigation";
import commentService from "../../../../services/sub-services/comment-service/comment.service";
import contentService from "../../../../services/sub-services/content-service/content.service";
import images from "../../../../theme/images";
import { Colors } from "../../../../theme/variables";
import { CharacterCard } from "../../../molecules/character-card/character-card";
import { UserComment } from "../../../molecules/user-comment/user-comment";

export const ContentPage: React.FC = () => {
    const route: AppStackPropsWithParams<"Content"> = useRoute<AppStackPropsWithParams<'Content'>>();
    const contentRef: UseQueryResult<AxiosResponse<any, any>, unknown> = useQuery([route.params?.id], () => contentService.getContentDetail(route.params?.id))
    const commentsRef: UseQueryResult<AxiosResponse<any, any>, unknown> = useQuery([`${route.params?.id}_comments`], () => commentService.getComments(route.params?.id)); 
    
    const timespan = contentRef.data?.data.content.duration;
    const [minutes, setMinutes] = useState<number>(0);

    useEffect(() => {
        if(timespan != undefined){
            var hms = timespan.split(':');
            setMinutes(parseInt((+hms[0]*60+(hms[1]))));
        }
    }, [timespan]);

    const queryCache = useQueryClient();

    const [comment, setComment] = useState<string>('');

    const sendComment = (comment: string) => ()=> {
        if(comment == ''){
            Toast.show({type: 'error', text1: 'Cannot Send Message'})
        } else {
            commentService.sendComment(contentRef.data?.data.content.id, comment);
            setComment('');
            Toast.show({type: 'success', text1: 'Comment Successfully Sent!'})
            queryCache.refetchQueries({queryKey: [`${route.params?.id}_comments`]});
        }
    }

    const navigation = useNavigation<DrawerStackProps>();
    const _goToHome = () => navigation.navigate('Home');

    return(
        <View style={tw`bg-white h-full`}>
            <View style={tw`flex-1 bg-white`}>
                <View style={tw`h-[80%] bg-green-700 pt-8`}>
                    <TouchableOpacity style={tw`flex flex-row mb-4 mt-6 ml-4`} onPress={_goToHome}>
                        <Image source={images.back} resizeMode="contain" style={tw`h-8 w-16 mt-1`} />
                    </TouchableOpacity>
                    <Image source={images.logo} resizeMode="contain" style={tw`w-40 h-20 self-center mt-[10%]`}/>
                </View>
                <View style={tw`flex flex-row ml-2 mt-2 px-2`}>
                    <Text style={tw`flex-1 text-xl`}>{contentRef.data?.data.content.heading}</Text>
                    <Text style={tw`text-sm text-gray-500 mt-1`}>{contentRef.data?.data.content.uploadedDate.substring(0,10)}</Text>
                </View>
                <Text style={tw`text-sm text-gray-500 ml-2 px-2`}>{contentRef.data?.data.content.subheading} | {minutes} min</Text>
                <FlatList
                    data={contentRef.data?.data.tags}
                    renderItem={({item}) =>  (
                        <Text style={tw`text-sm text-gray-500 mr-4`}>{item.name}</Text>
                        )}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    style={tw`px-4`}/>
            </View>
            <ScrollView style={tw`flex-1 mt-2 mb-4 px-2`}>
                <Text style={tw`text-sm ml-2 mt-2`}>{contentRef.data?.data.content.description}</Text>
                <Text style={tw`text-xl ml-2 mt-2`}>Who is in the video</Text>
                <FlatList
                    data={contentRef.data?.data.characters}
                    horizontal={true}
                    renderItem={({item}) => (
                        <CharacterCard 
                        id={item.id} 
                        name={item.name} 
                        surname={item.surname}
                        role={item.role} 
                        location={item.location}/>
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
                        rightIcon = {<TextInput.Icon
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
                    renderItem={({item}) =>  (
                        <UserComment commentId={item.id} userId={item.ownerId} comment={item.message} commentTime={item.commentTime}/>
                    )}
                />
            </ScrollView>
            {/* <View style={tw`mb-20`}/>  */}
        </View>
    )
}