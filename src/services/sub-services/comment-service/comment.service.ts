import { AxiosResponse } from 'axios';
import authNetworkService from '../auth-network-service/auth-network.service';
import { userDto } from '../user-service/userDto';
import commentUrls from './comment.urls';
import { commentDto, replyDto } from './commentDto';

const getComments: (id: string) => Promise<AxiosResponse<any, any>> = (id: string) => {
    const url = commentUrls.commentsUrl(id);

    return authNetworkService.get(url).catch((error) => {
        return Promise.reject(error);
    });
};

const sendComment: (contentId: string, comment: string) => Promise<AxiosResponse<any, any>> = (contentId: string, comment: string) => {
    const url = commentUrls.sendCommentUrl();
    const dto = commentDto(contentId, comment);

    return authNetworkService.post(url, dto).catch((error) => {
        return Promise.reject(error);
    });
};

const getReplies: (id: string) => Promise<AxiosResponse<any, any>> = (id: string) => {
    const url = commentUrls.repliesUrl(id);

    return authNetworkService.get(url).catch((error) => {
        return Promise.reject(error);
    });
};

const sendReply: (commentId: string, reply: string) => Promise<AxiosResponse<any, any>> = (commentId: string, reply: string) => {
    const url = commentUrls.sendReplyUrl();
    const dto = replyDto(commentId, reply);

    return authNetworkService.post(url, dto).catch((error) => {
        return Promise.reject(error);
    })
}

export default {
    getComments,
    sendComment,
    getReplies,
    sendReply,
}