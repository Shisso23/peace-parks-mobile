export const commentDto = (ContentId: string, comment: string) => ({
    id: {value: ContentId},
    message: comment,
});

export const replyDto = (CommentId: string, reply: string) => ({
    id: {value: CommentId},
    message: reply,
})