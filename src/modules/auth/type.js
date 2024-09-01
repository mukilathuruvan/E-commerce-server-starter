const AuthType = `

type sendSMSResponse{
   success:Boolean!,
   otp:Int,
   phone:String!,
   expriryAt:String,
}

type verifyOtpResponse{
   success:Boolean!,
   token:String!,
   refreshToken:String!,
}

input SendOtpInput{
    phone:String!,
}


input VerifyOtpInput{
    phone:String!,
    otp:String!,
    name:String,
}

`;

export default AuthType;
