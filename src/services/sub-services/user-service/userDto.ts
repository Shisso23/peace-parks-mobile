import { User } from '../../../reducers/user-reducer';

export const userDto = (formData: User) => ({
    firstName: formData?.firstName ?? '',
    lastName: formData?.firstName,
    email: formData?.email ?? '',
    regionCode: formData?.regionCode,
    phoneNumber: formData?.phoneNumber,
    childFriendly: formData?.childFriendly,
    subscribedToMail: formData?.subscribedToMail
});
