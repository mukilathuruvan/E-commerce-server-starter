const UserType = `

type user{
    id:String,
    name:String
    email:String,
    source:String,
    phone:String,
}

input CreateUserInput{
    name:String
    email:String,
    source:String,
    phone:String,
}


input UpdateUserInput{
    name:String
    email:String,
    source:String,
    phone:String,
}

type CreateUserResponse{
   token:String!
   refreshToken:String!
   success:Boolean!
    name:String!
}

`;

export default UserType;
