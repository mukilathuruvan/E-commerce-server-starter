export default `

type Mutation{
    createUser(input:CreateUserInput!):CreateUserResponse,

    updateUser(input:UpdateUserInput!,id:String!):user,

    sendOtp(input:SendOtpInput!):sendSMSResponse,

    verifyOtp(input:VerifyOtpInput!):verifyOtpResponse
}

`;
