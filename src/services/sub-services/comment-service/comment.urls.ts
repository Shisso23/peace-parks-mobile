import appConfig from '../../../config';

const { hostUrl } = appConfig;

export default {
    commentsUrl: (id: string) => `${hostUrl}/User/Comment/comments/${id}`,
    repliesUrl: (id: string) => `${hostUrl}/User/Comment/replies/${id}`,
    sendCommentUrl: () => `${hostUrl}/User/Comment`,
    sendReplyUrl: () => `${hostUrl}/User/Comment/reply`,
}