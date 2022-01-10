import {followedCreator, unfollowedCreator, usersActions} from "./usersReducer";
import {axiosRequest, ResponseType, ResultCode} from "../dal/api";


jest.mock("../dal/api")
let userApiMock = axiosRequest.user as jest.Mocked<typeof axiosRequest.user>

let result: ResponseType = {
    resultCode: ResultCode.Success,
    messages: [],
    data: {},
}


let dispatch = jest.fn()

test("thunk-test-follow",async () => {

    userApiMock.follow.mockReturnValue(Promise.resolve(result))

    let thunk = followedCreator(1)

    //@ts-ignore
    await thunk(dispatch)
    expect(dispatch).toBeCalledTimes(3)
    expect(dispatch).toHaveBeenNthCalledWith(1,usersActions.followingProgressAC(true,1))
    expect(dispatch).toHaveBeenNthCalledWith(2,usersActions.followed(1))
    expect(dispatch).toHaveBeenNthCalledWith(3,usersActions.followingProgressAC(false,1))
})

test("thunk-test-unfollow",async () => {

    userApiMock.deleteFollow.mockReturnValue(Promise.resolve(result))

    let thunk = unfollowedCreator(1)
    //@ts-ignore
    await thunk(dispatch)
    expect(dispatch).toBeCalledTimes(3)
    expect(dispatch).toHaveBeenNthCalledWith(1,usersActions.followingProgressAC(true,1))
    expect(dispatch).toHaveBeenNthCalledWith(2,usersActions.unFollowed(1))
    expect(dispatch).toHaveBeenNthCalledWith(3,usersActions.followingProgressAC(false,1))
})