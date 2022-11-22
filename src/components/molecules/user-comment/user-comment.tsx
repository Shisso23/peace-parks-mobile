import { Text } from "@rneui/themed";
import React, { useState } from "react";
import { FlatList, Image, Touchable, View } from "react-native";
import { useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import tw from 'twrnc';
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import { Input } from "@rneui/base";
import Toast from "react-native-toast-message";
import { AxiosResponse } from "axios";

import { UserCommentProps } from "./types";
import { userService } from "../../../services";
import { Colors } from "../../../theme/variables";
import commentService from "../../../services/sub-services/comment-service/comment.service";


export const UserComment: React.FC<UserCommentProps> = ({commentId, userId, comment, commentTime}) => {
    const repliesRef: UseQueryResult<AxiosResponse<any, any>, unknown> = useQuery([`${commentId}_replies`], () => commentService.getReplies(commentId));
    const userRef: UseQueryResult<AxiosResponse<any, any>, unknown> = useQuery([userId], () => userService.getUserInfo(userId));
    const profilePicRef: UseQueryResult<AxiosResponse<any, any>, unknown> = useQuery([`${userId}_profilePic`], () => userService.getUserProfilePic(userId));

    const [repliesVisible, setRepliesVisibility] = useState<boolean>(false);
    const [reply, setReply] = useState<string>('');

    const queryCache = useQueryClient();

    const sendReply = (reply: string) => ()=> {
        if(reply == ''){
            Toast.show({type: 'error', text1: 'Cannot Send Message'})
        } else {
            commentService.sendReply(commentId, reply);
            setReply('');
            Toast.show({type: 'success', text1: 'Reply Successfully Sent!'})
            queryCache.refetchQueries({queryKey: [`${commentId}_replies`]});
        }
    }

    const handleRepliesVisibility = () => {
        setRepliesVisibility(!repliesVisible);
    }

    return(
        <><View style={tw`flex flex-row`}>
            <Image source={{uri: `data:image/jpeg;base64,${profilePicRef.data?.data}`}} resizeMode="cover" style={tw`h-14 w-14 rounded-lg mx-2 my-2`} />
            <View style={tw`my-4`}>
                    <Text style={tw`text-sm text-gray-500 text-[4]`}>{userRef.data?.data.firstName}</Text>
                    <Text style={tw`text-sm text-gray-500`}>{commentTime.substring(0, 10)}</Text>
            </View>
        </View>
        <TouchableOpacity onPress={handleRepliesVisibility}>
            <Text style={tw`px-2 text-sm`}>{comment}</Text>
        </TouchableOpacity>
        <View>
            {repliesVisible ?
            <View style={tw`pl-2 mb-2 border-l border-green-400`}>
                <View style={[tw`border-2 rounded-xl mt-4 pt-4 border-green-200 mx-2 mb-6`]}>
                    <Input
                        value={reply}
                        onChangeText={setReply}
                        style={[tw`rounded-lg bg-white my-1 mr-1 h-0`]}
                        placeholder="Reply"
                        placeholderTextColor={Colors.grey}
                        selectionColor={Colors.green}
                        inputContainerStyle={tw`border-b-0 h-1 pl-2 pt-2`}
                        inputStyle={tw`text-[4]`}
                        rightIcon = {<TextInput.Icon
                            name="send"
                            color={Colors.green}
                            onPress={sendReply(reply)}
                            style={tw`mr-8`}
                          />}
                        />
                </View>
                <FlatList
                    data={repliesRef.data?.data}
                    renderItem={({item}) =>  (
                        <UserComment commentId={item.id} userId={item.ownerId} comment={item.message} commentTime={item.commentTime}/>
                    )}
                />
            </View>

            : null}
        </View></>
    )
}